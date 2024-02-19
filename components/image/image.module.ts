/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzImageGroupComponent } from './image-group.component';
import { NzImagePreviewComponent } from './image-preview.component';
import { NzImageDirective } from './image.directive';
import { NzImageService } from './image.service';

@NgModule({
  imports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
  exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
  providers: [NzImageService]
})
export class NzImageModule {}
