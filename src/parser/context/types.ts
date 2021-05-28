import { Options } from '../../options/types';
import { CreateAST } from '../createAST/types';

export interface DefaultParserContext {
  createAST: CreateAST;
  options: Options;
}
export type ParserContext = DefaultParserContext & Theme.ParserContext;
export type ParserContextCreator = (
  partial: DefaultParserContext & Partial<Theme.ParserContext>,
) => DefaultParserContext & Partial<Theme.ParserContext>;
