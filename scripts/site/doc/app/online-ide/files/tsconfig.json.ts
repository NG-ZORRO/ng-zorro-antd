export default {
  compileOnSave: false,
  compilerOptions: {
    strict: true,
    noImplicitOverride: true,
    noPropertyAccessFromIndexSignature: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    skipLibCheck: true,
    isolatedModules: true,
    importHelpers: true,
    target: 'ES2022',
    module: 'preserve'
  },
  angularCompilerOptions: {
    enableI18nLegacyMessageIdFormat: false,
    strictInjectionParameters: true,
    strictInputAccessModifiers: true,
    typeCheckHostBindings: true,
    strictTemplates: true
  }
};
