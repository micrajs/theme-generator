import { join } from 'path';

const router = use('router');

router
  .command('build {input} {output}', async (request) => {
    use('container').value('path/output', (...path: string[]) =>
      join(process.cwd(), request.arguments.output, ...path),
    );
    require(join(process.cwd(), request.arguments.input));
  })
  .arguments(
    { name: 'input', required: true },
    { name: 'output', required: true },
  );

router
  .command('watch {input} {output}', async (request) => {
    require('nodemon')({
      watch: [join(process.cwd(), 'src')],
      ext: 'ts, tsx',
      ignore: ['.test.ts'],
      exec: 'yarn build',
    })
    .on('start', () => {
      console.log('Theme generator watching files in "src" for changes');
    })
    .on('quit', function () {
      console.log('\nTheme generator has quit\n');
      process.exit();
    })
    .on('restart', function (files: any) {
      console.log('Theme generator restarted due to: ', files);
    })
    .on('crash', function (files: any) {
      console.log('Theme generator has crashed');
    })
    ;
  })
  .arguments(
    { name: 'input', required: true },
    { name: 'output', required: true },
  );
