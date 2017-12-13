/* tslint:disable:no-any */
import { Pipe, PipeTransform } from '@angular/core';
import { NzOptionComponent } from './nz-option.component';

@Pipe({ name: 'nzOptionPipe' })
export class NzOptionPipe implements PipeTransform {
  // TODO: enable type checking for this method
  transform(options: NzOptionComponent[], value: any): any {
    if (value.searchText) {
      let _options = options.filter(option => option.nzLabel && (option.nzLabel.toLowerCase().indexOf(value.searchText.toLowerCase()) !== -1));
      if (value.tags) {
        _options = options.filter(option => option.nzLabel && (option.nzLabel.toLowerCase() === value.searchText.toLowerCase()));
      }
      if (_options.length) {
        return _options;
      } else {
        return [ {
          nzValue   : value.value,
          _value    : value.value,
          nzDisabled: value.disabled,
          _disabled : value.disabled,
          nzLabel   : value.notFoundContent,
          _label    : value.notFoundContent,
        } as any as NzOptionComponent
      ];
      }
    } else {
      return options;
    }
  }
}
