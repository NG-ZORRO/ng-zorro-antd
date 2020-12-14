export const SchematicsTestTsConfig = {
  compilerOptions: {
    experimentalDecorators: true,
    lib: ['es2015']
  }
}

export const SchematicsTestNGConfig = {
  version: 1,
  projects: {t: {root: '', architect: {build: {options: {tsConfig: './tsconfig.json'}}}}}
}