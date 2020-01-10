/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
  NzPageHeaderAvatarDirective,
  NzPageHeaderBreadcrumbDirective,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderFooterDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTagDirective,
  NzPageHeaderTitleDirective
} from './nz-page-header-cells';
import { NzPageHeaderComponent } from './nz-page-header.component';

const NzPageHeaderCells = [
  NzPageHeaderTitleDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderContentDirective,
  NzPageHeaderTagDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderFooterDirective,
  NzPageHeaderBreadcrumbDirective,
  NzPageHeaderAvatarDirective
];

@NgModule({
  imports: [CommonModule, NzAddOnModule, NzIconModule],
  exports: [NzPageHeaderComponent, NzPageHeaderCells],
  declarations: [NzPageHeaderComponent, NzPageHeaderCells]
})
export class NzPageHeaderModule {}
