/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzContentComponent } from './content.component';
import { NzFooterComponent } from './footer.component';
import { NzHeaderComponent } from './header.component';
import { NzLayoutComponent } from './layout.component';
import { NzSiderTriggerComponent } from './sider-trigger.component';
import { NzSiderComponent } from './sider.component';

@NgModule({
  declarations: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent, NzSiderTriggerComponent],
  exports: [NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent],
  imports: [CommonModule, NzIconModule, LayoutModule, PlatformModule]
})
export class NzLayoutModule {}
