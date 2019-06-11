// Load zone.js for the server.
import { ensureDirSync, readFileSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Fix the `Event is not defined` error https://github.com/angular/universal/issues/844
// tslint:disable-next-line no-string-literal
global['Event'] = null;

// Import module map for lazy loading
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ROUTES } from './static.paths';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

const BROWSER_FOLDER = join(process.cwd(), '/');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('./', 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route => {
  console.log(`Rendering\t${route}`);

  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  ensureDirSync(fullPath);

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender
    .then(_ =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
      })
    )
    .then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
