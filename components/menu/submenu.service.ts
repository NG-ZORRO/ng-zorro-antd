/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, combineLatest, merge } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzMenuModeType } from './menu.types';

@Injectable()
export class NzSubmenuService {
  public readonly nzMenuService = inject(MenuService);
  private readonly nzHostSubmenuService = inject(NzSubmenuService, { optional: true, skipSelf: true });

  mode$: Observable<NzMenuModeType> = this.nzMenuService.mode$.pipe(
    map(mode => {
      if (mode === 'inline') {
        return 'inline';
        /** if inside another submenu, set the mode to vertical **/
      } else if (mode === 'vertical' || this.nzHostSubmenuService) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    })
  );
  level = 1;
  isMenuInsideDropDown = inject(NzIsMenuInsideDropDownToken);
  isCurrentSubMenuOpen$ = new BehaviorSubject<boolean>(false);
  private isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);
  /** submenu title & overlay mouse enter status **/
  private isMouseEnterTitleOrOverlay$ = new Subject<boolean>();
  private childMenuItemClick$ = new Subject<NzSafeAny>();
  /**
   * menu item inside submenu clicked
   */
  onChildMenuItemClick(menu: NzSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }
  setOpenStateWithoutDebounce(value: boolean): void {
    this.isCurrentSubMenuOpen$.next(value);
  }
  setMouseEnterTitleOrOverlayState(value: boolean): void {
    this.isMouseEnterTitleOrOverlay$.next(value);
  }

  constructor() {
    if (this.nzHostSubmenuService) {
      this.level = this.nzHostSubmenuService.level + 1;
    }

    /** close if menu item clicked **/
    const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(
      mergeMap(() => this.mode$),
      filter(mode => mode !== 'inline' || this.isMenuInsideDropDown),
      map(() => false)
    );
    const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
    /** combine the child submenu status with current submenu status to calculate host submenu open **/
    const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(
      map(([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen),
      auditTime(150)
    );
    isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe(data => {
      this.setOpenStateWithoutDebounce(data);
      if (this.nzHostSubmenuService) {
        /** set parent submenu's child submenu open status **/
        this.nzHostSubmenuService.isChildSubMenuOpen$.next(data);
      } else {
        this.nzMenuService.isChildSubMenuOpen$.next(data);
      }
    });
  }
}
