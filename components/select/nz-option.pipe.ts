import { Pipe, PipeTransform } from '@angular/core';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

export type TFilterOption = (input?: string, option?: NzOptionComponent) => boolean;

@Pipe({ name: 'nzFilterOption' })
export class NzFilterOptionPipe implements PipeTransform {
  transform(options: NzOptionComponent[], searchValue: string, filterOption: TFilterOption, serverSearch: boolean): NzOptionComponent[] {
    if (serverSearch || !searchValue) {
      return options;
    } else {
      return (options as NzOptionComponent[]).filter(o => filterOption(searchValue, o));
    }
  }
}

@Pipe({ name: 'nzFilterGroupOption' })
export class NzFilterGroupOptionPipe implements PipeTransform {
  transform(groups: NzOptionGroupComponent[], searchValue: string, filterOption: TFilterOption, serverSearch: boolean): NzOptionGroupComponent[] {
    if (serverSearch || !searchValue) {
      return groups;
    } else {
      return (groups as NzOptionGroupComponent[]).filter(g => {
        return g.listOfNzOptionComponent.some(o => filterOption(searchValue, o));
      });
    }
  }
}

export function defaultFilterOption(searchValue: string, option: NzOptionComponent): boolean {
  if (option && option.nzLabel) {
    return option.nzLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
}
