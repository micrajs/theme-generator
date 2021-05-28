import type { ParserValue } from '../parser';
import type { Options } from '../options';
import type { Transformer } from './transformers';

export interface TransformOptions extends Options {
  tokens: ParserValue;
}

export type Transform = <T extends Transformer>(
  transformers: T[],
  options: TransformOptions,
) => Record<T['name'], ReturnType<T['transform']>>;
