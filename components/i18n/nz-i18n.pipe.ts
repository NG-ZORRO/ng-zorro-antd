import { Pipe, PipeTransform } from '@angular/core';

import { NzI18nService } from './nz-i18n.service';

@Pipe({
  name: 'nzI18n'
})
export class NzI18nPipe implements PipeTransform {
  constructor(private _locale: NzI18nService) {
  }

  transform(path: string, keyValue?: object): string {
    return this._locale.translate(path, keyValue);
  }
}
