/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PREFIX_CLASS } from '../util';

export const ENTER_EVENT = new KeyboardEvent('keyup', { key: 'Enter' });

export function getPickerAbstract<T = HTMLElement>(debugElement: DebugElement): T {
  return debugElement.query(By.css(`.${PREFIX_CLASS}`)).nativeElement;
}

export function getPickerInput(debugElement: DebugElement): HTMLInputElement {
  return debugElement.query(By.css(`.${PREFIX_CLASS}-input input`)).nativeElement as HTMLInputElement;
}

export function getRangePickerRightInput(debugElement: DebugElement): HTMLInputElement {
  return debugElement.queryAll(By.css(`.${PREFIX_CLASS}-input input`))[1].nativeElement as HTMLInputElement;
}

export function getPickerOkButton(debugElement: DebugElement): HTMLElement {
  return debugElement.query(By.css(`.${PREFIX_CLASS}-ok`)).nativeElement.querySelector('button') as HTMLElement;
}
