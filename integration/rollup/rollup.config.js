import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser";
import { buildOptimizer } from '@angular-devkit/build-optimizer'

function optimizer() {
  return {
    name: 'angular-optimizer',
    transform: (content, id) => {
      const { content: code, sourceMap: map } = buildOptimizer({ content, inputFilePath: id, emitSourceMap: true });
      if (!code) { return null }
      if (!map) { return code }
      return { code, map }
    },
  }
}


function enableProdMode() {
  return {
    name: 'enable-prod-mode',
    transform(content, id) {
      if (!id.includes('main.js')) { return }

      return content
        .replace(/platformBrowserDynamic/g, `platformBrowser`)
        .replace(/bootstrapModule/g, `bootstrapModuleFactory`)
        .replace(/AppModule/g, `AppModuleNgFactory`)
        .replace(`from '@angular/platform-browser-dynamic'`, `from '@angular/platform-browser'`)
        .replace(`from './environments/environment'`, `from './environments/environment.prod'`)
        .replace(`from './app/app.module'`, `from './app/app.module.ngfactory'`)
    },
  }
}


export default {
  input: './out-tsc/app/src/main.js',
  output: {
    file: './dist/main.bundle.js',
    format: 'iife',
  },
  plugins: [enableProdMode(), resolve(), optimizer(), commonjs(), terser()],
}
