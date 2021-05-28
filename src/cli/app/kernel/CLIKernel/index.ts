import { join } from 'path';
import { Kernel } from '@micra/kernel';
import { existsSync } from 'fs';

export class CLIKernel extends Kernel {
  boot() {
    const HOME = require('os').homedir();
    [
      join(HOME, 'micra.config.js'),
      join(HOME, 'micra.config.ts'),
      join(HOME, '.micrarc'),
      join(HOME, '.micrarc.js'),
      join(HOME, '.micrarc.ts'),
      join(process.cwd(), 'micra.config.js'),
      join(process.cwd(), 'micra.config.ts'),
      join(process.cwd(), '.micrarc'),
      join(process.cwd(), '.micrarc.js'),
      join(process.cwd(), '.micrarc.ts'),
    ].forEach(path => {
      if (existsSync(path)) {
        try {
          require(path);
        } catch(e) {
          console.error(`Failed to load "${path}"`);
        }
      }
    });

    process.on('unhandledRejection', (e) => {
      console.error(e);
    });
  }

  async run() {
    const command = process.argv.slice(2).filter(arg => !arg.startsWith('-')).join(' ');
    const options = process.argv.slice(2).filter(arg => arg.startsWith('-')).reduce((options: Record<string, string>, arg) => {
      const [name, value] = (arg.startsWith('--') ? arg.substr(2) : arg.substr(1)).split('=');
      options[name] = value;
      return options;
    }, {});

    return await use('cli').run(command, options);
  }
}
