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
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { IndexableObject, InputBoolean, NzBreakpointKey, NzDomEventService, siderResponsiveMap, toCssPixel } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

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
      [siderWidth]="hostStyleMap.width"
      (click)="setCollapsed(!nzCollapsed)"
    ></div>
  `,
  host: {
    '[class.ant-layout-sider]': 'true',
    '[class.ant-layout-sider-zero-width]': `nzCollapsed && nzCollapsedWidth === 0`,
    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
    '[class.ant-layout-sider-dark]': `nzTheme === 'dark'`,
    '[class.ant-layout-sider-collapsed]': `nzCollapsed`,
    '[style]': 'hostStyleMap'
  }
})
export class NzSiderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  private destroy$ = new Subject();
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
  hostStyleMap: IndexableObject = {};

  updateStyleMap(): void {
    let widthSetting: string;
    if (this.nzCollapsed) {
      widthSetting = `${this.nzCollapsedWidth}px`;
    } else {
      widthSetting = toCssPixel(this.nzWidth);
    }
    const flexSetting = `0 0 ${widthSetting}`;
    this.hostStyleMap = {
      flex: flexSetting,
      maxWidth: widthSetting,
      minWidth: widthSetting,
      width: widthSetting
    };
    this.cdr.markForCheck();
  }

  updateBreakpointMatch(): void {
    if (this.nzBreakpoint) {
      this.matchBreakPoint = this.mediaMatcher.matchMedia(siderResponsiveMap[this.nzBreakpoint]).matches;
      this.setCollapsed(this.matchBreakPoint);
    }
    this.cdr.markForCheck();
  }

  setCollapsed(collapsed: boolean): void {
    this.nzCollapsed = collapsed;
    this.nzCollapsedChange.emit(collapsed);
    this.cdr.markForCheck();
  }

  constructor(
    private mediaMatcher: MediaMatcher,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private nzDomEventService: NzDomEventService
  ) {}

  ngOnInit(): void {
    this.updateStyleMap();
  }

  ngOnChanges(): void {
    this.updateStyleMap();
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      Promise.resolve().then(() => this.updateBreakpointMatch());
      this.nzDomEventService
        .registerResizeListener()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        )
        .subscribe(() => this.updateBreakpointMatch());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
