/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { chain, Rule } from '@angular-devkit/schematics';
import { buildComponent } from '@angular/cdk/schematics';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return chain([
    buildComponent(
      { ...options },
      {
        template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html',
        stylesheet: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__styleext__'
      }
    )
  ]);
}
