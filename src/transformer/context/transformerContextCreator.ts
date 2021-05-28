import type { DefaultTransformerContext, TransformerContext } from './types';

export const transformerContextCreator = (
  defaultTransformerContext: DefaultTransformerContext,
): TransformerContext => {
  return defaultTransformerContext.options.plugins.reduce(
    (partial, plugin) =>
      plugin.transformer?.context
        ? { ...partial, ...plugin.transformer.context(partial) }
        : partial,
    defaultTransformerContext,
  ) as TransformerContext;
};
