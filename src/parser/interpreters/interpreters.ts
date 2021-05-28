import {
  booleanInterpreter,
  factoryInterpreter,
  listInterpreter,
  nodeInterpreter,
  nullishInterpreter,
  numericInterpreter,
  stringInterpreter,
} from './element-interpreter';
import type { ParserInterpreter } from './types';

export const interpreters = [
  stringInterpreter,
  numericInterpreter,
  booleanInterpreter,
  nullishInterpreter,
  listInterpreter,
  nodeInterpreter,
  factoryInterpreter,
] as ParserInterpreter[];
