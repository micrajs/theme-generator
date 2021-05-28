import { ServiceProvider } from '@micra/service-provider';
import { CLIAssistant } from 'app/cli/CLIAssistant';

export class CLIServiceProvider extends ServiceProvider {
  register() {
    this.container.factory('cli', () => new CLIAssistant(use('router')));
  }
}
