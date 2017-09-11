import resolve from 'rollup-plugin-node-resolve'

const format = process.env.ROLLUP_FORMAT || 'es'

let globals = {
  '@angular/animations': 'ng.animations',
  '@angular/cdk': 'ng.cdk',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/compiler': 'ng.compiler',
  '@angular/forms': 'ng.forms',
  '@angular/platform-browser': 'ng.platformBrowser',
  'moment': 'moment',
  'moment/locale/zh-cn': null,
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/operator/catch': 'Rx.Observable.prototype',
  'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operator/do': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype',
  'rxjs/operator/finally': 'Rx.Observable.prototype',
  'rxjs/operator/first': 'Rx.Observable.prototype',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/pluck': 'Rx.Observable.prototype',
  'rxjs/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/operator/throttleTime': 'Rx.Observable.prototype',
}

if (format === 'es') {
  globals = Object.assign(globals, {
    'tslib': 'tslib',
  })
}

function fixMoment() {
  return {
    name: 'fix-moment-import',
    transform(content) {
      if (!content.includes(`import * as moment from 'moment'`)) { return }

      return content.replace(
          `import * as moment from 'moment'`,
          `import moment from 'moment'`
      )
    },
  }
}

let input
let file

switch (format) {
  case 'es':
    input = './publish/src/index.js'
    file = './publish/esm15/index.js'
    break
  case 'umd':
    input = './publish/esm5/index.js'
    file = './publish/bundles/ng-zorro-antd.umd.js'
    break
  default:
    throw new Error(`format ${format} is not supported`)
}

export default {
  input,
  output: {
    file,
    format,
  },
  exports: 'named',
  name: 'ngZorro.antd',
  plugins: [fixMoment(), resolve()],
  external: Object.keys(globals),
  globals,
}
