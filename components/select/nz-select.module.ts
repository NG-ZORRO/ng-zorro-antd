import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzOptionComponent } from './nz-option.component';
import { NzOptionPipe } from './nz-option.pipe';
import { NzSelectComponent } from './nz-select.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzOptionPipe, NzOptionComponent, NzSelectComponent ],
  exports     : [ NzOptionPipe, NzOptionComponent, NzSelectComponent ]
})
export class NzSelectModule {
}
