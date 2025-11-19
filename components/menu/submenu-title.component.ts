/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMenuModeType, NzSubmenuTrigger } from './menu.types';

@Component({
  selector: '[nz-submenu-title]',
  exportAs: 'nzSubmenuTitle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nzIcon) {
      <nz-icon [nzType]="nzIcon" />
    }
    <ng-container *nzStringTemplateOutlet="nzTitle">
      <span class="ant-menu-title-content">{{ nzTitle }}</span>
    </ng-container>
    <ng-content />
    @if (isMenuInsideDropdown) {
      <span class="ant-dropdown-menu-submenu-expand-icon">
        @switch (dir) {
          @case ('rtl') {
            <nz-icon nzType="left" class="ant-dropdown-menu-submenu-arrow-icon" />
          }
          @default {
            <nz-icon nzType="right" class="ant-dropdown-menu-submenu-arrow-icon" />
          }
        }
      </span>
    } @else {
      <span class="ant-menu-submenu-arrow"></span>
    }
  `,
  host: {
    '[class.ant-dropdown-menu-submenu-title]': 'isMenuInsideDropdown',
    '[class.ant-menu-submenu-title]': '!isMenuInsideDropdown',
    '[style.paddingLeft.px]': `dir === 'rtl' ? null : paddingLeft `,
    '[style.paddingRight.px]': `dir === 'rtl' ? paddingLeft : null`,
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzSubMenuTitleComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly directionality = inject(Directionality);

  @Input() nzIcon: string | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() isMenuInsideDropdown = false;
  @Input() nzDisabled = false;
  @Input() paddingLeft: number | null = null;
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @Output() readonly toggleSubMenu = new EventEmitter();
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  setMouseState(state: boolean): void {
    if (!this.nzDisabled && this.nzTriggerSubMenuAction === 'hover') {
      this.subMenuMouseState.next(state);
    }
  }

  clickTitle(): void {
    if ((this.mode === 'inline' || this.nzTriggerSubMenuAction === 'click') && !this.nzDisabled) {
      this.subMenuMouseState.next(true);
      this.toggleSubMenu.emit();
    }
  }
}
