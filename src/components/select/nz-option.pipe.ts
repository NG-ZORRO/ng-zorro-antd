import { Pipe, PipeTransform } from '@angular/core';
import { NzOptionComponent } from './nz-option.component'

@Pipe({ name: 'nzOptionPipe' })
export class NzOptionPipe implements PipeTransform {
  transform(options: NzOptionComponent[], value: any) {
    if (value.searchText) {
      let _options = options.filter(option => option.nzLabel && (option.nzLabel.toLowerCase().indexOf(value.searchText.toLowerCase()) !== -1));
      if (value.tags) {
        _options = options.filter(option => option.nzLabel && (option.nzLabel.toLowerCase() === value.searchText.toLowerCase()));
      }
      if (_options.length) {
        return _options;
      } else {
        return <NzOptionComponent[]>[ {
          nzValue   : value.value,
          _value    : value.value,
          nzDisabled: value.disabled,
          _disabled : value.disabled,
          nzLabel   : value.notFoundContent,
          _label    : value.notFoundContent,
        } ]
      }
    } else {
      return options;
    }
  }
}
