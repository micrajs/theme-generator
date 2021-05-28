import { DefaultFactoryContext } from './context';

export type Utility<K extends keyof Theme.FactoryContext> = (
  context: DefaultFactoryContext & Partial<Theme.FactoryContext>,
) => Theme.FactoryContext[K];
