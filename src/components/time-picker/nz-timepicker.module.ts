import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLocaleModule } from '../locale/index';
import { NzUtilModule } from '../util/nz-util.module';
import { NzTimePickerInnerComponent } from './nz-timepicker-inner.component';
import { NzTimePickerComponent } from './nz-timepicker.component';

@NgModule({
  imports     : [ CommonModule, NzUtilModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzTimePickerComponent, NzTimePickerInnerComponent ],
  exports     : [ NzTimePickerComponent, NzTimePickerInnerComponent ]
})
export class NzTimePickerModule {
}
