import { NgModule } from '@angular/core';
import { NzTimePickerComponent } from './nz-timepicker.component';
import { NzTimePickerInnerComponent } from './nz-timepicker-inner.component';
import { CommonModule } from '@angular/common';
import { NzUtilModule } from '../util/nz-util.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzLocaleModule } from '../locale/index';

@NgModule({
  imports     : [ CommonModule, NzUtilModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzTimePickerComponent, NzTimePickerInnerComponent ],
  exports     : [ NzTimePickerComponent, NzTimePickerInnerComponent ]
})

export class NzTimePickerModule {
}
