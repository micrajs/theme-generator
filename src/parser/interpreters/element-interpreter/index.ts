import {
  createBooleanElement,
  createFactoryElement,
  createListElement,
  createNodeElement,
  createNullishElement,
  createNumericElement,
  createStringElement,
  isBooleanValue,
  isFactoryValue,
  isListValue,
  isNodeValue,
  isNullishValue,
  isNumericValue,
  isStringValue,
} from '../../elements';
import type {
  ParserStringInterpreter,
  ParserNumericInterpreter,
  ParserBooleanInterpreter,
  ParserNullishInterpreter,
  ParserNodeInterpreter,
  ParserListInterpreter,
  ParserFactoryInterpreter,
} from '../types';

export const stringInterpreter: ParserStringInterpreter = {
  check: isStringValue,
  interpret(value, { options: { namespace } }) {
    return createStringElement(namespace, value);
  },
};

export const numericInterpreter: ParserNumericInterpreter = {
  check: isNumericValue,
  interpret(value, { options: { namespace } }) {
    return createNumericElement(namespace, value);
  },
};

export const booleanInterpreter: ParserBooleanInterpreter = {
  check: isBooleanValue,
  interpret(value, { options: { namespace } }) {
    return createBooleanElement(namespace, value);
  },
};

export const nullishInterpreter: ParserNullishInterpreter = {
  check: isNullishValue,
  interpret(_value, { options: { namespace } }) {
    return createNullishElement(namespace, null);
  },
};

export const nodeInterpreter: ParserNodeInterpreter = {
  check: isNodeValue,
  interpret(value, context) {
    const {
      options: { namespace },
    } = context;
    const element = createNodeElement(namespace, []);

    for (const [key, child] of Object.entries(value)) {
      element.value = element.value.concat(
        context.createAST(child, {
          ...context,
          options: {
            ...context.options,
            namespace: namespace ? `${namespace}.${key}` : key,
          },
        }),
      );
    }

    return element;
  },
};

export const listInterpreter: ParserListInterpreter = {
  check: isListValue,
  interpret(value, context) {
    const {
      options: { namespace },
    } = context;
    const element = createListElement(namespace, []);

    for (const child of value) {
      element.value = element.value.concat(
        context.createAST(child, {
          ...context,
          options: {
            ...context.options,
            namespace,
          },
        }),
      );
    }

    return element;
  },
};

export const factoryInterpreter: ParserFactoryInterpreter = {
  check: isFactoryValue,
  interpret(value, { options: { namespace } }) {
    return createFactoryElement(namespace, value);
  },
};
