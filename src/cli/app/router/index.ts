import { ServiceProvider } from '@micra/service-provider';
import { CLIRouter } from 'app/router/CLIRouter';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('router', CLIRouter);
  }

  boot() {
    require('../../commands');
  }
}
