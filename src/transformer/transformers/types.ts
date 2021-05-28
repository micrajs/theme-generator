import type { AST } from '../../parser';
import type { FactoryContext } from '../../resolve-factories';
import type { TransformerContext } from '../context';

export interface TransformerConfig {
  utilities?(context: FactoryContext): Partial<FactoryContext>;
}

export interface Transformer<R = any> {
  name: string;
  config?: TransformerConfig;
  transform(ast: AST, context: TransformerContext): R;
}
