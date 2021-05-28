import type { DefaultParserContext, ParserContext } from './types';

export const parserContextCreator = (
  defaultParserContext: DefaultParserContext,
): ParserContext => {
  return defaultParserContext.options.plugins.reduce(
    (partial, plugin) =>
      plugin.parser?.context
        ? { ...partial, ...plugin.parser.context(partial) }
        : partial,
    defaultParserContext,
  );
};
