require('dotenv-flow').config();
const { build } = require('esbuild');
const { cwd } = require('./utilities');

Promise.all([
  build({
    bundle: true,
    external: ['nodemon'],
    entryPoints: [cwd('src/cli/index.ts')],
    outfile: cwd('.cli/index.js'),
    platform: 'node',
    sourcemap: true,
    minify: true,
    target: ['node12'],
    tsconfig: cwd('tsconfig.build.json'),
  }).then(() => console.log('\nBuild complete!')),
]);
