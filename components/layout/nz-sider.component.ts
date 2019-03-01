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
import { fromEvent, Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';
import { InputBoolean } from '../core/util/convert';
import { NzLayoutComponent } from './nz-layout.component';

export type NzBreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

@Component({
  selector           : 'nz-sider',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-sider.component.html',
  host               : {
    '[class.ant-layout-sider-zero-width]': 'nzCollapsed && nzCollapsedWidth === 0',
    '[class.ant-layout-sider-light]'     : `nzTheme === 'light'`,
    '[class.ant-layout-sider-collapsed]' : 'nzCollapsed',
    '[style.flex]'                       : 'flexSetting',
    '[style.max-width.px]'               : 'widthSetting',
    '[style.min-width.px]'               : 'widthSetting',
    '[style.width.px]'                   : 'widthSetting'
  }
})
export class NzSiderComponent implements OnInit, AfterViewInit, OnDestroy {
  private below = false;
  private destroy$ = new Subject();
  private dimensionMap = {
    xs : '480px',
    sm : '576px',
    md : '768px',
    lg : '992px',
    xl : '1200px',
    xxl: '1600px'
  };
  @Input() nzWidth = 200;
  @Input() nzTheme: 'light' | 'dark' = 'dark';
  @Input() nzCollapsedWidth = 80;
  @Input() nzBreakpoint: NzBreakPoint;
  @Input() nzZeroTrigger: TemplateRef<void>;
  @Input() @ViewChild('defaultTrigger') nzTrigger: TemplateRef<void>;
  @Input() @InputBoolean() nzReverseArrow = false;
  @Input() @InputBoolean() nzCollapsible = false;
  @Input() @InputBoolean() nzCollapsed = false;
  @Output() readonly nzCollapsedChange = new EventEmitter();

  get flexSetting(): string {
    if (this.nzCollapsed) {
      return `0 0 ${this.nzCollapsedWidth}px`;
    } else {
      return `0 0 ${this.nzWidth}px`;
    }
  }

  get widthSetting(): number {
    if (this.nzCollapsed) {
      return this.nzCollapsedWidth;
    } else {
      return this.nzWidth;
    }
  }

  watchMatchMedia(): void {
    if (this.nzBreakpoint) {
      const matchBelow = this.mediaMatcher.matchMedia(`(max-width: ${this.dimensionMap[ this.nzBreakpoint ]})`).matches;
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
    return this.nzCollapsible && this.nzTrigger && this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.below) || (!this.nzBreakpoint));
  }

  get isSiderTrigger(): boolean {
    return this.nzCollapsible && this.nzTrigger && this.nzCollapsedWidth !== 0;
  }

  constructor(@Optional() @Host() private nzLayoutComponent: NzLayoutComponent, private mediaMatcher: MediaMatcher, private ngZone: NgZone, private platform: Platform, private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
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
      this.ngZone.runOutsideAngular(() => {
        fromEvent(window, 'resize')
        .pipe(auditTime(16), takeUntil(this.destroy$))
        .subscribe(() => this.watchMatchMedia());
      });
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
