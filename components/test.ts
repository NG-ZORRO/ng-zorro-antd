/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// eslint-disable-next-line import/no-unassigned-import
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __karma__: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, unused-imports/no-unused-vars
declare const require: any;


// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  teardown: { destroyAfterEach: false }
});
jasmine.getEnv().allowRespy(true);


