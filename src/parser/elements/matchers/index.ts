import {
  BOOLEAN_TYPE,
  ElementSymbol,
  FACTORY_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../constants';
import type {
  BooleanElement,
  BooleanValue,
  FactoryValue,
  FactoryElement,
  ListElement,
  ListValue,
  NodeElement,
  NodeValue,
  NullishElement,
  NullishValue,
  NumericElement,
  NumericValue,
  ParentElement,
  ParentValue,
  ParserElement,
  ParserValue,
  PrimitiveElement,
  PrimitiveValue,
  StringElement,
  StringValue,
} from '../types';

export const isElement = (definition: any): definition is ParserElement =>
  definition != null && definition.$ === ElementSymbol;

export const isStringValue = (
  definition: ParserValue,
): definition is StringValue => typeof definition === 'string';

export const isNumericValue = (
  definition: ParserValue,
): definition is NumericValue => typeof definition === 'number';

export const isBooleanValue = (
  definition: ParserValue,
): definition is BooleanValue => typeof definition === 'boolean';

export const isNullishValue = (
  definition: ParserValue,
): definition is NullishValue => definition == null;

export const isPrimitiveValue = (
  definition: ParserValue,
): definition is PrimitiveValue =>
  isStringValue(definition) ||
  isNumericValue(definition) ||
  isBooleanValue(definition) ||
  isNullishValue(definition);

export const isNodeValue = (definition: ParserValue): definition is NodeValue =>
  typeof definition === 'object' &&
  !Array.isArray(definition) &&
  definition != null;

export const isListValue = (definition: ParserValue): definition is ListValue =>
  Array.isArray(definition);

export const isParentValue = (
  definition: ParserValue,
): definition is ParentValue =>
  isNodeValue(definition) || isListValue(definition);

export const isFactoryValue = (
  definition: ParserValue,
): definition is FactoryValue => typeof definition === 'function';

export const isNodeElement = (element: ParserElement): element is NodeElement =>
  element.type === NODE_TYPE;

export const isStringElement = (
  element: ParserElement,
): element is StringElement => element.type === STRING_TYPE;

export const isNumericElement = (
  element: ParserElement,
): element is NumericElement => element.type === NUMERIC_TYPE;

export const isListElement = (element: ParserElement): element is ListElement =>
  element.type === LIST_TYPE;

export const isBooleanElement = (
  element: ParserElement,
): element is BooleanElement => element.type === BOOLEAN_TYPE;

export const isNullishElement = (
  element: ParserElement,
): element is NullishElement => element.type === NULLISH_TYPE;

export const isFactoryElement = (
  element: ParserElement,
): element is FactoryElement => element.type === FACTORY_TYPE;

export const isPrimitiveElement = (
  element: ParserElement,
): element is PrimitiveElement =>
  !Array.isArray(element.value) && element.type !== FACTORY_TYPE;

export const isParentElement = (
  element: ParserElement,
): element is ParentElement => Array.isArray(element.value);
