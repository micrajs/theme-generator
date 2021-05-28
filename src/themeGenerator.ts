import { getOptions } from './options';
import type { Options } from './options';
import { parser, ParserValue } from './parser';
import { transform, TransformOptions, Transformer } from './transformer';
import { generate, GenerateOptions } from './generator';

export const themeGenerator = (customOptions: Partial<Options> = {}) => {
  function transformedState(
    transformers: Transformer[],
    options: TransformOptions,
  ) {
    const content = transform(transformers, options);
    const generateOptions: GenerateOptions = {
      ...options,
      content,
      variables: {},
      plugins: options.plugins.slice(),
    };

    const generatorAPI = {
      content,
      ast: generateOptions.ast,
      tokens: generateOptions.tokens,
      options: generateOptions,
      parse: (value: ParserValue) =>
        parsedState(value, {
          namespace: options.namespace,
          ast: options.ast,
          plugins: options.plugins,
        }),
      transform: (...transformers: Transformer[]) =>
        transformedState(transformers, options),
      generate: (path: string, customOptions: Partial<GenerateOptions>) => {
        generate(path, {
          ...generateOptions,
          ...customOptions,
        });

        return generatorAPI;
      },
    };

    return generatorAPI;
  }

  function parsedState(tokens: ParserValue, options: Options) {
    const ast = parser(tokens, options);
    const transformerOptions: TransformOptions = {
      ...options,
      ast,
      tokens,
      plugins: options.plugins.slice(),
    };

    return {
      ast: transformerOptions.ast,
      tokens: transformerOptions.tokens,
      options: transformerOptions,
      parse: (value: ParserValue) => parsedState(value, options),
      transform: (...transformers: Transformer[]) =>
        transformedState(transformers, transformerOptions),
    };
  }

  const options = getOptions(customOptions);

  return {
    options,
    parse: (value: ParserValue) => parsedState(value, options),
  };
};
