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
  openOnStackBlitz(componentName: string, appComponentCode: string, selector: string): void {
    sdk.openProject({
      title: 'NG-ZORRO',
      description: 'Ant Design of Angular',
      template: 'node',
      files: {
        'package.json': JSON.stringify(packageJSON(`^${VERSION.full}`, `^${VERSION.major}.0.0`), null, 2),
        'angular.json':  JSON.stringify(angularJSON, null, 2),
        'tsconfig.json':  JSON.stringify(tsconfigJSON, null, 2),
        'tsconfig.app.json': JSON.stringify(tsconfigAppJSON, null, 2),
        'src/index.html': `<${selector}>loading</${selector}>`,
        'src/main.ts': mainTS(componentName),
        'src/app/app.ts': appComponentCode,
        'src/app/app.config.ts': appConfigTS,
        'src/styles.css': `/* Add application styles & imports to this file! */`
      }
    }, {
      // open demo component by default
      openFile: 'src/app/app.ts'
    });
  }
}
