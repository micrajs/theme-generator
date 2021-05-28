import type { TransformOptions } from '../../transformer';

export interface DefaultFactoryContext {
  options: TransformOptions;
}

export type FactoryContext = DefaultFactoryContext & Theme.FactoryContext;
export type FactoryContextCreator = (
  partial: DefaultFactoryContext & Partial<Theme.FactoryContext>,
) => Partial<Theme.FactoryContext>;
