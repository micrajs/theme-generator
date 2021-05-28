export type StringType = 'StringType';
export type StringValue = string;
export interface StringElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: StringType;
  value: StringValue;
}

export type NumericType = 'NumericType';
export type NumericValue = number;
export interface NumericElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: NumericType;
  value: NumericValue;
}

export type BooleanType = 'BooleanType';
export type BooleanValue = boolean;
export interface BooleanElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: BooleanType;
  value: BooleanValue;
}

export type NullishType = 'NullishType';
export type NullishValue = null | undefined;
export interface NullishElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: NullishType;
  value: NullishValue;
}

export type NodeType = 'NodeType';
export type NodeValue = {
  [Key: string]: ParserValue;
};
export interface NodeElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: NodeType;
  value: ParserElement[];
}

export type ListType = 'ListType';
export type ListValue = Array<ParserValue>;
export interface ListElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: ListType;
  value: ParserElement[];
}

export type FactoryType = 'FactoryType';
export type FactoryValue = (
  context: Theme.FactoryContext,
) => ParserValue | ParserElement;
export interface FactoryElement {
  $: Symbol;
  parent: ParserElement | null;
  path: string;
  type: FactoryType;
  value: FactoryValue;
}

export type PrimitiveType =
  | StringType
  | NumericType
  | BooleanType
  | NullishType;

export type PrimitiveValue =
  | StringValue
  | NumericValue
  | BooleanValue
  | NullishValue;

export type PrimitiveElement =
  | StringElement
  | NumericElement
  | BooleanElement
  | NullishElement;

export type ParentType = NodeType | ListType;

export type ParentValue = NodeValue | ListValue;

export type ParentElement = NodeElement | ListElement;

export type DynamicType = FactoryType;

export type DynamicValue = FactoryValue;

export type DynamicElement = FactoryElement;

export type ParserType =
  | NodeType
  | ListType
  | StringType
  | NumericType
  | BooleanType
  | NullishType
  | FactoryType;

export type ParserValue =
  | NodeValue
  | ListValue
  | StringValue
  | NumericValue
  | BooleanValue
  | NullishValue
  | FactoryValue;

export type ParserElement =
  | StringElement
  | NumericElement
  | BooleanElement
  | NullishElement
  | NodeElement
  | ListElement
  | FactoryElement;
