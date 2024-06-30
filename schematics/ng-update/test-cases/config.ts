/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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