import type { DefaultGeneratorContext, GeneratorContext } from './types';

export const generatorContextCreator = (
  defaultGeneratorContext: DefaultGeneratorContext,
): GeneratorContext => {
  return defaultGeneratorContext.options.plugins.reduce(
    (partial, plugin) =>
      plugin.generator?.context
        ? { ...partial, ...plugin.generator.context(partial) }
        : partial,
    defaultGeneratorContext,
  );
};
