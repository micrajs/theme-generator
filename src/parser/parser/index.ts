import { getPrimitiveElements } from '../helpers';
import { createAST } from '../createAST';
import { parserContextCreator } from '../context';
import type { Parser } from '../types';

export const parser: Parser = (tokens, options) => {
  const context = parserContextCreator({
    options,
    createAST,
  });

  return options.ast.concat(createAST(tokens, context));
};
