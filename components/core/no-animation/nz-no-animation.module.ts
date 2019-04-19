import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNoAnimationDirective } from './nz-no-animation.directive';

@NgModule({
  declarations: [NzNoAnimationDirective],
  exports: [NzNoAnimationDirective],
  imports: [CommonModule]
})
export class NzNoAnimationModule {}
