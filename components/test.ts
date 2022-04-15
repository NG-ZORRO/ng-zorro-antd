/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// eslint-disable-next-line import/no-unassigned-import
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __karma__: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

const tags = __karma__.config.args[0];
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: { destroyAfterEach: false }
});
jasmine.getEnv().allowRespy(true);

let filterRegExp: RegExp;

// skip webstorm arg
if (tags && tags.indexOf('--') === -1) {
  filterRegExp = new RegExp(`(${tags})\\.spec\\.ts$`);
} else {
  filterRegExp = /\.spec\.ts$/;
}

// Then we find all the tests.
const context = require.context('../components/', true, /\.spec\.ts$/);
// Filter specify file
const specFiles = context.keys().filter((path: string) => filterRegExp.test(path));
// And load the modules.
specFiles.map(context);
