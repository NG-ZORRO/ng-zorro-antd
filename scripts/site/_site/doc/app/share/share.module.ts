import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NzCodeBoxModule } from './nz-codebox/nz-codebox.module';
import { NzGithubBtnModule } from './nz-github-btn/nz-github-btn.module';
import { NzHighlightModule } from './nz-highlight/nz-highlight.module';
import { NzNavBottomModule } from './nz-nav-bottom/nz-nav-bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzNavBottomModule,
    NzGithubBtnModule,
    NzToolTipModule,
    NzAnchorModule,
    NzAffixModule,
    NzGridModule,
    // third libs
    ColorSketchModule,
    DragDropModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzAnchorModule,
    NzAffixModule,
    NzNavBottomModule,
    NzGithubBtnModule,
    NzGridModule,
    NzToolTipModule,
    // third libs
    ScrollingModule,
    ColorSketchModule,
    DragDropModule
  ]
})
export class ShareModule {
}
