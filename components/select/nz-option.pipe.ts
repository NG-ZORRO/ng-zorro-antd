/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';

export type TFilterOption = (input: string, option: NzOptionComponent) => boolean;

@Pipe({ name: 'nzFilterOption' })
export class NzFilterOptionPipe implements PipeTransform {
  transform(
    options: NzOptionComponent[],
    searchValue: string,
    filterOption: TFilterOption,
    serverSearch: boolean,
    isHideSelectedOptions: boolean, // tslint:disable-next-line:no-any
    listOfSelectedValue: any[], // tslint:disable-next-line:no-any
    compareWith: (o1: any, o2: any) => boolean
  ): NzOptionComponent[] {
    if (isHideSelectedOptions && listOfSelectedValue.length > 0) {
      // tslint:disable-next-line:no-parameter-reassignment
      options = options.filter(o => !listOfSelectedValue.some(v => compareWith(v, o.nzValue)));
    }
    if (serverSearch || !searchValue) {
      return options;
    } else {
      return options.filter(o => filterOption(searchValue, o));
    }
  }
}

@Pipe({ name: 'nzFilterGroupOption' })
export class NzFilterGroupOptionPipe implements PipeTransform {
  transform(
    groups: NzOptionGroupComponent[],
    searchValue: string,
    filterOption: TFilterOption,
    serverSearch: boolean,
    isHideSelectedOptions: boolean, // tslint:disable-next-line:no-any
    listOfSelectedValue: any[], // tslint:disable-next-line:no-any
    compareWith: (o1: any, o2: any) => boolean
  ): NzOptionGroupComponent[] {
    if (isHideSelectedOptions && listOfSelectedValue.length > 0) {
      // tslint:disable-next-line:no-parameter-reassignment
      groups = groups.filter(g => {
        return g.listOfNzOptionComponent.filter(o => !listOfSelectedValue.some(v => compareWith(v, o.nzValue))).length;
      });
    }
    if (serverSearch || !searchValue) {
      return groups;
    } else {
      return groups.filter(g => {
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
