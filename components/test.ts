// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// tslint:disable-next-line:no-import-side-effect
import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule
} from '@angular/platform-browser-dynamic/testing';

// tslint:disable-next-line:no-any
declare const __karma__: any;
// tslint:disable-next-line:no-any
declare const require: any;

const tags = __karma__.config.args[0];
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
jasmine.getEnv().allowRespy(true);

let filterRegExp: RegExp;

// skip webstorm arg
if (tags && tags.indexOf('--') === -1) {
  filterRegExp = new RegExp(`(${tags})\\.spec\\.ts$`);
} else {
  filterRegExp = /\.spec\.ts$/;
}

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// Filter specify file
const specFiles = context.keys().filter((path: string) => filterRegExp.test(path));
// And load the modules.
specFiles.map(context);
