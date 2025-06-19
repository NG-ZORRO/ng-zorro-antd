/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzBreakpointKey, NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { inNextTick, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';

import { NzSiderTriggerComponent } from './sider-trigger.component';

@Component({
  selector: 'nz-sider',
  exportAs: 'nzSider',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    @if (nzCollapsible && nzTrigger !== null) {
      <div
        nz-sider-trigger
        [matchBreakPoint]="matchBreakPoint"
        [nzCollapsedWidth]="nzCollapsedWidth"
        [nzCollapsed]="nzCollapsed"
        [nzBreakpoint]="nzBreakpoint"
        [nzReverseArrow]="nzReverseArrow"
        [nzTrigger]="nzTrigger"
        [nzZeroTrigger]="nzZeroTrigger"
        [siderWidth]="widthSetting"
        (click)="setCollapsed(!nzCollapsed)"
      ></div>
    }
  `,
  host: {
    class: 'ant-layout-sider',
    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
    '[class.ant-layout-sider-has-trigger]': `nzCollapsible && nzTrigger !== null`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  },
  imports: [NzSiderTriggerComponent]
})
export class NzSiderComponent implements OnInit, OnChanges, AfterContentInit {
  private destroyRef = inject(DestroyRef);
  private platform = inject(Platform);
  private cdr = inject(ChangeDetectorRef);
  private breakpointService = inject(NzBreakpointService);

  @ContentChild(NzMenuDirective) nzMenuDirective: NzMenuDirective | null = null;
  @Output() readonly nzCollapsedChange = new EventEmitter();
  @Input() nzWidth: string | number = 200;
  @Input() nzTheme: 'light' | 'dark' = 'dark';
  @Input() nzCollapsedWidth = 80;
  @Input() nzBreakpoint: NzBreakpointKey | null = null;
  @Input() nzZeroTrigger: TemplateRef<void> | null = null;
  @Input() nzTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input({ transform: booleanAttribute }) nzReverseArrow = false;
  @Input({ transform: booleanAttribute }) nzCollapsible = false;
  @Input({ transform: booleanAttribute }) nzCollapsed = false;
  matchBreakPoint = false;
  flexSetting: string | null = null;
  widthSetting: string | null = null;

  updateStyleMap(): void {
    this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
    this.flexSetting = `0 0 ${this.widthSetting}`;
    this.cdr.markForCheck();
  }

  updateMenuInlineCollapsed(): void {
    if (this.nzMenuDirective && this.nzMenuDirective.nzMode === 'inline' && this.nzCollapsedWidth !== 0) {
      this.nzMenuDirective.setInlineCollapsed(this.nzCollapsed);
    }
  }

  setCollapsed(collapsed: boolean): void {
    if (collapsed !== this.nzCollapsed) {
      this.nzCollapsed = collapsed;
      this.nzCollapsedChange.emit(collapsed);
      this.updateMenuInlineCollapsed();
      this.updateStyleMap();
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {
    this.updateStyleMap();

    if (this.platform.isBrowser) {
      this.breakpointService
        .subscribe(siderResponsiveMap, true)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(map => {
          const breakpoint = this.nzBreakpoint;
          if (breakpoint) {
            inNextTick().subscribe(() => {
              this.matchBreakPoint = !map[breakpoint];
              this.setCollapsed(this.matchBreakPoint);
              this.cdr.markForCheck();
            });
          }
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzCollapsed, nzCollapsedWidth, nzWidth } = changes;
    if (nzCollapsed || nzCollapsedWidth || nzWidth) {
      this.updateStyleMap();
    }
    if (nzCollapsed) {
      this.updateMenuInlineCollapsed();
    }
  }

  ngAfterContentInit(): void {
    this.updateMenuInlineCollapsed();
  }
}
