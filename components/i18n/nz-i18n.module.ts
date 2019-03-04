import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoggerModule } from '../core/util/logger/logger.module';

import { NzI18nPipe } from './nz-i18n.pipe';
import { NZ_DATE_LOCALE, NZ_I18N } from './nz-i18n.token';

@NgModule({
  imports     : [ LoggerModule ],
  declarations: [ NzI18nPipe ],
  exports     : [ NzI18nPipe ],
  providers   : [
    DatePipe,
    { provide: NZ_I18N, useValue: null },
    { provide: NZ_DATE_LOCALE, useValue: null }
  ]
})
export class NzI18nModule {
}
