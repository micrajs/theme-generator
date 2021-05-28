import { dirname } from 'path';
import prettier from 'prettier';
import mustache from 'mustache';
import { makeSurePathExists } from './helpers/makeSurePathExists';
import { Generate } from './types';
import { existsSync, readFileSync } from 'fs';
import { generatorContextCreator } from './context';
import { writeFileSync } from 'fs';

export const generate: Generate = (path, options) => {
  if (existsSync(path) && !options.force) {
    throw new Error(
      `File "${path}" already exists. If you want to overwrite it, you can pass the options "force: true" to the generator.`,
    );
  }

  if (!options.template && !options.templatePath) {
    throw new Error(
      `Unable to generate file "${path}". Please defined either a "template" or a "templatePath".`,
    );
  }

  const context = generatorContextCreator({
    options,
  });

  makeSurePathExists(dirname(path));
  const template = options.templatePath
    ? readFileSync(options.templatePath, 'utf-8')
    : (options.template as string);
  let content = mustache.render(template, {
    ...context,
    ...(context.options.variables ?? {}),
    CONTENT: options.content,
  });

  if (options.format) {
    content = prettier.format(content, options.format);
  }

  writeFileSync(path, content, 'utf-8');
};
