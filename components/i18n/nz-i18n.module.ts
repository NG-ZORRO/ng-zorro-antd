import { NgModule } from '@angular/core';
import { LoggerModule } from '../core/util/logger/index';

import zh_CN from './languages/zh_CN';
import { NzI18nPipe } from './nz-i18n.pipe';
import { NZ_I18N_SERVICE_PROVIDER } from './nz-i18n.service';
import { NZ_I18N } from './nz-i18n.token';

@NgModule({
  imports     : [ LoggerModule ],
  declarations: [ NzI18nPipe ],
  exports     : [ NzI18nPipe ],
  providers   : [
    { provide: NZ_I18N, useValue: zh_CN },
    NZ_I18N_SERVICE_PROVIDER
  ]
})
export class NzI18nModule {
}
