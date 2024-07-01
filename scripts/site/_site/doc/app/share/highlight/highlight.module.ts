import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightComponent } from './highlight.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NzHighlightComponent],
  exports: [NzHighlightComponent]
})
export class NzHighlightModule {}
