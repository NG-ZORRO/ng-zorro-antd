import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { NzPaginationComponent } from './nz-pagination.component';

@NgModule({
  declarations: [NzPaginationComponent],
  exports: [NzPaginationComponent],
  imports: [CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
})
export class NzPaginationModule {}
