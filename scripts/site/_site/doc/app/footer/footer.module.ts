import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { FooterComponent } from './footer.component';
import { FooterColComponent } from './footer-col.component';
import { FooterItemComponent } from './footer-item.component';
import { ColorSketchModule } from "ngx-color/sketch";



@NgModule({
  declarations: [FooterComponent, FooterColComponent, FooterItemComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzPopoverModule,
    ColorSketchModule
  ]
})
export class FooterModule { }
