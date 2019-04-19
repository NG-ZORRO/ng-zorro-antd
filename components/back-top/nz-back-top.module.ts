import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SCROLL_SERVICE_PROVIDER } from 'ng-zorro-antd/core';

import { NzBackTopComponent } from './nz-back-top.component';

@NgModule({
  declarations: [NzBackTopComponent],
  exports: [NzBackTopComponent],
  imports: [CommonModule],
  providers: [SCROLL_SERVICE_PROVIDER]
})
export class NzBackTopModule {}
