// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import header from 'eslint-plugin-header';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

header.rules.header.meta.schema = false;

export default tseslint.config(
  {
    ignores: [
      '.*/',
      'site/',
      'publish/',
      'lib/',
      'dist/',
      'scripts/site/{_site,template}/**/*',
      'junit/',
      'coverage-report/'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: ['tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      jsdoc,
      import: importPlugin,
      header,
      prettier,
      'unused-imports': unusedImports
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'prettier/prettier': 'error',
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
      '@angular-eslint/no-rename-input': 'off',
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
      '@typescript-eslint/no-empty-object-type': ['error', {
        allowInterfaces: 'always',
        allowObjectTypes: 'always'
      }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit'
        }
      ],
      '@typescript-eslint/no-empty-function': 'off',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true
        }
      ],
      '@typescript-eslint/no-require-imports': 'warn',
      'prefer-arrow/prefer-arrow-functions': 'off',
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'error',
      'import/no-unassigned-import': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: false },
          'newlines-between': 'always',
          groups: ['external', 'builtin', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '{@angular/**,rxjs,rxjs/operators}',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'ng-zorro-antd/**',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: []
        }
      ],
      'no-prototype-builtins': 'off',
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
    files: ['components/**/demo/*.ts'],
    rules: {
      'header/header': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended
      // todo(a11y)
      // ...angular.configs.templateAccessibility,
    ],
    rules: {}
  }
);
