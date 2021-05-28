/**
 * ... {required-variable} {optional-variable}? {required-enum-variable(op1|op2)} {optional-enum-variable(op3|op4)}?
 */
type PATH_SEPARATOR = ' ';
type VARIABLE_START = '{';
type VARIABLE_END = '}';
type VARIABLE_ENUM_START = '(';
type VARIABLE_ENUM_END = ')';
type VARIABLE_ENUM_SEPARATOR = '|';
type VARIABLE_OPTIONAL_IDENTIFIER = '?';

export type PipeEnum<T extends string> =
  string extends T
    ? string
    : T extends `${infer Start}${VARIABLE_ENUM_SEPARATOR}${infer Rest}`
      ? Start | PipeEnum<Rest>
      : T;

export type CommandParams<T extends string> =
  string extends T
  ? Record<string, string>
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_ENUM_START}${infer Options}${VARIABLE_ENUM_END}${VARIABLE_END}${VARIABLE_OPTIONAL_IDENTIFIER}${PATH_SEPARATOR}${infer Rest}`
  ? { [K in Param]?: PipeEnum<Options> } & CommandParams<Rest>
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_ENUM_START}${infer Options}${VARIABLE_ENUM_END}${VARIABLE_END}${PATH_SEPARATOR}${infer Rest}`
  ? { [K in Param]: PipeEnum<Options> } & CommandParams<Rest>
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_END}${VARIABLE_OPTIONAL_IDENTIFIER}${PATH_SEPARATOR}${infer Rest}`
  ? { [K in Param]?: string } & CommandParams<Rest>
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_END}${PATH_SEPARATOR}${infer Rest}`
  ? { [K in Param]: string } & CommandParams<Rest>
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_ENUM_START}${infer Options}${VARIABLE_ENUM_END}${VARIABLE_END}${VARIABLE_OPTIONAL_IDENTIFIER}`
  ? { [k in Param]?: PipeEnum<Options> }
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_ENUM_START}${infer Options}${VARIABLE_ENUM_END}${VARIABLE_END}`
  ? { [k in Param]: PipeEnum<Options> }
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_END}${VARIABLE_OPTIONAL_IDENTIFIER}`
  ? { [k in Param]?: string }
  : T extends `${infer _}${VARIABLE_START}${infer Param}${VARIABLE_END}`
  ? { [k in Param]: string }
  : Record<string, unknown>;

export type Definition<P extends Record<string, any>, K extends keyof P> = {
  name: K;
  description?: string;
  default?: P[K];
  required: P[K] extends string ? true : false;
  transform?(raw: P[K]): P[K];
  validate?(raw: P[K]): boolean;
};

export type ArgDefinitions<P extends Record<string, any>, K extends keyof P = keyof P> = (K extends any ? Definition<P, K> : never)[];
