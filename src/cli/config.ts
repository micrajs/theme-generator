import app from '@micra/application/lib/async';
import { TypeDIServiceContainer } from '@micra/typedi-service-container';
import { CLIServiceProvider } from 'app/cli';
import { CLIKernel } from 'app/kernel/CLIKernel';
import { RouterServiceProvider } from 'app/router';

app.config.set('app', {
  /**
   * Application kernel
   */
  kernel: CLIKernel,

  /**
   * Service container class to be used.
   */
  container: TypeDIServiceContainer,

  /**
   * Service providers
   */
  services: [
    // Core modules service providers
    RouterServiceProvider,
    CLIServiceProvider,

    // Domains service providers
  ],
});
