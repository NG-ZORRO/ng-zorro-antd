/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NzPickerComponent } from './picker.component';

export function getPickerAbstract<T = HTMLElement>(debugElement: DebugElement): T {
  return debugElement.query(By.css('.ant-calendar-picker')).nativeElement;
}

export function getPickerTrigger(debugElement: DebugElement): HTMLElement {
  return debugElement.query(By.directive(NzPickerComponent)).nativeElement;
}

// Range picker doesn't has this
export function getPickerInput(debugElement: DebugElement): HTMLInputElement {
  return debugElement.query(By.css('div input.ant-calendar-picker-input')).nativeElement as HTMLInputElement;
}

export function getRangePickerLeftInput(debugElement: DebugElement): HTMLInputElement {
  return debugElement.queryAll(By.css('div input.ant-calendar-range-picker-input'))[0]
    .nativeElement as HTMLInputElement;
}

export function getRangePickerRightInput(debugElement: DebugElement): HTMLInputElement {
  return debugElement.queryAll(By.css('div input.ant-calendar-range-picker-input'))[1]
    .nativeElement as HTMLInputElement;
}
