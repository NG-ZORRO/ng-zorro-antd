/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[nz-follow-scroll]'
})
export class NzFollowScrollDirective {
  scroll$ = new Subject<void>();

  @HostListener('scroll')
  onScroll(): void {
    this.scroll$.next();
  }
}
