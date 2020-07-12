/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** code from https://github.com/angular/material2 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, pxToNumber } from 'ng-zorro-antd/core/util';
import { merge, of as observableOf, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzTabLabelDirective } from './tab-label.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabPosition, NzTabPositionMode } from './tabs.types';

const EXAGGERATED_OVERSCROLL = 64;
export type ScrollDirection = 'after' | 'before';

@Component({
  selector: 'nz-tabs-nav',
  exportAs: 'nzTabsNav',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div style="float:right;" *ngIf="nzTabBarExtraContent" class="ant-tabs-extra-content">
      <ng-template [ngTemplateOutlet]="nzTabBarExtraContent"></ng-template>
    </div>
    <div class="ant-tabs-nav-container" [class.ant-tabs-nav-container-scrolling]="showPaginationControls" #navContainerElement>
      <span
        class="ant-tabs-tab-prev"
        (click)="scrollHeader('before')"
        [class.ant-tabs-tab-btn-disabled]="disableScrollBefore"
        [class.ant-tabs-tab-arrow-show]="showPaginationControls"
      >
        <span class="ant-tabs-tab-prev-icon">
          <i nz-icon [nzType]="nzPositionMode === 'horizontal' ? 'left' : 'up'" class="ant-tabs-tab-prev-icon-target"></i>
        </span>
      </span>
      <span
        class="ant-tabs-tab-next"
        (click)="scrollHeader('after')"
        [class.ant-tabs-tab-btn-disabled]="disableScrollAfter"
        [class.ant-tabs-tab-arrow-show]="showPaginationControls"
      >
        <span class="ant-tabs-tab-next-icon">
          <i nz-icon [nzType]="nzPositionMode === 'horizontal' ? 'right' : 'down'" class="ant-tabs-tab-next-icon-target"></i>
        </span>
      </span>
      <div class="ant-tabs-nav-wrap">
        <div class="ant-tabs-nav-scroll" #scrollListElement>
          <div class="ant-tabs-nav" [class.ant-tabs-nav-animated]="nzAnimated" #navListElement (cdkObserveContent)="onContentChanges()">
            <div>
              <ng-content></ng-content>
            </div>
            <div
              nz-tabs-ink-bar
              [hidden]="nzHideBar"
              [nzAnimated]="nzAnimated"
              [nzPositionMode]="nzPositionMode"
              style="display: block;"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class.ant-tabs-bar]': 'true',
    '[class.ant-tabs-card-bar]': `nzType === 'card'`,
    '[class.ant-tabs-top-bar]': `nzTabPosition === 'top'`,
    '[class.ant-tabs-bottom-bar]': `nzTabPosition === 'bottom'`,
    '[class.ant-tabs-left-bar]': `nzTabPosition === 'left'`,
    '[class.ant-tabs-right-bar]': `nzTabPosition === 'right'`,
    '[class.ant-tabs-small-bar]': `nzSize === 'small'`,
    '[class.ant-tabs-default-bar]': `nzSize === 'default'`,
    '[class.ant-tabs-large-bar]': `nzSize === 'large'`
  }
})
export class NzTabsNavComponent implements AfterContentChecked, AfterContentInit, OnDestroy {
  static ngAcceptInputType_nzAnimated: BooleanInput;
  static ngAcceptInputType_nzHideBar: BooleanInput;
  static ngAcceptInputType_nzShowPagination: BooleanInput;

  private _tabPositionMode: NzTabPositionMode = 'horizontal';
  private _scrollDistance = 0;
  private _selectedIndex = 0;
  /** Cached text content of the header. */
  private currentTextContent?: string;
  private destroy$ = new Subject<void>();
  showPaginationControls = false;
  disableScrollAfter = true;
  disableScrollBefore = true;
  selectedIndexChanged = false;
  realignInkBar: Subscription | null = null;
  tabLabelCount?: number;
  scrollDistanceChanged?: boolean;
  @ContentChildren(NzTabLabelDirective) listOfNzTabLabelDirective!: QueryList<NzTabLabelDirective>;
  @ViewChild(NzTabsInkBarDirective, { static: true }) nzTabsInkBarDirective!: NzTabsInkBarDirective;
  @ViewChild('navContainerElement', { static: true }) navContainerElement!: ElementRef<HTMLDivElement>;
  @ViewChild('navListElement', { static: true }) navListElement!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollListElement', { static: true }) scrollListElement!: ElementRef<HTMLDivElement>;
  @Output() readonly nzOnNextClick = new EventEmitter<void>();
  @Output() readonly nzOnPrevClick = new EventEmitter<void>();
  @Input() nzTabBarExtraContent?: TemplateRef<void>;
  @Input() @InputBoolean() nzAnimated = true;
  @Input() @InputBoolean() nzHideBar = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() nzType = 'line';
  @Input() nzSize?: NzSizeLDSType;
  @Input() nzTabPosition: NzTabPosition = 'top';

  @Input()
  set nzPositionMode(value: NzTabPositionMode) {
    this._tabPositionMode = value;
    this.alignInkBarToSelectedTab();
    if (this.nzShowPagination) {
      Promise.resolve().then(() => {
        this.updatePagination();
      });
    }
  }

  get nzPositionMode(): NzTabPositionMode {
    return this._tabPositionMode;
  }

  @Input()
  set selectedIndex(value: number) {
    this.selectedIndexChanged = this._selectedIndex !== value;
    this._selectedIndex = value;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  constructor(
    public elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private resizeService: NzResizeService,
    @Optional() private dir: Directionality
  ) {}

  onContentChanges(): void {
    const textContent = this.elementRef.nativeElement.textContent;
    // We need to diff the text content of the header, because the MutationObserver callback
    // will fire even if the text content didn't change which is inefficient and is prone
    // to infinite loops if a poorly constructed expression is passed in (see #14249).
    if (textContent !== this.currentTextContent) {
      this.currentTextContent = textContent;
      this.ngZone.run(() => {
        if (this.nzShowPagination) {
          this.updatePagination();
        }
        this.alignInkBarToSelectedTab();
        this.cdr.markForCheck();
      });
    }
  }

  scrollHeader(scrollDir: ScrollDirection): void {
    if (scrollDir === 'before' && !this.disableScrollBefore) {
      this.nzOnPrevClick.emit();
    } else if (scrollDir === 'after' && !this.disableScrollAfter) {
      this.nzOnNextClick.emit();
    }
    // Move the scroll distance one-third the length of the tab list's viewport.
    this.scrollDistance += ((scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix) / 3;
  }

  ngAfterContentChecked(): void {
    if (this.tabLabelCount !== this.listOfNzTabLabelDirective.length) {
      if (this.nzShowPagination) {
        this.updatePagination();
      }
      this.tabLabelCount = this.listOfNzTabLabelDirective.length;
      this.cdr.markForCheck();
    }
    if (this.selectedIndexChanged) {
      this.scrollToLabel(this._selectedIndex);
      if (this.nzShowPagination) {
        this.checkScrollingControls();
      }
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
      this.cdr.markForCheck();
    }
    if (this.scrollDistanceChanged) {
      if (this.nzShowPagination) {
        this.updateTabScrollPosition();
      }
      this.scrollDistanceChanged = false;
      this.cdr.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    this.realignInkBar = this.ngZone.runOutsideAngular(() => {
      const dirChange = this.dir ? this.dir.change : observableOf(null);
      const resize = typeof window !== 'undefined' ? this.resizeService.subscribe().pipe(takeUntil(this.destroy$)) : observableOf(null);
      return merge(dirChange, resize)
        .pipe(startWith(null))
        .subscribe(() => {
          if (this.nzShowPagination) {
            this.updatePagination();
          }
          this.alignInkBarToSelectedTab();
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.realignInkBar) {
      this.realignInkBar.unsubscribe();
    }
  }

  updateTabScrollPosition(): void {
    const scrollDistance = this.scrollDistance;
    if (this.nzPositionMode === 'horizontal') {
      const translateX = this.getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
      this.renderer.setStyle(this.navListElement.nativeElement, 'transform', `translate3d(${translateX}px, 0, 0)`);
    } else {
      this.renderer.setStyle(this.navListElement.nativeElement, 'transform', `translate3d(0,${-scrollDistance}px, 0)`);
    }
  }

  updatePagination(): void {
    this.checkPaginationEnabled();
    this.checkScrollingControls();
    this.updateTabScrollPosition();
  }

  checkPaginationEnabled(): void {
    const isEnabled = this.tabListScrollWidthHeightPix > this.tabListScrollOffSetWidthHeight;
    if (!isEnabled) {
      this.scrollDistance = 0;
    }
    if (isEnabled !== this.showPaginationControls) {
      this.cdr.markForCheck();
    }
    this.showPaginationControls = isEnabled;
  }

  scrollToLabel(labelIndex: number): void {
    const selectedLabel = this.listOfNzTabLabelDirective ? this.listOfNzTabLabelDirective.toArray()[labelIndex] : null;

    if (selectedLabel) {
      // The view length is the visible width of the tab labels.

      let labelBeforePos: number;
      let labelAfterPos: number;
      if (this.nzPositionMode === 'horizontal') {
        if (this.getLayoutDirection() === 'ltr') {
          labelBeforePos = selectedLabel.getOffsetLeft();
          labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        } else {
          labelAfterPos = this.navListElement.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
          labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
      } else {
        labelBeforePos = selectedLabel.getOffsetTop();
        labelAfterPos = labelBeforePos + selectedLabel.getOffsetHeight();
      }
      const beforeVisiblePos = this.scrollDistance;
      const afterVisiblePos = this.scrollDistance + this.viewWidthHeightPix;

      if (labelBeforePos < beforeVisiblePos) {
        // Scroll header to move label to the before direction
        this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
      } else if (labelAfterPos > afterVisiblePos) {
        // Scroll header to move label to the after direction
        this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
      }
    }
  }

  checkScrollingControls(): void {
    // Check if the pagination arrows should be activated.
    this.disableScrollBefore = this.scrollDistance === 0;
    this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
    this.cdr.markForCheck();
  }

  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  getMaxScrollDistance(): number {
    return this.tabListScrollWidthHeightPix - this.viewWidthHeightPix || 0;
  }

  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  set scrollDistance(v: number) {
    this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));

    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this.scrollDistanceChanged = true;

    this.checkScrollingControls();
  }

  get scrollDistance(): number {
    return this._scrollDistance;
  }

  get viewWidthHeightPix(): number {
    let PAGINATION_PIX = 0;
    if (this.showPaginationControls) {
      PAGINATION_PIX = this.navContainerScrollPaddingPix;
    }
    if (this.nzPositionMode === 'horizontal') {
      return this.navContainerElement.nativeElement.offsetWidth - PAGINATION_PIX;
    } else {
      return this.navContainerElement.nativeElement.offsetHeight - PAGINATION_PIX;
    }
  }

  get navContainerScrollPaddingPix(): number {
    if (this.platform.isBrowser) {
      const navContainer = this.navContainerElement.nativeElement;
      const originStyle: CSSStyleDeclaration = window.getComputedStyle
        ? window.getComputedStyle(navContainer)
        : (navContainer as NzSafeAny).currentStyle; // currentStyle for IE < 9
      if (this.nzPositionMode === 'horizontal') {
        return pxToNumber(originStyle.paddingLeft) + pxToNumber(originStyle.paddingRight);
      } else {
        return pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom);
      }
    } else {
      return 0;
    }
  }

  get tabListScrollWidthHeightPix(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this.navListElement.nativeElement.scrollWidth;
    } else {
      return this.navListElement.nativeElement.scrollHeight;
    }
  }

  get tabListScrollOffSetWidthHeight(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this.scrollListElement.nativeElement.offsetWidth;
    } else {
      return this.elementRef.nativeElement.offsetHeight;
    }
  }

  getLayoutDirection(): Direction {
    return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  alignInkBarToSelectedTab(): void {
    if (this.nzType === 'line') {
      const selectedLabelWrapper =
        this.listOfNzTabLabelDirective && this.listOfNzTabLabelDirective.length
          ? this.listOfNzTabLabelDirective.toArray()[this.selectedIndex].elementRef.nativeElement
          : null;
      if (this.nzTabsInkBarDirective) {
        this.nzTabsInkBarDirective.alignToElement(selectedLabelWrapper);
      }
    }
  }
}
