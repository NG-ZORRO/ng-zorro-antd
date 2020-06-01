/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconDirective } from './icon.directive';
import { NZ_ICONS, NZ_ICONS_PATCH, NzIconPatchService } from './icon.service';

@NgModule({
  exports: [NzIconDirective],
  declarations: [NzIconDirective],
  imports: [PlatformModule]
})
export class NzIconModule {
  static forRoot(icons: IconDefinition[]): ModuleWithProviders<NzIconModule> {
    return {
      ngModule: NzIconModule,
      providers: [
        {
          provide: NZ_ICONS,
          useValue: icons
        }
      ]
    };
  }

  static forChild(icons: IconDefinition[]): ModuleWithProviders<NzIconModule> {
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
