import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from '../button/nz-button.module';
import { NzLocaleModule } from '../locale/index';
import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';

@NgModule({
  declarations: [ NzPopconfirmComponent, NzPopconfirmDirective ],
  exports     : [ NzPopconfirmComponent, NzPopconfirmDirective ],
  imports     : [ CommonModule, NzButtonModule, OverlayModule, NzLocaleModule ]
})

export class NzPopconfirmModule {
}
