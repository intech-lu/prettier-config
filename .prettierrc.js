/** @type {import('prettier').Config} */
const prettierConfig = {
  /* General */
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  /* Import sorter */
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '@/(.*)', '^[./]'],
  importOrderSeparation: true,

  /* Overrides */
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 120,
      }
    }
  ],
};

export default prettierConfig;