import app from '@micra/application/lib/async';
import { getNamespace } from 'cls-hooked';
import { CLIRequest } from 'app/cli/CLIRequest';
import { CLIRoute, CLIRouter } from 'app/router/CLIRouter';

export class CLIAssistant {
  protected router: CLIRouter;

  constructor(router: CLIRouter) {
    this.router = router;
  }

  async run(command: string, options: Record<string, string> = {}) {
    const scope = getNamespace('request');

    if (!scope) {
      throw new Error(
        `Undefined "Request" namespace. Please make sure the cls-hooked namespace was created in the environment initialization:\n\nrequire('cls-hooked').createNamespace('request');\n`,
      );
    }

    return await scope.runAndReturn(async () => {
      const container = app.container.clone();
      const route = this.router.find(command);

      const optionList = Object.keys(options);
      if (!command || optionList.includes('help') || optionList.includes('h')) {
        return !route
          ? console.log('SHOW HELP BLOCK FOR ALL COMMANDS')
          : console.log(`SHOW HELP BLOCK FOR "${route.command}" COMMAND`);
      }

      if (!route) {
        throw new Error(`Command "${command}" was not found`);
      }

      const request = new CLIRequest();
      request.options = options;
      request.arguments = route.getArguments(command);

      this.validateRequest(route, request);
      container.value('request', request);

      scope.set('use', (namespace: keyof Application.Services) => {
        try {
          return container.use(namespace);
        } catch (e) {
          return app.container.use(namespace);
        }
      });

      for (const middleware of this.router.middlewares) {
        await middleware(request);
      }

      for (const middleware of route.middlewares) {
        await middleware(request);
      }

      return await route.handler(request);
    });
  }

  validateRequest(route: CLIRoute, request: CLIRequest): CLIRequest {
    route.arguments.forEach(argument => {
      if (argument.default !== undefined && !request.arguments[argument.name]) {
        request.arguments[argument.name] = argument.default;
      }

      if (argument.transform && request.arguments[argument.name]) {
        request.arguments[argument.name] = argument.transform(request.arguments[argument.name]);
      }

      if (argument.required && !request.arguments[argument.name]) {
        throw new Error(`Argument "${argument.name}" is required but was not defined`);
      }

      if (argument.validate && !argument.validate(request.arguments[argument.name])) {
        throw new Error(`Argument "${argument.name}" is invalid`);
      }
    });

    route.options.forEach(option => {
      if (option.alias && !request.arguments[option.name] && request.arguments[option.alias]) {
        request.arguments[option.name] = request.arguments[option.alias];
      }

      if (option.default !== undefined && !request.arguments[option.name]) {
        request.arguments[option.name] = option.default;
      }

      if (option.transform && request.arguments[option.name]) {
        request.arguments[option.name] = option.transform(request.arguments[option.name]);
      }

      if (option.required && !request.arguments[option.name]) {
        throw new Error(`Option "${option.name}" is required but was not defined`);
      }

      if (option.validate && !option.validate(request.arguments[option.name])) {
        throw new Error(`Option "${option.name}" is invalid`);
      }
    });

    return request;
  }
}
