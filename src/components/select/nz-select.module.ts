import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzSelectComponent } from './nz-select.component';
import { NzOptionComponent } from './nz-option.component';
import { NzOptionPipe } from './nz-option.pipe';
import { NzLocaleModule } from '../locale/index';

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzLocaleModule ],
  declarations: [ NzOptionPipe, NzOptionComponent, NzSelectComponent ],
  exports     : [ NzOptionPipe, NzOptionComponent, NzSelectComponent ]
})

export class NzSelectModule {
}


