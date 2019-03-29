import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="code-box" [ngClass]="{ expand: nzExpanded }" [attr.id]="nzId">
      <section class="code-box-demo">
        <div
          *ngIf="!showIframe"
          [class.simulate-iframe]="simulateIFrame"
          [class.browser-mockup]="simulateIFrame"
          [class.with-url]="simulateIFrame"
          [style.height.px]="simulateIFrame && nzIframeHeight"
        >
          <ng-content select="[demo]"></ng-content>
        </div>
        <div class="browser-mockup with-url" *ngIf="showIframe">
          <iframe [src]="iframe" [height]="nzIframeHeight" title="demo"></iframe>
        </div>
      </section>
      <section class="code-box-meta markdown">
        <div class="code-box-title">
          <a (click)="navigateToFragment()"
            >{{ nzTitle }}
            <a class="edit-button" [attr.href]="nzHref" target="_blank" style="">
              <i nz-icon type="edit"></i>
            </a>
          </a>
        </div>
        <ng-content select="[intro]"></ng-content>
        <nz-tooltip [nzTitle]="nzExpanded ? 'Hide Code' : 'Show Code'">
          <span class="code-expand-icon" nz-tooltip (click)="nzExpanded = !nzExpanded">
            <img
              alt="expand code"
              src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
              [class.code-expand-icon-show]="nzExpanded"
              [class.code-expand-icon-hide]="!nzExpanded"
            />
            <img
              alt="expand code"
              src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
              [class.code-expand-icon-show]="!nzExpanded"
              [class.code-expand-icon-hide]="nzExpanded"
            />
          </span>
        </nz-tooltip>
      </section>
      <section class="highlight-wrapper" [ngClass]="{ 'highlight-wrapper-expand': nzExpanded }">
        <div class="highlight">
          <div class="code-box-actions">
            <i
              [nzTitle]="'Edit On StackBlitz'"
              nz-tooltip
              nz-icon
              type="form"
              class="code-box-code-copy"
              (click)="openOnStackBlitz()"
            ></i>
            <i
              [nzTitle]="'Copy Code'"
              nz-tooltip
              nz-icon
              [type]="copied ? 'check' : 'copy'"
              class="code-box-code-copy"
              [class.ant-tooltip-open]="copied"
              (click)="copyCode(nzRawCode)"
            ></i>
            <i
              [nzTitle]="'Copy Generate Command'"
              *ngIf="nzGenerateCommand"
              nz-tooltip
              nz-icon
              [type]="commandCopied ? 'check' : 'code'"
              class="code-box-code-copy"
              [class.ant-tooltip-open]="commandCopied"
              (click)="copyGenerateCommand(nzGenerateCommand)"
            ></i>
          </div>
          <ng-content select="[code]"></ng-content>
          <nz-highlight [nzCode]="nzCode" [nzLanguage]="'typescript'"></nz-highlight>
        </div>
      </section>
    </section>
  `,
  styleUrls: ['./nz-codebox.less']
})
export class NzCodeBoxComponent {
  rawCode: string;
  copied = false;
  commandCopied = false;
  showIframe: boolean;
  simulateIFrame: boolean;
  iframe: SafeUrl;
  @Input() nzCode: string;
  @Input() nzTitle: string;
  @Input() nzExpanded = false;
  @Input() nzHref: string;
  @Input() nzLink: string;
  @Input() nzId: string;
  @Input() nzIframeHeight = 360;
  @Input() nzComponentName = '';
  @Input() nzSelector = '';
  @Input() nzGenerateCommand = '';

  @Input()
  set nzIframeSource(value: string) {
    this.showIframe = value !== 'null' && environment.production;
    this.simulateIFrame = value !== 'null' && !environment.production;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  @Input()
  get nzRawCode(): string {
    return this.rawCode;
  }

  set nzRawCode(value: string) {
    this.rawCode = decodeURIComponent(value).trim();
  }

  navigateToFragment(): void {
    window.location.hash = this.nzLink;
  }

  copyCode(code: string): void {
    this.copy(code).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    });
  }

  copyGenerateCommand(command: string): void {
    this.copy(command).then(() => {
      this.commandCopied = true;
      setTimeout(() => {
        this.commandCopied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {
    const promise = new Promise<string>(
      (resolve): void => {
        // @ts-ignore
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = this.dom.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          this.dom.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          this.dom.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return promise;
  }

  /** bug here https://github.com/stackblitz/core/issues/311 **/
  openOnStackBlitz() {
    sdk.openProject({
      files: {
        'angular.json': `{
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
        'src/index.html': `<${this.nzSelector}>loading</${this.nzSelector}>`,
        'src/main.ts': `import './polyfills';

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
}).catch(err => console.error(err));`,
        'src/polyfills.ts': `/**
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
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run \`npm install --save classlist.js\`.

/** IE10 and IE11 requires the following to support \`@angular/animation\`. */
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.


/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';


/** ALL Firefox browsers require the following to support \`@angular/animation\`. **/
// import 'web-animations-js';  // Run \`npm install --save web-animations-js\`.



/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run \`npm install --save intl\`.`,
        'src/app/app.component.ts': this.nzRawCode,
        'src/app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { ${this.nzComponentName} } from './app.component';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule, ReactiveFormsModule, NgZorroAntdModule, BrowserAnimationsModule ],
  declarations: [ ${this.nzComponentName} ],
  bootstrap:    [ ${this.nzComponentName} ],
  providers   : [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ]
})
export class AppModule { }
`,
        'src/styles.css': `/* Add application styles & imports to this file! */;`
      },

      title: 'Dynamically Generated Project',
      description: 'Created with <3 by the StackBlitz SDK!',
      template: 'angular-cli',
      dependencies: {
        rxjs: '^6.3.3',
        '@angular/cdk': '^7.0.0',
        '@angular/core': '^7.0.0',
        '@angular/forms': '^7.0.0',
        '@angular/http': '^7.0.0',
        '@angular/language-service': '^7.0.0',
        '@angular/platform-browser': '^7.0.0',
        '@angular/platform-browser-dynamic': '^7.0.0',
        '@angular/common': '^7.0.0',
        '@angular/router': '^7.0.0',
        '@angular/animations': '^7.0.0',
        '@ant-design/icons-angular': '^2.0.2',
        'date-fns': '^1.29.0',
        tslib: '^1.9.3',
        typescript: '~3.1.1',
        'ng-zorro-antd': '^7.2.0'
      },
      tags: ['stackblitz', 'sdk']
    });
  }

  constructor(@Inject(DOCUMENT) private dom: any, private sanitizer: DomSanitizer) {}
}
