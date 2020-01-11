/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconDirective } from './nz-icon.directive';
import { NZ_ICONS_PATCH, NzIconPatchService } from './nz-icon.service';

@NgModule({
  exports: [NzIconDirective],
  declarations: [NzIconDirective],
  imports: [PlatformModule]
})
export class NzIconModule {
  static patch(icons: IconDefinition[]): ModuleWithProviders<NzIconModule> {
    return {
      ngModule: NzIconModule,
      providers: [
        NzIconPatchService,
        {
          provide: NZ_ICONS_PATCH,
          useValue: icons
        }
      ]
    };
  }
}
