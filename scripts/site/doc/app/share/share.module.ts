import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { NzCodeBoxComponent } from '../codebox/codebox.component';
import { ComponentMetaComponent } from '../component-meta/component-meta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentMetaComponent,
    NzCodeBoxComponent,
    NzTooltipModule,
    NzAnchorModule,
    NzAffixModule,
    NzGridModule,
    NzIconModule,
    NzSpaceModule,
    // third libs
    DragDropModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzCodeBoxComponent,
    ComponentMetaComponent,
    NzAnchorModule,
    NzAffixModule,
    NzGridModule,
    NzTooltipModule,
    NzIconModule,
    NzSpaceModule,
    // third libs
    ScrollingModule,
    DragDropModule
  ]
})
export class ShareModule {}
