module.exports = {
  extends: '../.eslintrc.js',
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.lib.json'],
        createDefaultProgram: true
      },
      rules: {
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
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/consistent-type-definitions': 'error',
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
        // start
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/member-ordering': 'off',
        'no-invalid-this': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        'prefer-arrow/prefer-arrow-functions': 'off',
        '@angular-eslint/no-input-rename': 'off',
        'prefer-const': 'off',
        'max-len': 'off',
        '@typescript-eslint/ban-types': [
          'off',
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
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        // end
        '@typescript-eslint/no-this-alias': 'error',
        'brace-style': ['error', '1tbs'],
        'comma-dangle': 'error',
        'import/no-unassigned-import': 'error',
        'import/order': 'error',
        'linebreak-style': ['error', 'unix'],
        'no-bitwise': 'off',
        'no-duplicate-imports': 'error',
        'no-irregular-whitespace': 'error',
        'no-magic-numbers': 'off',
        'no-multiple-empty-lines': 'error',
        'no-redeclare': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'off',
        'prefer-object-spread': 'error',
        'prefer-template': 'error',
        yoda: 'error'
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
