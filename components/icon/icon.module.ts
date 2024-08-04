/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { IconDefinition } from '@ant-design/icons-angular';

import { NzIconDirective } from './icon.directive';
import { provideNzIcons, provideNzIconsPatch } from './provide-icons';

@NgModule({
  imports: [NzIconDirective],
  exports: [NzIconDirective]
})
export class NzIconModule {
  static forRoot(icons: IconDefinition[]): ModuleWithProviders<NzIconModule> {
    return {
      ngModule: NzIconModule,
      providers: [provideNzIcons(icons)]
    };
  }

  static forChild(icons: IconDefinition[]): ModuleWithProviders<NzIconModule> {
    return {
      ngModule: NzIconModule,
      providers: [provideNzIconsPatch(icons)]
    };
  }
}
