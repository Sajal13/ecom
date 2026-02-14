module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    'react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '^@/',
    '^components/(.*)$',
    '^.types',
    '^.styles',
    '^[./]',
  ],
};
