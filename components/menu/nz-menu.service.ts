import { Injectable } from '@angular/core';
import { merge, BehaviorSubject, Subject } from 'rxjs';
import { NzDirectionVHIType } from '../core/types/direction';
import { NzMenuItemDirective } from './nz-menu-item.directive';

@Injectable()
export class NzMenuService {
  isInDropDown: boolean;
  menuItemClick$ = new Subject<NzMenuItemDirective>();
  theme$ = new Subject();
  mode$ = new BehaviorSubject<NzDirectionVHIType>('vertical');
  inlineIndent$ = new BehaviorSubject<number>(24);
  check$ = merge(this.theme$, this.mode$, this.inlineIndent$);
  theme: 'light' | 'dark' = 'light';
  mode: NzDirectionVHIType = 'vertical';
  inlineIndent = 24;
  menuOpen$ = new BehaviorSubject<boolean>(false);

  onMenuItemClick(menu: NzMenuItemDirective): void {
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
