import type { DefaultFactoryContext, FactoryContext } from './types';

export const factoryContextCreator = (
  defaultFactoryContext: DefaultFactoryContext,
  overrides: (context: FactoryContext) => Partial<FactoryContext>,
): FactoryContext => {
  const baseContext = defaultFactoryContext.options.plugins.reduce(
    (partial, plugin) =>
      plugin.factory?.context
        ? {
            ...partial,
            ...plugin.factory.context(defaultFactoryContext),
          }
        : partial,
    defaultFactoryContext,
  ) as FactoryContext;

  return {
    ...baseContext,
    ...overrides(baseContext),
  };
};
