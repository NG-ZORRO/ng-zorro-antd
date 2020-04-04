import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ColorSketchModule } from "ngx-color/sketch";
import { FooterColComponent } from './footer-col.component';
import { FooterItemComponent } from './footer-item.component';
import { FooterComponent } from './footer.component';

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
