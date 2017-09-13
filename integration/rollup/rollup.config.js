import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import angularOptimizer from 'rollup-plugin-angular-optimizer'

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
  input: './out-tsc/app/main.js',
  output: {
    file: './dist/main.bundle.js',
    format: 'iife',
  },
  globals: {},
  externals: [],
  plugins: [enableProdMode(), resolve(), angularOptimizer(), commonjs(), uglify()],
}
