import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzHighlightModule } from '../highlight/highlight.module';
import { NzCodeBoxComponent } from './codebox.component';

@NgModule({
  imports: [CommonModule, NzHighlightModule, NzIconModule, NzToolTipModule],
  declarations: [NzCodeBoxComponent],
  exports: [NzCodeBoxComponent]
})
export class NzCodeBoxModule {}
