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
  StringElement,
  NumericElement,
  BooleanElement,
  NullishElement,
  NodeElement,
  ListElement,
  FactoryElement,
} from '../types';

export const createStringElement = (
  path: string,
  value: StringElement['value'],
): StringElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: STRING_TYPE,
  value,
});

export const createNumericElement = (
  path: string,
  value: NumericElement['value'],
): NumericElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: NUMERIC_TYPE,
  value,
});

export const createBooleanElement = (
  path: string,
  value: BooleanElement['value'],
): BooleanElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: BOOLEAN_TYPE,
  value,
});

export const createNullishElement = (
  path: string,
  value: NullishElement['value'],
): NullishElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: NULLISH_TYPE,
  value,
});

export const createNodeElement = (
  path: string,
  value: NodeElement['value'],
): NodeElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: NODE_TYPE,
  value,
});

export const createListElement = (
  path: string,
  value: ListElement['value'],
): ListElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: LIST_TYPE,
  value,
});

export const createFactoryElement = (
  path: string,
  value: FactoryElement['value'],
): FactoryElement => ({
  $: ElementSymbol,
  parent: null,
  path,
  type: FACTORY_TYPE,
  value,
});
