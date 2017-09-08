import { NgModule } from '@angular/core';
import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from '../button/nz-button.module';
import { OverlayModule } from '../core/overlay/index';


@NgModule({
  declarations: [ NzPopconfirmComponent, NzPopconfirmDirective ],
  exports     : [ NzPopconfirmComponent, NzPopconfirmDirective ],
  imports     : [ CommonModule, NzButtonModule, OverlayModule ]
})

export class NzPopconfirmModule {
}
