/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule as ImageModule } from 'ng-zorro-antd/image';
import { NzPipesModule } from 'ng-zorro-antd/pipes';

import { NzImageViewComponent } from './image.component';

@NgModule({
  imports: [
    BidiModule,
    OverlayModule,
    PortalModule,
    DragDropModule,
    CommonModule,
    NzIconModule,
    NzPipesModule,
    PlatformModule,
    ImageModule
  ],
  exports: [NzImageViewComponent],
  declarations: [NzImageViewComponent]
})
export class NzImageModule {}
