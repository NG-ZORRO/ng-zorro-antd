/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenuModeType, NzMenuThemeType } from './menu.types';

@Injectable()
export class MenuService {
  /** all descendant menu click **/
  descendantMenuItemClick$ = new Subject<NzSafeAny>();
  /** child menu item click **/
  childMenuItemClick$ = new Subject<NzSafeAny>();
  theme$ = new BehaviorSubject<NzMenuThemeType>('light');
  mode$ = new BehaviorSubject<NzMenuModeType>('vertical');
  inlineIndent$ = new BehaviorSubject<number>(24);
  isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  onDescendantMenuItemClick(menu: NzSafeAny): void {
    this.descendantMenuItemClick$.next(menu);
  }

  onChildMenuItemClick(menu: NzSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  setMode(mode: NzMenuModeType): void {
    this.mode$.next(mode);
  }

  setTheme(theme: NzMenuThemeType): void {
    this.theme$.next(theme);
  }

  setInlineIndent(indent: number): void {
    this.inlineIndent$.next(indent);
  }
}
