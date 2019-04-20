import { Injectable } from '@angular/core';
import { merge, BehaviorSubject, Subject } from 'rxjs';

import { NzDirectionVHIType } from '../types';

@Injectable()
export class NzMenuBaseService {
  isInDropDown: boolean;
  menuItemClick$ = new Subject<any>(); // tslint:disable-line no-any
  theme$ = new Subject();
  mode$ = new BehaviorSubject<NzDirectionVHIType>('vertical');
  inlineIndent$ = new BehaviorSubject<number>(24);
  check$ = merge(this.theme$, this.mode$, this.inlineIndent$);
  theme: 'light' | 'dark' = 'light';
  mode: NzDirectionVHIType = 'vertical';
  inlineIndent = 24;
  menuOpen$ = new BehaviorSubject<boolean>(false);

  // tslint:disable-next-line no-any
  onMenuItemClick(menu: any): void {
    this.menuItemClick$.next(menu);
  }

  setMode(mode: NzDirectionVHIType): void {
    this.mode = mode;
    this.mode$.next(mode);
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.theme$.next(theme);
  }

  setInlineIndent(indent: number): void {
    this.inlineIndent = indent;
    this.inlineIndent$.next(indent);
  }
}
