import type { Options as PrettierOptions } from 'prettier';
import { TransformOptions } from '../transformer';

export interface GenerateOptions extends TransformOptions {
  force?: boolean;
  template?: string;
  templatePath?: string;
  content: Record<string, any>;
  format?: PrettierOptions;
  variables?: Record<string, any>;
}

export type Generate = (path: string, options: GenerateOptions) => void;
