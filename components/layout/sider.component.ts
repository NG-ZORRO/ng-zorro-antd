/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzBreakpointKey, siderResponsiveMap } from 'ng-zorro-antd/core/responsive';
import { NzDomEventService } from 'ng-zorro-antd/core/services';

import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { merge, of, Subject } from 'rxjs';
import { delay, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-sider',
  exportAs: 'nzSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="nzCollapsible && nzTrigger !== null"
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
  `,
  host: {
    '[class.ant-layout-sider]': 'true',
    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
})
export class NzSiderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterContentInit {
  private destroy$ = new Subject();
  @ContentChild(NzMenuDirective) nzMenuDirective: NzMenuDirective | null = null;
  @Output() readonly nzCollapsedChange = new EventEmitter();
  @Input() nzWidth: string | number = 200;
  @Input() nzTheme: 'light' | 'dark' = 'dark';
  @Input() nzCollapsedWidth = 80;
  @Input() nzBreakpoint: NzBreakpointKey | null = null;
  @Input() nzZeroTrigger: TemplateRef<void> | null = null;
  @Input() nzTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() @InputBoolean() nzReverseArrow = false;
  @Input() @InputBoolean() nzCollapsible = false;
  @Input() @InputBoolean() nzCollapsed = false;
  matchBreakPoint = false;
  flexSetting: string | null = null;
  widthSetting: string | null = null;

  updateStyleMap(): void {
    this.widthSetting = this.nzCollapsed ? `${this.nzCollapsedWidth}px` : toCssPixel(this.nzWidth);
    this.flexSetting = `0 0 ${this.widthSetting}`;
    this.cdr.markForCheck();
  }

  updateBreakpointMatch(): void {
    if (this.nzBreakpoint) {
      this.matchBreakPoint = this.mediaMatcher.matchMedia(siderResponsiveMap[this.nzBreakpoint]).matches;
      this.setCollapsed(this.matchBreakPoint);
      this.cdr.markForCheck();
    }
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

  constructor(
    private mediaMatcher: MediaMatcher,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private nzDomEventService: NzDomEventService
  ) {}

  ngOnInit(): void {
    this.updateStyleMap();
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

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      merge(
        this.nzDomEventService.registerResizeListener().pipe(finalize(() => this.nzDomEventService.unregisterResizeListener())),
        of(true).pipe(delay(0))
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.ngZone.run(() => {
            this.updateBreakpointMatch();
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
