/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { toCssPixel, InputBoolean, NzBreakPoint, NzDomEventService } from 'ng-zorro-antd/core';

import { NzLayoutComponent } from './nz-layout.component';

@Component({
  selector: 'nz-sider',
  exportAs: 'nzSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-sider.component.html',
  host: {
    '[class.ant-layout-sider-zero-width]': 'nzCollapsed && nzCollapsedWidth === 0',
    '[class.ant-layout-sider-light]': `nzTheme === 'light'`,
    '[class.ant-layout-sider-collapsed]': 'nzCollapsed',
    '[style.flex]': 'flexSetting',
    '[style.max-width]': 'widthSetting',
    '[style.min-width]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
})
export class NzSiderComponent implements OnInit, AfterViewInit, OnDestroy {
  private below = false;
  private destroy$ = new Subject();
  private dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px'
  };

  @Output() readonly nzCollapsedChange = new EventEmitter();

  @Input() nzWidth: string | number = 200;
  @Input() nzTheme: 'light' | 'dark' = 'dark';
  @Input() nzCollapsedWidth = 80;
  @Input() nzBreakpoint: NzBreakPoint;
  @Input() nzZeroTrigger: TemplateRef<void>;
  @Input() @InputBoolean() nzReverseArrow = false;
  @Input() @InputBoolean() nzCollapsible = false;
  @Input() @InputBoolean() nzCollapsed = false;
  @Input() nzTrigger: TemplateRef<void>;
  @ViewChild('defaultTrigger', { static: true }) defaultTrigger: TemplateRef<void>;
  get trigger(): TemplateRef<void> {
    return this.nzTrigger !== undefined ? this.nzTrigger : this.defaultTrigger;
  }

  get flexSetting(): string {
    return `0 0 ${this.widthSetting}`;
  }

  get widthSetting(): string {
    if (this.nzCollapsed) {
      return `${this.nzCollapsedWidth}px`;
    } else {
      return toCssPixel(this.nzWidth);
    }
  }

  watchMatchMedia(): void {
    if (this.nzBreakpoint) {
      const matchBelow = this.mediaMatcher.matchMedia(`(max-width: ${this.dimensionMap[this.nzBreakpoint]})`).matches;
      this.below = matchBelow;
      this.nzCollapsed = matchBelow;
      this.nzCollapsedChange.emit(matchBelow);
      this.ngZone.run(() => {
        this.cdr.markForCheck();
      });
    }
  }

  toggleCollapse(): void {
    this.nzCollapsed = !this.nzCollapsed;
    this.nzCollapsedChange.emit(this.nzCollapsed);
  }

  get isZeroTrigger(): boolean {
    return (
      this.nzCollapsible &&
      this.trigger &&
      this.nzCollapsedWidth === 0 &&
      ((this.nzBreakpoint && this.below) || !this.nzBreakpoint)
    );
  }

  get isSiderTrigger(): boolean {
    return this.nzCollapsible && this.trigger && this.nzCollapsedWidth !== 0;
  }

  constructor(
    @Optional() @Host() private nzLayoutComponent: NzLayoutComponent,
    private mediaMatcher: MediaMatcher,
    private ngZone: NgZone,
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private nzDomEventService: NzDomEventService,
    renderer: Renderer2,
    elementRef: ElementRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-layout-sider');
  }

  ngOnInit(): void {
    if (this.nzLayoutComponent) {
      this.nzLayoutComponent.initSider();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      Promise.resolve().then(() => this.watchMatchMedia());
      this.nzDomEventService
        .registerResizeListener()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        )
        .subscribe(() => this.watchMatchMedia());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.nzLayoutComponent) {
      this.nzLayoutComponent.destroySider();
    }
  }
}
