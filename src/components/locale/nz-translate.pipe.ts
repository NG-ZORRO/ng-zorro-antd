import { Pipe, PipeTransform } from '@angular/core';
import { NzLocaleService } from './nz-locale.service';

@Pipe({
  name: 'nzTranslate'
})
export class NzTranslatePipe implements PipeTransform {
  constructor(private _locale: NzLocaleService) {}

  transform(path: string, keyValue?: Object): any {
    return this._locale.translate(path, keyValue);
  }
}
