import * as polished from 'polished';
import { flattenAST, isElement, isStringElement } from '../../parser';
import { Utility } from '../../resolve-factories/types';

export const get: Utility<'get'> = (ctx) => (path) => {
  return (
    flattenAST(ctx.options.ast).find((element) => element.path === path) ?? path
  );
};

export const adjustHue: Utility<'adjustHue'> = (ctx) => (
  pathOrColor,
  degree,
) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.adjustHue(degree, value);
};

export const complement: Utility<'complement'> = (ctx) => (pathOrColor) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.complement(value);
};

export const darken: Utility<'darken'> = (ctx) => (pathOrColor, amount) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.darken(amount, value);
};

export const desaturate: Utility<'desaturate'> = (ctx) => (
  pathOrColor,
  amount,
) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.desaturate(amount, value);
};

export const getContrast: Utility<'getContrast'> = (ctx) => (
  pathOrColor1,
  pathOrColor2,
) => {
  const element1 = get(ctx)(pathOrColor1);
  const value1 =
    isElement(element1) && isStringElement(element1)
      ? element1.value
      : pathOrColor1;
  const element2 = get(ctx)(pathOrColor2);
  const value2 =
    isElement(element2) && isStringElement(element2)
      ? element2.value
      : pathOrColor2;

  return polished.getContrast(value1, value2);
};

export const getLuminance: Utility<'getLuminance'> = (ctx) => (pathOrColor) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.getLuminance(value);
};

export const grayscale: Utility<'grayscale'> = (ctx) => (pathOrColor) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.grayscale(value);
};

export const hsl: Utility<'hsl'> = () => (hue, saturation, lightness) => {
  return polished.hsl(hue, saturation, lightness);
};

export const hsla: Utility<'hsla'> = () => (
  hue,
  saturation,
  lightness,
  alpha,
) => {
  return polished.hsla(hue, saturation, lightness, alpha);
};

export const hslToColorString: Utility<'hslToColorString'> = () => (
  hue,
  saturation,
  lightness,
  alpha,
) => {
  return polished.hslToColorString({ hue, saturation, lightness, alpha });
};

export const invert: Utility<'invert'> = (ctx) => (pathOrColor) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.invert(value);
};

export const lighten: Utility<'lighten'> = (ctx) => (pathOrColor, amount) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.lighten(amount, value);
};

export const mix: Utility<'mix'> = (ctx) => (
  pathOrColor1,
  pathOrColor2,
  weight,
) => {
  const element1 = get(ctx)(pathOrColor1);
  const value1 =
    isElement(element1) && isStringElement(element1)
      ? element1.value
      : pathOrColor1;
  const element2 = get(ctx)(pathOrColor2);
  const value2 =
    isElement(element2) && isStringElement(element2)
      ? element2.value
      : pathOrColor2;

  return polished.mix(weight, value1, value2);
};

export const opacify: Utility<'opacify'> = (ctx) => (pathOrColor, amount) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.opacify(amount, value);
};

export const rgba: Utility<'rgba'> = (ctx) => (pathOrColor, alpha) => {
  const element = get(ctx)(pathOrColor);
  const value =
    isElement(element) && isStringElement(element)
      ? element.value
      : pathOrColor;

  return polished.rgba(value, alpha);
};
