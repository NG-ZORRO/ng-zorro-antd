import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzButtonModule } from '../button/nz-button.module';
import { NzInputModule } from '../input/nz-input.module';
import { NzCheckboxModule } from '../checkbox/nz-checkbox.module';

import { NzTransferComponent } from './nz-transfer.component';
import { NzTransferListComponent } from './nz-transfer-list.component';
import { NzTransferSearchComponent } from './nz-transfer-search.component';

@NgModule({
  imports:      [CommonModule, FormsModule, NzCheckboxModule, NzButtonModule, NzInputModule, NzLocaleModule],
  declarations: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
  exports:      [NzTransferComponent]
})
export class NzTransferModule { }
