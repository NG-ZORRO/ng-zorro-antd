/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { CandyDate, CompatibleValue } from 'ng-zorro-antd/core';
import { ReplaySubject, Subject } from 'rxjs';
import { RangePartType } from './standard-types';

@Injectable()
export class DatePickerService {
  initialValue: CompatibleValue;
  value: CompatibleValue;
  activeDate: CompatibleValue;
  activeInput: RangePartType = 'left';
  arrowPositionStyle = {};

  valueChange$ = new ReplaySubject<CompatibleValue>(1);
  emitValue$ = new Subject<void>();
  inputPartChange$ = new Subject<RangePartType>();

  initValue(isRange: boolean = false): void {
    this.value = this.initialValue = isRange ? [] : null;
  }

  setValue(value: CompatibleValue): void {
    this.value = value;
    this.activeDate = value;
    this.valueChange$.next(this.value);
  }

  getActiveIndex(part: RangePartType = this.activeInput): number {
    return { left: 0, right: 1 }[part];
  }

  hasOnePart(): boolean {
    if (Array.isArray(this.value)) {
      const [left, right] = this.value as CandyDate[]; // NOTE: the left/right maybe not the sequence it select at the date panels
      return (!left && !!right) || (!!left && !right);
    }
    return false;
  }
}
