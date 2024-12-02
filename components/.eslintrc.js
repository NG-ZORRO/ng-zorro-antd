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
        '@typescript-eslint/no-unsafe-function-type': 'error',
        '@typescript-eslint/no-wrapper-object-types': 'error',
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
