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
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

import {
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
  NzPageHeaderBreadcrumbDirective
];

@NgModule({
  imports: [CommonModule, NzAddOnModule, NzIconModule, NzDividerModule],
  exports: [NzPageHeaderComponent, ...NzPageHeaderCells],
  declarations: [NzPageHeaderComponent, ...NzPageHeaderCells]
})
export class NzPageHeaderModule {}
