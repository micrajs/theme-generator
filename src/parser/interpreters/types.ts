import { ParserContext } from '../context';
import type {
  BooleanElement,
  BooleanValue,
  FactoryElement,
  FactoryValue,
  ListElement,
  ListValue,
  NodeElement,
  NodeValue,
  NullishElement,
  NullishValue,
  NumericElement,
  NumericValue,
  ParserValue,
  StringElement,
  StringValue,
} from '../elements/types';

export interface ParserStringInterpreter {
  check(value: ParserValue): value is StringValue;
  interpret(value: StringValue, context: ParserContext): StringElement;
}

export interface ParserNumericInterpreter {
  check(value: ParserValue): value is NumericValue;
  interpret(value: NumericValue, context: ParserContext): NumericElement;
}

export interface ParserBooleanInterpreter {
  check(value: ParserValue): value is BooleanValue;
  interpret(value: BooleanValue, context: ParserContext): BooleanElement;
}

export interface ParserNullishInterpreter {
  check(value: ParserValue): value is NullishValue;
  interpret(value: NullishValue, context: ParserContext): NullishElement;
}

export interface ParserNodeInterpreter {
  check(value: ParserValue): value is NodeValue;
  interpret(value: NodeValue, context: ParserContext): NodeElement;
}

export interface ParserListInterpreter {
  check(value: ParserValue): value is ListValue;
  interpret(value: ListValue, context: ParserContext): ListElement;
}

export interface ParserFactoryInterpreter {
  check(value: ParserValue): value is FactoryValue;
  interpret(value: FactoryValue, context: ParserContext): FactoryElement;
}

export type ParserInterpreter = {
  check:
    | ParserStringInterpreter['check']
    | ParserNumericInterpreter['check']
    | ParserBooleanInterpreter['check']
    | ParserNullishInterpreter['check']
    | ParserNodeInterpreter['check']
    | ParserFactoryInterpreter['check']
    | ParserListInterpreter['check'];
  interpret(
    value:
      | StringValue
      | NumericValue
      | BooleanValue
      | NullishValue
      | NodeValue
      | FactoryValue
      | ListValue,
    context: ParserContext,
  ):
    | StringElement
    | NumericElement
    | BooleanElement
    | NullishElement
    | NodeElement
    | FactoryElement
    | ListElement;
};
