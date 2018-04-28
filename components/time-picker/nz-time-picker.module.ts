import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimePickerPanelComponent } from './nz-time-picker-panel.component';
import { NzTimePickerComponent } from './nz-time-picker.component';
import { NzTimeValueAccessorDirective } from './nz-time-value-accessor.directive';

@NgModule({
  declarations   : [
    NzTimePickerComponent,
    NzTimePickerPanelComponent,
    NzTimeValueAccessorDirective
  ],
  exports        : [
    NzTimePickerComponent
  ],
  imports        : [ CommonModule, FormsModule, NzI18nModule, OverlayModule ],
  entryComponents: []
})
export class NzTimePickerModule {
}
