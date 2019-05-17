/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  const i = antDesignIcons[key];
  return i;
});

/**
 * Include this module in every testing spec, except `nz-icon.spec.ts`.
 */
// @dynamic
@NgModule({
  exports: [NzIconModule],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons
    }
  ]
})
export class NzIconTestModule {}
