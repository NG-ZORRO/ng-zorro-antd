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
import { QuicklinkModule } from 'ngx-quicklink';
import { NzCodeBoxModule } from './codebox/codebox.module';
import { NzGithubBtnModule } from './github-btn/github-btn.module';
import { NzHighlightModule } from './highlight/highlight.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NzCodeBoxModule,
    NzHighlightModule,
    NzGithubBtnModule,
    NzToolTipModule,
    NzAnchorModule,
    NzAffixModule,
    NzGridModule,
    // third libs
    DragDropModule,
    QuicklinkModule
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
    NzGithubBtnModule,
    NzGridModule,
    NzToolTipModule,
    // third libs
    ScrollingModule,
    DragDropModule,
    QuicklinkModule
  ]
})
export class ShareModule {
}
