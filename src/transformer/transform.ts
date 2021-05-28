import { cloneAST } from '../parser';
import { resolveFactories } from '../resolve-factories';
import { transformerContextCreator } from './context';
import { Transform } from './types';

export const transform: Transform = (transformers, options) => {
  const context = transformerContextCreator({
    options,
  });

  return transformers.reduce((content: Record<string, any>, transformer) => {
    const ast = resolveFactories(
      cloneAST(options.ast),
      options,
      transformer?.config?.utilities
        ? transformer.config.utilities
        : (ctx) => ctx,
    );

    content[transformer.name] = transformer.transform(ast, context);

    return content;
  }, {});
};
