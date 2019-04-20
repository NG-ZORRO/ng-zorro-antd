/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { NzDirectionVHIType } from 'ng-zorro-antd/core';

import { NzMenuService } from './nz-menu.service';

@Injectable()
export class NzSubmenuService {
  disabled = false;
  mode: NzDirectionVHIType = 'vertical';
  mode$ = this.nzMenuService.mode$.pipe(
    map(mode => {
      if (mode === 'inline') {
        return 'inline';
      } else if (mode === 'vertical' || this.nzHostSubmenuService) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    }),
    tap(mode => (this.mode = mode as NzDirectionVHIType))
  );
  level = 1;
  level$ = new BehaviorSubject<number>(1);
  subMenuOpen$ = new BehaviorSubject<boolean>(false);
  open$ = new BehaviorSubject<boolean>(false);
  mouseEnterLeave$ = new Subject<boolean>();
  menuOpen$ = combineLatest(this.subMenuOpen$, this.mouseEnterLeave$).pipe(
    map(value => value[0] || value[1]),
    auditTime(150),
    distinctUntilChanged(),
    tap(data => {
      this.setOpenState(data);
      if (this.nzHostSubmenuService) {
        this.nzHostSubmenuService.subMenuOpen$.next(data);
      }
    })
  );

  setOpenState(value: boolean): void {
    this.open$.next(value);
  }

  onMenuItemClick(): void {
    this.setMouseEnterState(false);
  }

  setLevel(value: number): void {
    this.level$.next(value);
    this.level = value;
  }

  setMouseEnterState(value: boolean): void {
    if ((this.mode === 'horizontal' || this.mode === 'vertical' || this.nzMenuService.isInDropDown) && !this.disabled) {
      this.mouseEnterLeave$.next(value);
    }
  }

  constructor(
    @SkipSelf() @Optional() private nzHostSubmenuService: NzSubmenuService,
    public nzMenuService: NzMenuService
  ) {
    if (this.nzHostSubmenuService) {
      this.setLevel(this.nzHostSubmenuService.level + 1);
    }
  }
}
