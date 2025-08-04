const warnOnDevelop = process.env.NODE_ENV === 'production' ? 'error' : 'warn';
const offOnDevelop = process.env.NODE_ENV === 'production' ? 'error' : 'off';
const offOnDevelopWarnOnProd = process.env.NODE_ENV === 'production' ? 'warn' : 'off';

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript',
    ],
    plugins: ['import', '@typescript-eslint'],
    rules: {
        'no-console': offOnDevelopWarnOnProd,
        'no-debugger': offOnDevelop,
        'comma-dangle': [
            warnOnDevelop,
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        semi: 0,
        'no-case-declarations': 0,
        'no-constant-condition': 'off',
        quotes: ['warn', 'single'],
        'no-trailing-spaces': [warnOnDevelop, { skipBlankLines: true }],
        'comma-spacing': [warnOnDevelop, { before: false, after: true }],
        'vue/html-indent': [
            warnOnDevelop,
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: false,
                ignores: [],
            },
        ],
        'vue/max-attributes-per-line': [
            warnOnDevelop,
            {
                singleline: {
                    max: 3,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        'vue/singleline-html-element-content-newline': 0,
        'vue/multiline-html-element-content-newline': [
            warnOnDevelop,
            {
                ignoreWhenEmpty: true,
                ignores: [],
                allowEmptyLines: false,
            },
        ],
        'vue/attribute-hyphenation': 2,
        'vue/attributes-order':[warnOnDevelop, {
            'order': [
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'OTHER_DIRECTIVES',
                'TWO_WAY_BINDING',
                'CONTENT',
                'SLOT',
                'DEFINITION',
                'GLOBAL',
                'UNIQUE',
                'ATTR_DYNAMIC',
                'ATTR_STATIC',
                'ATTR_SHORTHAND_BOOL',
                'EVENTS',
            ],
            'alphabetical': false,
        }],
        'vue/v-on-style': [warnOnDevelop, 'shorthand'],
        'vue/v-bind-style': [warnOnDevelop, 'shorthand'],
        'vue/no-useless-template-attributes': 1,
        'no-multiple-empty-lines': [warnOnDevelop, { max: 1, maxEOF: 1 }],
        'vue/no-v-html': 0,
        'vue/this-in-template': 0,
        'vue/require-default-prop': 0,
        'vue/no-v-model-argument': 0,
        'vue/no-multiple-template-root': 0,
        'vue/no-deprecated-slot-attribute': 0,
        'vue/multi-word-component-names': 0,
        'vue/valid-v-slot': [ 'error', { allowModifiers: true } ],
        'import/order': [
            warnOnDevelop,
            {
                warnOnUnassignedImports: true,
                groups: [
                    'builtin',
                    'external',
                    'type',
                    'internal',
                    'index',
                    'parent',
                    'sibling',
                ],
            },
        ],
        'sort-imports': [
            warnOnDevelop,
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
            },
        ],
        'object-curly-spacing': [warnOnDevelop, 'always'],
        'arrow-parens': [warnOnDevelop, 'always'],
        'space-in-parens': [warnOnDevelop, 'never'],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/semi': [warnOnDevelop, 'always'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/ban-types': 0,
        'no-irregular-whitespace': 0,
        'no-implicit-coercion': [warnOnDevelop, { boolean: true, number: true, disallowTemplateShorthand: false }],
        '@typescript-eslint/array-type': [warnOnDevelop, {
            default: 'array-simple',
            readonly: 'array-simple',
        }],
        'curly': [warnOnDevelop, 'all'],
        'brace-style': [warnOnDevelop, '1tbs', { allowSingleLine: false }],
        'indent': [warnOnDevelop, 4, { SwitchCase: 1 }],
        'block-spacing': [warnOnDevelop, 'always'],
        'import/no-relative-packages': warnOnDevelop,
        '@typescript-eslint/naming-convention': 'off', // Modern TypeScript doesn't require I/T prefixes
    },
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
};