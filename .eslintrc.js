module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'universe',
        'universe/native',
        'universe/web',
        'universe/shared/typescript-analysis',
    ],
    rules: {
        'import/order': 'off',
    },
    env: {
        node: true,
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
};
