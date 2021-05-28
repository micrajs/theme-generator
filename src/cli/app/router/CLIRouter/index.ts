import { CLIRequest } from 'app/cli/CLIRequest';
import { path, toTest, toMatch } from '@micra/path-match';
import { ArgDefinitions, CommandParams } from 'app/router/CLIRouter/types/CommandParams';

const matcher = path({
  PATH_SEPARATOR: ' ',
  VARIABLE_START: '{',
  VARIABLE_END: '}',
})

export type CLIRouteHandler<A extends Record<string, any> = Record<string, any>, O extends Record<string, any> = Record<string, any>> = (request: CLIRequest<A, O>) => Promise<void>;

export interface CLIArgumentSchema {
  name: string;
  description?: string;
  default?: string;
  required?: boolean;
  transform?(raw: string): string;
  validate?(raw: string): boolean;
}

export interface CLIOptionSchema {
  name: string;
  alias?: string;
  description?: string;
  default?: string;
  required?: boolean;
  transform?(raw: string): string;
  validate?(raw: string): boolean;
}

export interface CLIRoute {
  name: string;
  command: string;
  handler: CLIRouteHandler;
  description: string;
  arguments: CLIArgumentSchema[];
  options: CLIOptionSchema[];
  middlewares: CLIRouteHandler[];
  test: (path: string) => boolean;
  getArguments: (path: string) => Record<string, string>;
}

export interface CLIRouteBuilder<P extends string> {
  as(name: string): this;
  description(description: string): this;
  arguments(...args: ArgDefinitions<CommandParams<P>>): this;
  options(...options: CLIOptionSchema[]): this;
  middlewares(...middlewares: CLIRouteHandler[]): this;
}

export class Route implements CLIRoute {
  name: string = '';
  command: string;
  handler: CLIRouteHandler;
  description: string = '';
  arguments: CLIArgumentSchema[] = [];
  options: CLIOptionSchema[] = [];
  middlewares: CLIRouteHandler[] = [];
  test: (path: string) => boolean;
  getArguments: (path: string) => Record<string, string>;

  constructor(command: string, handler: CLIRouteHandler) {
    this.command = command;
    this.handler = handler;
    const result = matcher(command);
    this.test = toTest(result);
    this.getArguments = toMatch(result);
  }
}

export class RouteBuilder<P extends string> implements CLIRouteBuilder<P> {
  #route: CLIRoute;

  constructor(route: CLIRoute) {
    this.#route = route;
  }

  as(name: string): this {
    this.#route.name = name;
    return this;
  }
  description(description: string): this {
    this.#route.description = description;
    return this;
  }
  arguments(...args: ArgDefinitions<CommandParams<P>>): this {
    this.#route.arguments = this.#route.arguments.concat(args as CLIArgumentSchema[]);
    return this;
  }
  options(...options: CLIOptionSchema[]): this {
    this.#route.options = this.#route.options.concat(options);
    return this;
  }
  middlewares(...middlewares: CLIRouteHandler<CommandParams<P>>[]): this {
    this.#route.middlewares = this.#route.middlewares.concat(middlewares as CLIRouteHandler[]);
    return this;
  }
}

export class CLIRouter {
  protected routes: CLIRoute[] = [];
  public middlewares: CLIRouteHandler[] = [];

  use(...middlewares: CLIRouteHandler[]): this {
    this.middlewares = this.middlewares.concat(middlewares);
    return this;
  }

  command<P extends string>(command: P, handler: CLIRouteHandler<CommandParams<P>>) {
    const route = new Route(command, handler as CLIRouteHandler);
    this.routes.push(route);
    return new RouteBuilder<P>(route);
  }

  has(path: string): boolean {
    return this.routes.some(route => route.test(path));
  }

  find(path: string): CLIRoute | undefined {
    return path ? this.routes.find(route => route.test(path)) : undefined;
  }

  findByName(name: string): CLIRoute | undefined {
    return name ? this.routes.find(route => route.name && route.name === name) : undefined;
  }
}
