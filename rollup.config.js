import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
// import commonjs from 'rollup-plugin-commonjs';

const format = process.env.ROLLUP_FORMAT || 'es';

let globals = {
  '@angular/animations': 'ng.animations',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/common/http': 'ng.common.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-server': 'ng.platformServer',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/core/testing': 'ng.core.testing',
  '@angular/common/testing': 'ng.common.testing',
  '@angular/common/http/testing': 'ng.common.http.testing',

  '@angular/cdk': 'ng.cdk',
  '@angular/cdk/keycodes': 'ng.cdk.keycodes',
  '@angular/cdk/a11y': 'ng.cdk.a11y',
  '@angular/cdk/accordion': 'ng.cdk.accordion',
  '@angular/cdk/bidi': 'ng.cdk.bidi',
  '@angular/cdk/coercion': 'ng.cdk.coercion',
  '@angular/cdk/collections': 'ng.cdk.collections',
  '@angular/cdk/layout': 'ng.cdk.layout',
  '@angular/cdk/observers': 'ng.cdk.observers',
  '@angular/cdk/overlay': 'ng.cdk.overlay',
  '@angular/cdk/platform': 'ng.cdk.platform',
  '@angular/cdk/portal': 'ng.cdk.portal',
  '@angular/cdk/scrolling': 'ng.cdk.scrolling',
  '@angular/cdk/stepper': 'ng.cdk.stepper',
  '@angular/cdk/table': 'ng.cdk.table',

  'moment': 'moment',
  'moment/locale/zh-cn': null,

  'rxjs/Observer': 'Rx',
  'rxjs/Subscriber': 'Rx',
  'rxjs/Scheduler': 'Rx',

  'rxjs/observable/combineLatest': 'Rx.Observable',
  'rxjs/observable/throw': 'Rx.Observable',
  'rxjs/observable/defer': 'Rx.Observable',
  'rxjs/observable/fromEventPattern': 'Rx.Observable',
  'rxjs/observable/empty': 'Rx.Observable',

  'rxjs/operators/finalize': 'Rx.Observable',
  'rxjs/operators/catchError': 'Rx.Observable',
  'rxjs/operators/combineLatest': 'Rx.Observable',

  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/interval': 'Rx.Observable',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',


  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',

  // Legacy operators used by 3rd packages like @angular/core
  'rxjs/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/operator/catch': 'Rx.Observable.prototype',
  'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/operator/delay': 'Rx.Observable.prototype',
  'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operator/do': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype',
  'rxjs/operator/finally': 'Rx.Observable.prototype',
  'rxjs/operator/first': 'Rx.Observable.prototype',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/pluck': 'Rx.Observable.prototype',
  'rxjs/operator/share': 'Rx.Observable.prototype',
  'rxjs/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/operator/throttleTime': 'Rx.Observable.prototype',

  // Operators with chain-functionality itself (from rxjs 5.x) used by us
  'rxjs/operators/auditTime': 'Rx.Observable.prototype',
  'rxjs/operators/catch': 'Rx.Observable.prototype',
  'rxjs/operators/debounceTime': 'Rx.Observable.prototype',
  'rxjs/operators/delay': 'Rx.Observable.prototype',
  'rxjs/operators/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operators/do': 'Rx.Observable.prototype',
  'rxjs/operators/filter': 'Rx.Observable.prototype',
  'rxjs/operators/finally': 'Rx.Observable.prototype',
  'rxjs/operators/first': 'Rx.Observable.prototype',
  'rxjs/operators/map': 'Rx.Observable.prototype',
  'rxjs/operators/pluck': 'Rx.Observable.prototype',
  'rxjs/operators/share': 'Rx.Observable.prototype',
  'rxjs/operators/startWith': 'Rx.Observable.prototype',
  'rxjs/operators/switchMap': 'Rx.Observable.prototype',
  'rxjs/operators/takeUntil': 'Rx.Observable.prototype',
  'rxjs/operators/throttleTime': 'Rx.Observable.prototype',
  'rxjs/operators/tap': 'Rx.Observable.prototype',
};

if (format === 'es') {
  globals = Object.assign(globals, {
    'tslib': 'tslib',
  });
}

let input;
let file;

switch (format) {
  case 'es':
    input = './publish/src/index.js';
    file = './publish/esm15/index.js';
    break;
  case 'umd':
    input = './publish/esm5/index.js';
    file = './publish/bundles/ng-zorro-antd.umd.js';
    break;
  default:
    throw new Error(`format ${format} is not supported`);
}

export default {
  input,
  output: {
    file,
    format,
  },
  exports: 'named',
  name: 'ngZorro.antd',
  plugins: [
    replace({ "import * as moment": "import moment" }),
    resolve(),
    // commonjs({
    //   include: 'node_modules/rxjs/operator/*'
    // }), // Resolve: Error: 'xxx' is not exported by xxx, see: https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module
  ],
  external: Object.keys(globals),
  globals,
}
