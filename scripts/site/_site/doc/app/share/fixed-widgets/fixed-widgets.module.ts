import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { FixedWidgetsComponent } from './fixed-widgets.component';
import { DarkIcon, DefaultIcon } from './theme-icons'

@NgModule({
  declarations: [
    FixedWidgetsComponent,
    DefaultIcon,
    DarkIcon
  ],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzToolTipModule
  ],
  exports: [FixedWidgetsComponent]
})
export class FixedWidgetsModule { }
