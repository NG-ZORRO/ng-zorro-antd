/* tslint:disable:no-any */
import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

export type TFilterOption = (input?: string, option?: NzOptionComponent) => boolean;

// TODO: can not dynamic change pipe pure yet
@Pipe({ name: 'nzFilterOptionPipe' })
export class NzOptionPipe implements PipeTransform {
  transform(options: NzOptionComponent[] | QueryList<NzOptionComponent>, input: string, filterOption: TFilterOption, serverSearch: boolean): NzOptionComponent[] | QueryList<NzOptionComponent> {
    if (serverSearch || !input) {
      return options;
    } else {
      return (options as NzOptionComponent[]).filter(o => filterOption(input, o));
    }
  }
}

@Pipe({ name: 'nzSubFilterOptionPipe' })
export class NzSubOptionPipe implements PipeTransform {
  transform(groups: NzOptionGroupComponent[] | QueryList<NzOptionGroupComponent>, input: string, filterOption: TFilterOption, serverSearch: boolean): NzOptionGroupComponent[] | QueryList<NzOptionGroupComponent> {
    if (serverSearch || !input) {
      return groups;
    } else {
      return (groups as NzOptionGroupComponent[]).filter(g => {
        return g.listOfNzOptionComponent.some(o => filterOption(input, o));
      });
    }
  }
}

export function defaultFilterOption(input: string, option: NzOptionComponent): boolean {
  if (option && option.nzLabel) {
    return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  } else {
    return false;
  }
}
