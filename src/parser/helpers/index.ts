import {
  isNodeElement,
  isParentElement,
  isPrimitiveElement,
  ParserValue,
} from '../elements';
import type { ParserElement, PrimitiveElement } from '../elements';
import type { AST } from '../types';

export const cloneAST = (ast: AST): AST => {
  return ast.map(
    (element) =>
      ({
        ...element,
        value: isParentElement(element)
          ? cloneAST(element.value)
          : element.value,
      } as ParserElement),
  );
};

export const flattenAST = (ast: ParserElement[]): ParserElement[] => {
  return ast.reduce<ParserElement[]>((elements, element) => {
    if (isParentElement(element)) {
      return elements.concat([element], flattenAST(element.value));
    }

    elements.push(element);

    return elements;
  }, []);
};

export const flattenASTWithLists = (ast: ParserElement[]): ParserElement[] => {
  return ast.reduce<ParserElement[]>((elements, element) => {
    if (isNodeElement(element)) {
      return elements.concat([element], flattenASTWithLists(element.value));
    }

    elements.push(element);

    return elements;
  }, []);
};

export const getElementValues = (
  ast: ParserElement[],
): ParserElement['value'][] => {
  return ast.map((element) => element.value);
};

export const findElement = (
  elements: ParserElement[],
  callback: (element: ParserElement) => boolean,
): ParserElement | undefined => {
  return flattenAST(elements).find(callback);
};

export const findElementByPath = (
  elements: ParserElement[],
  path: string,
): ParserElement | undefined => {
  return flattenAST(elements).find((element) => element.path === path);
};

export const getPrimitiveElements = (
  ast: ParserElement[],
): PrimitiveElement[] => {
  return ast.reduce<PrimitiveElement[]>((elements, element) => {
    if (isPrimitiveElement(element)) {
      elements.push(element);
    } else if (isParentElement(element)) {
      return elements.concat(getPrimitiveElements(element.value));
    }

    return elements;
  }, []);
};

export const rebaseElements = (
  from: string,
  to: string,
  branch: ParserElement[],
): ParserElement[] => {
  return branch.map((child) => {
    return {
      ...child,
      parent: child,
      path: child.path.replace(from, to),
      value: isParentElement(child)
        ? rebaseElements(from, to, child.value)
        : child.value,
    } as ParserElement;
  });
};
