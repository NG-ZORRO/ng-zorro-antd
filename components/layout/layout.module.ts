/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzContentComponent } from './content.component';
import { NzFooterComponent } from './footer.component';
import { NzHeaderComponent } from './header.component';
import { NzLayoutComponent } from './layout.component';
import { NzSiderTriggerComponent } from './sider-trigger.component';
import { NzSiderComponent } from './sider.component';

@NgModule({
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    NzSiderComponent,
    NzSiderTriggerComponent
  ],
  exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent]
})
export class NzLayoutModule {}
