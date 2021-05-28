import { FactoryContextPlugin } from '../plugins';
import { TransformerHelpersPlugins } from '../transformer/plugins/TransformerHelpersPlugins';
import { Options } from './types';

export const defaultOptions: Options = {
  namespace: '',
  ast: [],
  plugins: [FactoryContextPlugin, TransformerHelpersPlugins],
};
