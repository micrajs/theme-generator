import '../theme-generator.d';
import { themeGenerator } from '../themeGenerator';
import { Transformer } from '../transformer';
import { join } from 'path';
import { isStringValue, PrimitiveValue } from '../parser';

const toCSSVariables: Transformer<string> = {
  name: 'CSS_VARIABLES',
  transform(
    ast,
    {
      toKebabCase,
      flattenASTWithLists,
      isElement,
      isListElement,
      isNodeElement,
      isPrimitiveElement,
    },
  ) {
    return flattenASTWithLists(ast)
      .filter((element) => !isNodeElement(element))
      .reduce((result, element) => {
        const name = `--${toKebabCase(element.path)}`;

        let value: PrimitiveValue;
        if (isElement(element.parent)) {
          value = `var(--${toKebabCase(element.parent.path)})`;
        } else if (isListElement(element)) {
          value = element.value.map((child) => child.value).join(', ');
        } else if (isPrimitiveElement(element)) {
          value = element.value;
        } else {
          throw new Error(
            'invalid element: ' + JSON.stringify(element, null, 2),
          );
        }

        return result ? `${result}\n${name}: ${value};` : `${name}: ${value};`;
      }, '');
  },
};

const toColorUnion: Transformer<string> = {
  name: 'COLOR_UNION',
  transform(ast, { toKebabCase, flattenASTWithLists, isNodeElement }) {
    return flattenASTWithLists(ast)
      .filter((element) => !isNodeElement(element))
      .reduce((result, element) => {
        if (element.path.startsWith('colors')) {
          return `${result}\n\t| '${toKebabCase(element.path)}'`;
        }

        return result;
      }, '');
  },
};

describe('parser tests', () => {
  it('should pass', () => {
    const gen = themeGenerator({
      plugins: [
{
  parser: {
    willParseValue(value, context) {
      // Colors RGBA syntax
      if (isStringValue(value) && value.includes('|') && context.options.namespace.includes('colors')) {
        const [path, alpha] = value.split('|');

        return ({ rgba }) => rgba(path, Number(alpha));
      }

      return value;
    }
  }
}
      ]
    });
    const parsed = gen.parse({
      root: 'val',
      colors: {
        black: '#000',
        red: '#f00',
        green: '#0f0',
        blue: '#00f',
        overlay: 'colors.black|0.1',
      },
      opacity: {
        10: 0.1,
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      textColors: ({ get }) => get('colors'),
      backgroundColors: {
        root: ({ get }) => get('root'),
        black: ({ get }) => get('colors.black'),
        whiteOverlay: ({ rgba }) => rgba('#fff', 0.5),
        overlay: ({ rgba }) => rgba('colors.black', 0.5),
      },
    });

    const transformed = parsed.transform(toCSSVariables, toColorUnion);

    transformed.generate(join(__dirname, 'test.css'), {
      force: true,
      templatePath: join(__dirname, 'template.mustache'),
      format: {
        parser: 'css',
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
      },
    });
  });
});
