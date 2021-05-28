declare namespace Theme {
  interface ParserContext {
    //
  }

  interface FactoryContext {
    get(path: string): string | import('./parser').ParserElement;
    adjustHue(pathOrColor: string, degree: number | string): string;
    complement(pathOrColor: string): string;
    darken(pathOrColor: string, amount: number | string): string;
    desaturate(pathOrColor: string, amount: number | string): string;
    getContrast(pathOrColor1: string, pathOrColor2: string): number;
    getLuminance(pathOrColor: string): number;
    grayscale(pathOrColor: string): string;
    hsl(hue: number, saturation: number, lightness: number): string;
    hsla(
      hue: number,
      saturation: number,
      lightness: number,
      alpha: number,
    ): string;
    hslToColorString(
      hue: number,
      saturation: number,
      lightness: number,
      alpha?: number,
    ): string;
    invert(pathOrColor: string): string;
    lighten(pathOrColor: string, amount: number | string): string;
    mix(
      pathOrColor1: string,
      pathOrColor2: string,
      weight: number | string,
    ): string;
    opacify(pathOrColor: string, amount: number | string): string;
    rgba(pathOrColor: string, alpha: number): string;
  }

  interface TransformerContext {
    toPlural: (word: string) => string;
    toSingular: (word: string) => string;
    capitalize: (word: string) => string;
    toUpperCase: (word: string) => string;
    toLowerCase: (word: string) => string;
    toKebabCase: (word: string) => string;
    toCamelCase: (word: string) => string;
    toSnakeCase: (word: string) => string;
    toPascalCase: (word: string) => string;
    toMacroCase: (word: string) => string;
    set: import('lodash').LoDashStatic['set'];
    clamp: import('lodash').LoDashStatic['clamp'];
    inRange: import('lodash').LoDashStatic['inRange'];
    random: import('lodash').LoDashStatic['random'];
    deburr: import('lodash').LoDashStatic['deburr'];
    escape: import('lodash').LoDashStatic['escape'];
    pad: import('lodash').LoDashStatic['pad'];
    padEnd: import('lodash').LoDashStatic['padEnd'];
    padStart: import('lodash').LoDashStatic['padStart'];
    unescape: import('lodash').LoDashStatic['unescape'];
    flattenAST: (
      ast: import('./parser').ParserElement[],
    ) => import('./parser').ParserElement[];
    flattenASTWithLists: (
      ast: import('./parser').ParserElement[],
    ) => import('./parser').ParserElement[];
    findElement: (
      elements: import('./parser').ParserElement[],
      callback: (element: import('./parser').ParserElement) => boolean,
    ) => import('./parser').ParserElement | undefined;
    findElementByPath: (
      elements: import('./parser').ParserElement[],
      path: string,
    ) => import('./parser').ParserElement | undefined;
    getPrimitiveElements: (
      ast: import('./parser').ParserElement[],
    ) => import('./parser').PrimitiveElement[];
    getElementValues: (
      ast: import('./parser').ParserElement[],
    ) => import('./parser').ParserElement['value'][];
    isElement: (
      definition: any,
    ) => definition is import('./parser').ParserElement;
    isStringValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').StringValue;
    isNumericValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').NumericValue;
    isBooleanValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').BooleanValue;
    isNullishValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').NullishValue;
    isPrimitiveValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').PrimitiveValue;
    isNodeValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').NodeValue;
    isListValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').ListValue;
    isParentValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').ParentValue;
    isFactoryValue: (
      definition: import('./parser').ParserValue,
    ) => definition is import('./parser').FactoryValue;
    isNodeElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').NodeElement;
    isStringElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').StringElement;
    isNumericElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').NumericElement;
    isListElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').ListElement;
    isBooleanElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').BooleanElement;
    isNullishElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').NullishElement;
    isFactoryElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').FactoryElement;
    isPrimitiveElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').PrimitiveElement;
    isParentElement: (
      definition: import('./parser').ParserElement,
    ) => definition is import('./parser').ParentElement;
  }

  interface GeneratorContext {
    //
  }
}
