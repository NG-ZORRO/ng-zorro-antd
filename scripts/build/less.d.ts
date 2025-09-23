/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

declare module 'less-vars-to-js' {
  interface ConvertOption {
    stripPrefix: boolean;
    resolveVariables: boolean;
  }

  export default function lessToJs(vars: string, options?: Partial<ConvertOptions>): Record<string, string | number>;
}

abstract class LessPlugin implements Less.Plugin {
  constructor(options?: Record<string, unknown>);
  install: (less: LessStatic, pluginManager: PluginManager) => void;
  minVersion?: [number, number, number] | undefined;
}

declare module 'less-plugin-clean-css' {
  export default class LessPluginCleanCSS extends LessPlugin {}
}

declare module 'less-plugin-npm-import' {
  export default class NpmImportPlugin extends LessPlugin {}
}
