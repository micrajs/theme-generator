import type {
  BooleanType,
  FactoryType,
  ListType,
  NodeType,
  NullishType,
  NumericType,
  StringType,
} from './types';

export const STRING_TYPE: StringType = 'StringType';
export const NUMERIC_TYPE: NumericType = 'NumericType';
export const BOOLEAN_TYPE: BooleanType = 'BooleanType';
export const NULLISH_TYPE: NullishType = 'NullishType';
export const LIST_TYPE: ListType = 'ListType';
export const NODE_TYPE: NodeType = 'NodeType';
export const FACTORY_TYPE: FactoryType = 'FactoryType';
export const ElementSymbol = Symbol('ParserElement');
