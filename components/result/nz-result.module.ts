import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAddOnModule } from '../core/addon/addon.module';
import { NzIconModule } from '../icon/nz-icon.module';

import {
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
} from './nz-result-cells';
import { NzResultComponent } from './nz-result.component';

const cellDirectives = [
  NzResultContentDirective,
  NzResultExtraDirective,
  NzResultIconDirective,
  NzResultSubtitleDirective,
  NzResultTitleDirective
];

@NgModule({
  imports     : [ CommonModule, NzAddOnModule, NzIconModule ],
  declarations: [ NzResultComponent, ...cellDirectives ],
  exports     : [ NzResultComponent, ...cellDirectives ]
})
export class NzResultModule {
}
