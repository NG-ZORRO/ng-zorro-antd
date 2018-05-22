import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, ElementRef, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import sdk from '@stackblitz/sdk';

@Component({
  selector     : 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <section class="code-box" [ngClass]="{'expand':nzExpanded}" [attr.id]="nzId">
      <section class="code-box-demo">
        <div *ngIf="!showIframe" [class.simulate-iframe]="simulateIFrame" [class.browser-mockup]="simulateIFrame" [class.with-url]="simulateIFrame" [style.height.px]="simulateIFrame&&nzIframeHeight">
          <ng-content select="[demo]"></ng-content>
        </div>
        <div class="browser-mockup with-url" *ngIf="showIframe">
          <iframe [src]="iframe" [height]="nzIframeHeight" title="demo"></iframe>
        </div>
      </section>
      <section class="code-box-meta markdown">
        <div class="code-box-title">
          <a (click)="navigateToFragment()">{{ nzTitle }}
            <a class="edit-button" [attr.href]="nzHref" target="_blank" style="">
              <i class="anticon anticon-edit"></i>
            </a>
          </a>
        </div>
        <ng-content select="[intro]"></ng-content>
        <nz-tooltip [nzTitle]="nzExpanded?'Hide Code':'Show Code'">
        <span class="code-expand-icon" nz-tooltip (click)="nzExpanded=!nzExpanded">
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" [class.code-expand-icon-show]="nzExpanded" [class.code-expand-icon-hide]="!nzExpanded">
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" [class.code-expand-icon-show]="!nzExpanded" [class.code-expand-icon-hide]="nzExpanded">
          </span>
        </nz-tooltip>
      </section>
      <section class="highlight-wrapper" [ngClass]="{'highlight-wrapper-expand':nzExpanded}">
        <div class="highlight">
          <div class="code-box-actions">
            <nz-tooltip [nzTitle]="'Edit On StackBlitz'">
              <i nz-tooltip class="anticon anticon-form code-box-code-copy" (click)="openOnStackBlitz()"></i>
            </nz-tooltip>
            <nz-tooltip [nzTitle]="'Copy Code'">
              <i nz-tooltip class="anticon anticon-copy code-box-code-copy" [class.anticon-copy]="!_copied" [class.anticon-check]="_copied" [class.ant-tooltip-open]="_copied" (click)="copyCode(nzRawCode)"></i>
            </nz-tooltip>
          </div>
          <ng-content select="[code]"></ng-content>

          <nz-highlight [nzCode]="_code" [nzLanguage]="'typescript'"></nz-highlight>
        </div>
      </section>
    </section>
  `,
  styleUrls    : [
    './nz-codebox.less'
  ]
})
export class NzCodeBoxComponent implements OnInit {
  _code: string;
  _copied = false;
  showIframe: boolean;
  simulateIFrame: boolean;
  iframe: SafeUrl;
  @Input() nzTitle: string;
  @Input() nzExpanded = false;
  @Input() nzHref: string;
  @Input() nzLink: string;
  @Input() nzId: string;
  @Input() nzIframeHeight = 360;
  @Input() nzRawCode = '';
  @Input() nzComponentName = '';
  @Input() nzSelector = '';

  @Input() set nzIframeSource(value: string) {
    this.showIframe = (value != 'null') && environment.production;
    this.simulateIFrame = (value != 'null') && !environment.production;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  @Input()
  get nzCode(): string {
    return this._code;
  }

  set nzCode(value: string) {
    this._code = value;
  }

  navigateToFragment() {
    window.location.hash = this.nzLink;
  }

  copyCode(code) {
    this.copy(code).then(() => {
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {

    const promise = new Promise<string>(
      (resolve, reject): void => {
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

    return (promise);

  }

  /** bug here https://github.com/stackblitz/core/issues/311 **/
  openOnStackBlitz() {
    sdk.openProject({
      files: {
        '.angular-cli.json'   : `{
  "apps": [{
    "styles": ["styles.less"]
  }]
}`,
        'index.html'          : `<${this.nzSelector}>loading</${this.nzSelector}>`,
        'main.ts'             : `import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));`,
        'polyfills.ts'        : `/**
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
        'app/app.component.ts': this.nzRawCode,
        'app/app.module.ts'   : `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ${this.nzComponentName} } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgZorroAntdModule.forRoot(), BrowserAnimationsModule ],
  declarations: [ ${this.nzComponentName} ],
  bootstrap:    [ ${this.nzComponentName} ]
})
export class AppModule { }
`,
        'styles.less'         : `@import "~ng-zorro-antd/src/ng-zorro-antd.less";`
      },

      title       : 'Dynamically Generated Project',
      description : 'Created with <3 by the StackBlitz SDK!',
      template    : 'angular-cli',
      dependencies: {
        '@angular/cdk'                     : '^5.0.0',
        '@angular/core'                    : '^5.0.0',
        '@angular/forms'                   : '^5.0.0',
        '@angular/http'                    : '^5.0.0',
        '@angular/language-service'        : '^5.0.0',
        '@angular/platform-browser'        : '^5.0.0',
        '@angular/platform-browser-dynamic': '^5.0.0',
        '@angular/common'                  : '^5.0.0',
        '@angular/router'                  : '^5.0.0',
        '@angular/animations'              : '^5.0.0',
        'date-fns'                         : '^1.29.0',
        'ng-zorro-antd'                    : 'next'
      },
      tags        : [ 'stackblitz', 'sdk' ]
    });
  }

  constructor(@Inject(DOCUMENT) private dom: Document, private sanitizer: DomSanitizer, private _el: ElementRef, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }
}
