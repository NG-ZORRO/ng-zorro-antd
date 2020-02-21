export const SchematicsTestTsConfig = {
  compilerOptions: {
    experimentalDecorators: true,
    lib: ['es2015']
  }
}

export const SchematicsTestNGConfig = {
  projects: {t: {root: '', architect: {build: {options: {tsConfig: './tsconfig.json'}}}}}
}