/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { slideMotion, zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenuModeType, NzMenuThemeType, NzSubmenuTrigger } from './menu.types';

@Component({
  selector: '[nz-submenu-none-inline-child]',
  exportAs: 'nzSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion, slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.ant-dropdown-menu]="isMenuInsideDropdown"
      [class.ant-menu]="!isMenuInsideDropdown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropdown"
      [class.ant-menu-vertical]="!isMenuInsideDropdown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropdown"
      [class.ant-menu-sub]="!isMenuInsideDropdown"
      [class.ant-menu-rtl]="dir === 'rtl'"
      [class]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
  host: {
    class: 'ant-menu-submenu ant-menu-submenu-popup',
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
  },
  imports: [NgTemplateOutlet]
})
export class NzSubmenuNoneInlineChildComponent implements OnInit, OnChanges {
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  @Input() menuClass: string = '';
  @Input() theme: NzMenuThemeType = 'light';
  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() isMenuInsideDropdown = false;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @Input() position = 'right';
  @Input() nzDisabled = false;
  @Input() nzOpen = false;
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  expandState = 'collapsed';
  dir: Direction = 'ltr';

  setMouseState(state: boolean): void {
    if (!this.nzDisabled && this.nzTriggerSubMenuAction === 'hover') {
      this.subMenuMouseState.next(state);
    }
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
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
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
