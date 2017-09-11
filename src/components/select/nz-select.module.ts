import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '../core/overlay/index';
import { NzSelectComponent } from './nz-select.component';
import { NzOptionComponent } from './nz-option.component';
import { NzOptionPipe } from './nz-option.pipe';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule ],
  declarations: [ NzOptionPipe, NzOptionComponent, NzSelectComponent ],
  exports     : [ NzOptionPipe, NzOptionComponent, NzSelectComponent ]
})

export class NzSelectModule {
}


