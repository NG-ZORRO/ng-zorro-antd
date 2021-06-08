const prettierConfig = require('./.prettierrc.js');

module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 2021 },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      plugins: ['@typescript-eslint', 'jsdoc', 'import', 'header'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:prettier/recommended'
      ],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'header/header': [
          2,
          'block',
          [
            '*',
            ' * Use of this source code is governed by an MIT-style license that can be',
            ' * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE',
            ' '
          ],
          2
        ],
        'jsdoc/newline-after-description': 1,
        '@angular-eslint/component-selector': [
          'error',
          {
            type: ['element', 'attribute'],
            prefix: ['nz', 'test'],
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-class-suffix': [
          'error',
          {
            suffixes: ['Directive', 'Component', 'Base']
          }
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: ['nz']
          }
        ],
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-conflicting-lifecycle': 'off',
        '@angular-eslint/no-forward-ref': 'off',
        '@angular-eslint/no-host-metadata-property': 'off',
        '@angular-eslint/no-lifecycle-call': 'off',
        '@angular-eslint/no-pipe-impure': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/use-component-selector': 'off',
        '@angular-eslint/use-component-view-encapsulation': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array-simple'
          }
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message: 'Use {} instead.'
              },
              String: {
                message: 'Use string instead.'
              },
              Number: {
                message: 'Use number instead.'
              },
              Boolean: {
                message: 'Use boolean instead.'
              },
              Function: {
                message: 'Use specific callable interface instead.'
              }
            }
          }
        ],
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
            ignoreProperties: true
          }
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        'import/no-unassigned-import': 'error',
        'import/order': 'error',
        'no-bitwise': 'off',
        'no-duplicate-imports': 'error',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'error',
        'no-magic-numbers': 'off',
        'no-multiple-empty-lines': 'error',
        'no-redeclare': 'off',
        'no-underscore-dangle': 'off',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'off',
        'prefer-object-spread': 'error',
        'prefer-template': 'error',
        yoda: 'error'
      }
    },
    {
      files: ['**/demo/*.ts', '*.spec.ts'],
      rules: {
        'header/header': 'off'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {}
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'angular' }]
      }
    }
  ]
};
