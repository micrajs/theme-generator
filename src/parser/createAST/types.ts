import { ParserContext } from '../context';
import { ParserValue } from '../elements';
import { AST } from '../types';

export type CreateAST = (value: ParserValue, context: ParserContext) => AST;
