import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoggerModule } from 'ng-zorro-antd/core';

import { NzI18nPipe } from './nz-i18n.pipe';

@NgModule({
  imports: [LoggerModule],
  declarations: [NzI18nPipe],
  exports: [NzI18nPipe],
  providers: [DatePipe]
})
export class NzI18nModule {}
