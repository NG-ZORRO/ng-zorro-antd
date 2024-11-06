import { Injectable } from '@angular/core';

import sdk from '@stackblitz/sdk';
import { VERSION } from 'ng-zorro-antd/version';

import angularJSON from './files/angular.json';
import appConfigTS from './files/app.config';
import mainTS from './files/main';
import packageJSON from './files/package.json';
import tsconfigJSON from './files/tsconfig.json';
import tsconfigAppJSON  from './files/tsconfig.app.json';

@Injectable({
  providedIn: 'root'
})
export class OnlineIdeService {
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

  openOnStackBlitz(componentName: string, appComponentCode: string, selector: string): void {
    sdk.openProject({
      title: 'NG-ZORRO',
      description: 'Ant Design of Angular',
      template: 'node',
      files: {
        'package.json': packageJSON(VERSION.full, '^18.0.0'),
        'angular.json': `${JSON.stringify(angularJSON, null, 2)}`,
        'tsconfig.json': `${JSON.stringify(tsconfigJSON, null, 2)}`,
        'tsconfig.app.json': `${JSON.stringify(tsconfigAppJSON, null, 2)}`,
        'src/index.html': `<${selector}>loading</${selector}>`,
        'src/main.ts': mainTS(componentName),
        'src/app/app.component.ts': appComponentCode,
        'src/app/app.config.ts': appConfigTS,
        'src/styles.css': `/* Add application styles & imports to this file! */`
      }
    });
  }
}
