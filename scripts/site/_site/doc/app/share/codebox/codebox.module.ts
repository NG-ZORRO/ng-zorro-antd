import { NgModule } from '@angular/core';
import { NzCodeBoxComponent } from './codebox.component';
import { CommonModule } from '@angular/common';
import { NzHighlightModule } from '../highlight/highlight.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  imports: [CommonModule, NzHighlightModule, NzIconModule, NzToolTipModule],
  declarations: [NzCodeBoxComponent],
  exports: [NzCodeBoxComponent]
})
export class NzCodeBoxModule {}
