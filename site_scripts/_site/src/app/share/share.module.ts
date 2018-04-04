import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgZorroAntdModule
} from 'ng-zorro-antd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ColorSketchModule } from 'ngx-color/sketch';

import { NzCodeBoxModule } from './nz-codebox/nz-codebox.module';
import { NzHighlightModule } from './nz-highlight/nz-highlight.module';
import { NzNavBottomModule } from './nz-nav-bottom/nz-nav-bottom.module';
import { NzCopyIconModule } from './nz-copy-icon/nz-copy-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzNavBottomModule,
    NzCopyIconModule,
    // third libs
    InfiniteScrollModule,
    ColorSketchModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzNavBottomModule,
    NzCopyIconModule,
    // third libs
    InfiniteScrollModule,
    ColorSketchModule,
  ]
})
export class ShareModule { }
