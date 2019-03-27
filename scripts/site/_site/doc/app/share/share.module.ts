import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NzCodeBoxModule } from './nz-codebox/nz-codebox.module';
import { NzHighlightModule } from './nz-highlight/nz-highlight.module';
import { NzNavBottomModule } from './nz-nav-bottom/nz-nav-bottom.module';

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
    // third libs
    ColorSketchModule,
    DragDropModule
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
    // third libs
    ScrollingModule,
    ColorSketchModule,
    DragDropModule
  ]
})
export class ShareModule {}
