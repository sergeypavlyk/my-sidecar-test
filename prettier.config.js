import styleguide from '@vercel/style-guide/prettier';

module.exports = {
    ...styleguide,
    plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
    endOfLine: 'auto',
    singleQuote: true,
    arrowParens: 'always',
    bracketSpacing: true,
    semi: true,
    trailingComma: 'all',
    useTabs: false,
    printWidth: 100,
    tabWidth: 2,
};
