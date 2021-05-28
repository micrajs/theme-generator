import type { ParserValue } from '../parser';
import type {
  ParserContext,
  ParserContextCreator,
} from '../parser/context/types';
import type { PartialDeep } from 'type-fest';
import type { FactoryContextCreator } from '../resolve-factories';
import type { GeneratorContextCreator } from '../generator/context';
import type { TransformerContextCreator } from '../transformer/context';

export type ValueParser = (
  value: ParserValue,
  context: ParserContext,
) => ParserValue;

export type Plugin = PartialDeep<{
  parser: {
    willParseValue: ValueParser;
    context: ParserContextCreator;
  };

  factory: {
    context: FactoryContextCreator;
  };

  transformer: {
    context: TransformerContextCreator;
  };

  generator: {
    context: GeneratorContextCreator;
  };
}>;
