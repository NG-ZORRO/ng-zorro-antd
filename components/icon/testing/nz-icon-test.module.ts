/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EnvironmentProviders, NgModule } from '@angular/core';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NZ_ICONS, NzIconModule, provideNzIcons } from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as Record<string, IconDefinition>;

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  const i = antDesignIcons[key];
  return i;
});

/**
 * @internal
 * @deprecated Internal use only, do not use directly. Will be removed in v20
 * Include this module in every testing spec, except `icon.spec.ts`.
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

export const provideNzIconsTesting = (): EnvironmentProviders => provideNzIcons(icons);
