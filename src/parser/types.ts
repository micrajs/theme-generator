import { Options } from '../options/types';
import type { ParserElement, ParserValue } from './elements';

export type AST = ParserElement[];

export type Parser = (value: ParserValue, options: Options) => AST;
