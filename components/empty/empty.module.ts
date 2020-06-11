/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzI18nModule } from 'ng-zorro-antd/i18n';

import { NzEmbedEmptyComponent } from './embed-empty.component';
import { NzEmptyComponent } from './empty.component';
import { NzEmptyDefaultComponent } from './partial/default';
import { NzEmptySimpleComponent } from './partial/simple';

@NgModule({
  imports: [CommonModule, PortalModule, NzOutletModule, NzI18nModule],
  declarations: [NzEmptyComponent, NzEmbedEmptyComponent, NzEmptyDefaultComponent, NzEmptySimpleComponent],
  exports: [NzEmptyComponent, NzEmbedEmptyComponent]
})
export class NzEmptyModule {}
