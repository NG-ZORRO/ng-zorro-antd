import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from '../button/nz-button.module';
import { NzCheckboxModule } from '../checkbox/nz-checkbox.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzInputModule } from '../input/nz-input.module';

import { NzTransferListComponent } from './nz-transfer-list.component';
import { NzTransferSearchComponent } from './nz-transfer-search.component';
import { NzTransferComponent } from './nz-transfer.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, NzCheckboxModule, NzButtonModule, NzInputModule, NzI18nModule, NzIconModule ],
  declarations: [ NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent ],
  exports     : [ NzTransferComponent ]
})
export class NzTransferModule {
}
