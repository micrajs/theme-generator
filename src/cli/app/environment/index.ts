import 'reflect-metadata';
import { createNamespace, getNamespace } from 'cls-hooked';
import app from '@micra/application/lib/async';
import { DotEnv } from '@micra/dot-env';

app.registerGlobals({ use: false });
app.registerEnv(DotEnv);

require('ts-node').register({
  compilerOptions: {
    "target": "ES2017",
    "module": "CommonJS",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "strict": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "importHelpers": true,
    "downlevelIteration": true,
    "declaration": false,
    "jsx": "react",
  },
  transpileOnly: true,
});

createNamespace('request');

/**
 * Use:
 * This is the scoped global helper that gives access to the service
 * container. It's an easy way to resolve registered services
 * from the active scoped service provider.
 */
global.use = <K extends keyof Application.Services>(
  namespace: K,
): Application.Services[K] => {
  const requestScope = getNamespace('request');
  if (requestScope?.active) {
    return requestScope.get('use')(namespace);
  }

  if (process.env.NODE_ENV === 'test') {
    const testScope = getNamespace('test');
    if (testScope?.active) {
      return testScope.get('use')(namespace);
    }
  }

  return app.container.use(namespace);
};
