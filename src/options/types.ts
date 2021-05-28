import type { AST } from '../parser';
import type { Plugin } from '../plugins';

export interface Options {
  namespace: string;
  plugins: Plugin[];
  ast: AST;
}
