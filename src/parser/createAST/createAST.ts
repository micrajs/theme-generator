import { interpreters } from '../interpreters';
import type { CreateAST } from './types';

export const createAST: CreateAST = (value, context) => {
  const elements = [];
  for (const interpreter of interpreters) {
    // Transform the value using plugins
    value = context.options.plugins.reduce(
      (partial, plugin) =>
        plugin?.parser?.willParseValue ? plugin?.parser?.willParseValue(partial, context) : partial,
      value,
    );

    // Parse the value using the interpreters
    if (interpreter.check(value)) {
      elements.push(interpreter.interpret(value, context));
      break;
    }
  }

  return elements;
};
