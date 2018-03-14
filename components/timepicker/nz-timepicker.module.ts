import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimepickerPanelComponent } from './nz-timepicker-panel.component';
import { NzTimepickerComponent } from './nz-timepicker.component';

@NgModule({
  declarations: [
    NzTimepickerComponent,
    NzTimepickerPanelComponent
  ],
  exports     : [
    NzTimepickerComponent
  ],
  imports     : [ CommonModule, FormsModule, NzI18nModule, OverlayModule ],
  entryComponents: [  ]
})
export class NzTimepickerModule { }
