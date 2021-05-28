import { FactoryContext, factoryContextCreator } from '../context';
import {
  flattenAST,
  isElement,
  isFactoryElement,
  isParentElement,
  parser,
  rebaseElements,
} from '../../parser';
import type { ParserElement } from '../../parser/elements';
import { TransformOptions } from '../../transformer';

export const resolveFactories = (
  ast: ParserElement[],
  options: TransformOptions,
  overrides: (context: FactoryContext) => Partial<FactoryContext>,
) => {
  const context = factoryContextCreator({ options }, overrides);

  for (let element of flattenAST(ast)) {
    if (isFactoryElement(element)) {
      const result = element.value(context);
      if (isElement(result)) {
        element = element as ParserElement;
        element.parent = result;
        element.type = result.type;
        element.value = isParentElement(result)
          ? rebaseElements(result.path, element.path, result.value)
          : result.value;
      } else {
        const [parsedResult] = parser(result, {
          ...options,
          ast: [],
        });
        element = element as ParserElement;
        element.type = parsedResult.type;
        element.value = parsedResult.value;
      }
    }
  }

  return ast;
};
