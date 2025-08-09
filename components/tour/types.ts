/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ElementRef } from '@angular/core';

export interface NzTourStep {
  title: string;
  description: string;
  target?: HTMLElement | ElementRef<HTMLElement> | null | (() => HTMLElement | ElementRef<HTMLElement> | null);
  cover?: string;
}
