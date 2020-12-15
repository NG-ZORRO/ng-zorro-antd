/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion, zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';

@Component({
  selector: '[nz-submenu-none-inline-child]',
  exportAs: 'nzSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion, slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.ant-dropdown-menu]="isMenuInsideDropDown"
      [class.ant-menu]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.ant-menu-vertical]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.ant-menu-sub]="!isMenuInsideDropDown"
      [class.ant-menu-rtl]="dir === 'rtl'"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
  host: {
    '[class.ant-menu-light]': "theme === 'light'",
    '[class.ant-menu-dark]': "theme === 'dark'",
    '[class.ant-menu-submenu-placement-bottom]': "mode === 'horizontal'",
    '[class.ant-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
    '[class.ant-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
    '[class.ant-menu-submenu-rtl]': 'dir ==="rtl"',
    '[@slideMotion]': 'expandState',
    '[@zoomBigMotion]': 'expandState',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class NzSubmenuNoneInlineChildComponent implements OnDestroy, OnInit, OnChanges {
  @Input() menuClass: string = '';
  @Input() theme: NzMenuThemeType = 'light';
  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() position = 'right';
  @Input() nzDisabled = false;
  @Input() nzOpen = false;
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-menu-submenu', 'ant-menu-submenu-popup');
  }

  setMouseState(state: boolean): void {
    if (!this.nzDisabled) {
      this.subMenuMouseState.next(state);
    }
  }
  expandState = 'collapsed';
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  calcMotionState(): void {
    if (this.nzOpen) {
      if (this.mode === 'horizontal') {
        this.expandState = 'bottom';
      } else if (this.mode === 'vertical') {
        this.expandState = 'active';
      }
    } else {
      this.expandState = 'collapsed';
    }
  }
  ngOnInit(): void {
    this.calcMotionState();

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { mode, nzOpen } = changes;
    if (mode || nzOpen) {
      this.calcMotionState();
    }
  }
}
