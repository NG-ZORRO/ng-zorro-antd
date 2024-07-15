import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import sdk from '@stackblitz/sdk';
import { VERSION } from 'ng-zorro-antd/version';

import angularJSON from './files/angular.json';
import appModuleTS from './files/app.module';
import environmentTS from './files/environment';
import mainTS from './files/main';
import nzModuleTS from './files/ng-zorro-antd.module';
import polyfillTS from './files/polyfill';

@Injectable({
  providedIn: 'root'
})
export class OnlineIdeService {
  document: Document;
  template = 'angular-cli' as const;
  dependencies = {
    '@angular/animations': '^18.0.0',
    '@angular/cdk': '^18.0.0',
    '@angular/common': '^18.0.0',
    '@angular/compiler': '^18.0.0',
    '@angular/core': '^18.0.0',
    '@angular/forms': '^18.0.0',
    '@angular/platform-browser': '^18.0.0',
    '@angular/platform-browser-dynamic': '^18.0.0',
    '@angular/router': '^18.0.0',
    '@ant-design/icons-angular': '^18.0.0',
    rxjs: '~7.8.1',
    'core-js': '~3.6.5',
    'date-fns': '^2.16.1',
    tslib: '^2.0.0',
    'zone.js': '~0.14.2',
    'ng-zorro-antd': `^${VERSION.full}`,
    // demo needs
    d3: '^6.3.1',
    dagre: '^0.8.5',
    'dagre-compound': '^0.0.8',
    'cron-parser': '^4.6.0',
    'monaco-editor': '^0.33.0'
  };

  constructor(@Inject(DOCUMENT) document: any) {
    this.document = document;
  }

  openOnStackBlitz(componentName: string, appComponentCode: string, selector: string): void {
    sdk.openProject({
      title: 'NG-ZORRO',
      description: 'Ant Design of Angular',
      tags: ['NG-ZORRO', 'ng-zorro-antd', 'Ant Design', 'Angular', 'ng'],
      template: this.template,
      dependencies: this.dependencies,
      files: {
        'angular.json': `${JSON.stringify(angularJSON, null, 2)}`,
        'src/index.html': `<${selector}>loading</${selector}>`,
        'src/main.ts': mainTS,
        'src/app/app.component.ts': appComponentCode,
        'src/polyfills.ts': polyfillTS,
        'src/app/app.module.ts': appModuleTS(componentName),
        'src/app/ng-zorro-antd.module.ts': nzModuleTS,
        'environments/environment.ts': environmentTS,
        'src/styles.css': `/* Add application styles & imports to this file! */;`
      }
    });
  }
}
