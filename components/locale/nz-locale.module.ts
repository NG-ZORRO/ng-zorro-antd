import { NgModule } from '@angular/core';
import { LoggerModule } from '../core/util/logger/index';

import { zhCN } from './locales/index';
import { NZ_LOCALE_SERVICE_PROVIDER } from './nz-locale.service';
import { NZ_LOCALE } from './nz-locale.token';
import { NzTranslatePipe } from './nz-translate.pipe';

@NgModule({
  imports: [ LoggerModule ],
  declarations: [ NzTranslatePipe ],
  exports: [ NzTranslatePipe ],
  providers: [
    { provide: NZ_LOCALE, useValue: zhCN },
    NZ_LOCALE_SERVICE_PROVIDER,
  ],
})
export class NzLocaleModule { }
