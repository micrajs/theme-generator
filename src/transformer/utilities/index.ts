import lodash from 'lodash';
import pluralize from 'pluralize';

export const set = lodash.set;
export const clamp = lodash.clamp;
export const inRange = lodash.inRange;
export const random = lodash.random;
export const deburr = lodash.deburr;
export const escape = lodash.escape;
export const pad = lodash.pad;
export const padEnd = lodash.padEnd;
export const padStart = lodash.padStart;
export const unescape = lodash.unescape;
export const toPlural = (word: string) => pluralize.plural(word);
export const toSingular = (word: string) => pluralize.singular(word);
export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
export const toUpperCase = (value: string) => value.toUpperCase();
export const toLowerCase = (value: string) => value.toLowerCase();
export const toKebabCase = (value: string) => lodash.kebabCase(value);
export const toCamelCase = (value: string) => lodash.camelCase(value);
export const toSnakeCase = (value: string) => lodash.snakeCase(value);
export const toPascalCase = (value: string) => lodash.capitalize(lodash.camelCase(value));
export const toMacroCase = (value: string) => lodash.snakeCase(value).toUpperCase();
export const toSentenceCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();