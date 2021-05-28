import type { GenerateOptions } from '../types';

export interface DefaultGeneratorContext {
  options: GenerateOptions;
}
export type GeneratorContext = DefaultGeneratorContext & Theme.GeneratorContext;
export type GeneratorContextCreator = (
  partial: DefaultGeneratorContext & Partial<Theme.GeneratorContext>,
) => DefaultGeneratorContext & Partial<Theme.GeneratorContext>;
