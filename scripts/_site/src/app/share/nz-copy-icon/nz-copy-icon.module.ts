import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCopyIconDirective } from './nz-copy-icon.directive';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzCopyIconDirective ],
  exports     : [ NzCopyIconDirective ]
})
export class NzCopyIconModule {

}
