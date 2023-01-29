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
        '@typescript-eslint/member-ordering': 'off',
        'no-invalid-this': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
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
        ]
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
