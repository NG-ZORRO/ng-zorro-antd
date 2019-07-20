export const stackBlitzConfiguration = (componentName: string, appComponentCode: string, selector: string, version: string) => {
  const mainCode = `import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));`;
  const polyfillCode = `/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js'; // Run \`npm install --save classlist.js\`.

/**
 * Web Animations \`@angular/platform-browser/animations\`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before \`zone.js\` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code b efore importing zone.js.
 * import './zone-flags.ts';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass \`zone.js\` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
`;
  const appModuleCode = `
  import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { ${componentName} } from './app.component';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule, ReactiveFormsModule, NgZorroAntdModule, BrowserAnimationsModule, ScrollingModule, DragDropModule ],
  declarations: [ ${componentName} ],
  bootstrap:    [ ${componentName} ],
  providers   : [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class AppModule { }`;
  return {
    files: {
      'angular.json'            : `{
      "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
      "version": 1,
      "newProjectRoot": "projects",
      "projects": {
        "demo": {
          "root": "",
          "sourceRoot": "src",
          "projectType": "application",
          "prefix": "app",
          "schematics": {},
          "architect": {
            "build": {
              "builder": "@angular-devkit/build-angular:browser",
              "options": {
                "outputPath": "dist/demo",
                "index": "src/index.html",
                "main": "src/main.ts",
                "polyfills": "src/polyfills.ts",
                "tsConfig": "src/tsconfig.app.json",
                "assets": [
                  "src/favicon.ico",
                  "src/assets"
                ],
                "styles": [
                  "node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css",
                  "src/styles.css"
                ],
                "scripts": []
              },
              "configurations": {
                "production": {
                  "fileReplacements": [
                    {
                      "replace": "src/environments/environment.ts",
                      "with": "src/environments/environment.prod.ts"
                    }
                  ],
                  "optimization": true,
                  "outputHashing": "all",
                  "sourceMap": false,
                  "extractCss": true,
                  "namedChunks": false,
                  "aot": true,
                  "extractLicenses": true,
                  "vendorChunk": false,
                  "buildOptimizer": true
                }
              }
            },
            "serve": {
              "builder": "@angular-devkit/build-angular:dev-server",
              "options": {
                "browserTarget": "demo:build"
              },
              "configurations": {
                "production": {
                  "browserTarget": "demo:build:production"
                }
              }
            },
            "extract-i18n": {
              "builder": "@angular-devkit/build-angular:extract-i18n",
              "options": {
                "browserTarget": "demo:build"
              }
            },
            "test": {
              "builder": "@angular-devkit/build-angular:karma",
              "options": {
                "main": "src/test.ts",
                "polyfills": "src/polyfills.ts",
                "tsConfig": "src/tsconfig.spec.json",
                "karmaConfig": "src/karma.conf.js",
                "styles": [
                  "styles.css"
                ],
                "scripts": [],
                "assets": [
                  "src/favicon.ico",
                  "src/assets"
                ]
              }
            },
            "lint": {
              "builder": "@angular-devkit/build-angular:tslint",
              "options": {
                "tsConfig": [
                  "src/tsconfig.app.json",
                  "src/tsconfig.spec.json"
                ],
                "exclude": [
                  "**/node_modules/**"
                ]
              }
            }
          }
        },
        "demo-e2e": {
          "root": "e2e/",
          "projectType": "application",
          "architect": {
            "e2e": {
              "builder": "@angular-devkit/build-angular:protractor",
              "options": {
                "protractorConfig": "e2e/protractor.conf.js",
                "devServerTarget": "demo:serve"
              }
            },
            "lint": {
              "builder": "@angular-devkit/build-angular:tslint",
              "options": {
                "tsConfig": "e2e/tsconfig.e2e.json",
                "exclude": [
                  "**/node_modules/**"
                ]
              }
            }
          }
        }
      },
      "defaultProject": "demo"
    }`,
      'src/index.html'          : `<${selector}>loading</${selector}>`,
      'src/main.ts'             : `${mainCode}`,
      'src/app/app.component.ts': `${appComponentCode}`,
      'src/polyfills.ts': `${polyfillCode}`,
      'src/app/app.module.ts'   : `${appModuleCode}`,
      'src/styles.css'          : `/* Add application styles & imports to this file! */;`
    },

    title       : 'Dynamically Generated Project',
    description : 'Created with <3 by the StackBlitz SDK!',
    template    : 'angular-cli',
    dependencies: {
      'rxjs'                             : '~6.5.2',
      '@angular/cdk'                     : '^8.0.0',
      '@angular/compiler'                : '^8.0.0',
      '@angular/core'                    : '^8.0.0',
      '@angular/forms'                   : '^8.0.0',
      '@angular/language-service'        : '^8.0.0',
      '@angular/platform-browser'        : '^8.0.0',
      '@angular/platform-browser-dynamic': '^8.0.0',
      '@angular/common'                  : '^8.0.0',
      '@angular/router'                  : '^8.0.0',
      '@angular/animations'              : '^8.0.0',
      '@ant-design/icons-angular'        : '^8.0.0',
      'date-fns'                         : '^1.30.1',
      'ng-zorro-antd':  `^${version}`
    },
    tags        : [ 'stackblitz', 'sdk' ]
  };
};
