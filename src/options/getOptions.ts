import { defaultOptions } from './constants';
import { Options } from './types';

export const getOptions = (partial: Partial<Options>): Options => ({
  ...defaultOptions,
  ...partial,
  plugins: [
    ...defaultOptions.plugins,
    ...(partial.plugins ?? []),
  ]
});
