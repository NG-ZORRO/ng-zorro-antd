/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { SCROLL_SERVICE_PROVIDER } from 'ng-zorro-antd/core';

import { NzAnchorLinkComponent } from './nz-anchor-link.component';
import { NzAnchorComponent } from './nz-anchor.component';

@NgModule({
  declarations: [NzAnchorComponent, NzAnchorLinkComponent],
  exports: [NzAnchorComponent, NzAnchorLinkComponent],
  imports: [CommonModule, NzAffixModule, PlatformModule],
  providers: [SCROLL_SERVICE_PROVIDER]
})
export class NzAnchorModule {}
