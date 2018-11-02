import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
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
    NzTimePickerPanelComponent,
    NzTimePickerComponent
  ],
  imports        : [ CommonModule, FormsModule, NzI18nModule, OverlayModule, NzIconModule ],
  entryComponents: []
})
export class NzTimePickerModule {
}
