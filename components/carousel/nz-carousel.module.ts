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

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselComponent } from './nz-carousel.component';

@NgModule({
  declarations: [NzCarouselComponent, NzCarouselContentDirective],
  exports: [NzCarouselComponent, NzCarouselContentDirective],
  imports: [CommonModule, PlatformModule]
})
export class NzCarouselModule {}
