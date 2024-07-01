import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { FooterColComponent } from './footer-col.component';
import { FooterItemComponent } from './footer-item.component';
import { FooterComponent } from './footer.component';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';

@NgModule({
  declarations: [FooterComponent, FooterColComponent, FooterItemComponent],
  exports: [FooterComponent],
  imports: [CommonModule, NzIconModule, NzPopoverModule, NzColorPickerComponent]
})
export class FooterModule {}
