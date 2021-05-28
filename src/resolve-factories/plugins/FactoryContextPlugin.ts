import {
  get,
  adjustHue,
  complement,
  darken,
  desaturate,
  getContrast,
  getLuminance,
  grayscale,
  hsl,
  hsla,
  hslToColorString,
  invert,
  lighten,
  mix,
  opacify,
  rgba,
} from '../utilities';
import type { Plugin } from '../../plugins/types';

export const FactoryContextPlugin: Plugin = {
  factory: {
    context: (ctx) => ({
      get: get(ctx),
      adjustHue: adjustHue(ctx),
      complement: complement(ctx),
      darken: darken(ctx),
      desaturate: desaturate(ctx),
      getContrast: getContrast(ctx),
      getLuminance: getLuminance(ctx),
      grayscale: grayscale(ctx),
      hsl: hsl(ctx),
      hsla: hsla(ctx),
      hslToColorString: hslToColorString(ctx),
      invert: invert(ctx),
      lighten: lighten(ctx),
      mix: mix(ctx),
      opacify: opacify(ctx),
      rgba: rgba(ctx),
    }),
  },
};
