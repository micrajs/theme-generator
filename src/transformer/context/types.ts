import type { TransformOptions } from '../types';

export interface DefaultTransformerContext {
  options: TransformOptions;
}
export type TransformerContext = DefaultTransformerContext &
  Theme.TransformerContext;
export type TransformerContextCreator = (
  partial: DefaultTransformerContext & Partial<Theme.TransformerContext>,
) => Partial<Theme.TransformerContext>;
