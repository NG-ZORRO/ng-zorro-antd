/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import {
  NzPageHeaderAvatarDirective,
  NzPageHeaderBreadcrumbDirective,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderFooterDirective,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTagDirective,
  NzPageHeaderTitleDirective
} from './page-header-cells';
import { NzPageHeaderComponent } from './page-header.component';

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
  imports: [NzPageHeaderComponent, NzPageHeaderCells],
  exports: [NzPageHeaderComponent, NzPageHeaderCells]
})
export class NzPageHeaderModule {}
