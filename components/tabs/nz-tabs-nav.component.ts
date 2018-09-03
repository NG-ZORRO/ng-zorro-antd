/** code from https://github.com/angular/material2 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { fromEvent, merge, of as observableOf, Subscription } from 'rxjs';
import { auditTime, startWith } from 'rxjs/operators';

import { InputBoolean } from '../core/util/convert';

import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';
import { NzTabPositionMode } from './nz-tabset.component';

const EXAGGERATED_OVERSCROLL = 64;

export type ScrollDirection = 'after' | 'before';

@Component({
  selector           : '[nz-tabs-nav]',
  preserveWhitespaces: false,
  templateUrl        : './nz-tabs-nav.component.html'
})
export class NzTabsNavComponent implements AfterContentChecked, AfterContentInit {
  @ContentChildren(NzTabLabelDirective) listOfNzTabLabelDirective: QueryList<NzTabLabelDirective>;
  @ViewChild(NzTabsInkBarDirective) nzTabsInkBarDirective: NzTabsInkBarDirective;
  @ViewChild('navContainerElement') navContainerElement: ElementRef;
  @ViewChild('navListElement') navListElement: ElementRef;

  @Input() nzTabBarExtraContent: TemplateRef<void>;
  @Input() @InputBoolean() nzAnimated = true;
  @Input() @InputBoolean() nzHideBar = false;
  @Input() @InputBoolean() nzShowPagination = true;

  @Input()
  get nzType(): string { return this._type; }
  set nzType(value: string) {
    this._type = value;
    this.nzTabsInkBarDirective.setDisplay(this._type === 'line' ? 'none' : 'block');
  }
  private _type = 'line';

  @Input()
  get nzPositionMode(): NzTabPositionMode { return this._tabPositionMode; }
  set nzPositionMode(value: NzTabPositionMode) {
    this._tabPositionMode = value;
    this.alignInkBarToSelectedTab();
    if (this.nzShowPagination) { this.updatePagination(); }
  }
  private _tabPositionMode: NzTabPositionMode = 'horizontal';

  @Input()
  get selectedIndex(): number { return this._selectedIndex; }
  set selectedIndex(value: number) {
    this.selectedIndexChanged = this._selectedIndex !== value;
    this._selectedIndex = value;
  }
  private _selectedIndex = 0;

  @Output() readonly nzOnNextClick = new EventEmitter<void>();
  @Output() readonly nzOnPrevClick = new EventEmitter<void>();

  showPaginationControls = false;
  disableScrollAfter = true;
  disableScrollBefore = true;
  selectedIndexChanged = false;
  realignInkBar: Subscription | null = null;
  tabLabelCount: number;
  scrollDistanceChanged: boolean;

  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  set scrollDistance(v: number) {
    this._scrollDistance = Math.max(0, Math.min(this.getMaxScrollDistance(), v));
    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this.scrollDistanceChanged = true;
    this.checkScrollingControls();
  }
  get scrollDistance(): number { return this._scrollDistance; }
  private _scrollDistance = 0;

  updatePagination(): void {
    this.checkPaginationEnabled();
    this.checkScrollingControls();
    this.updateTabScrollPosition();
  }

  /**
   * Check is pagination should be enabled by comparing the labels' width and the container's width.
   */
  checkPaginationEnabled(): void {
    this.showPaginationControls = this.tabListScrollWidthHeightPix > this.elementRefOffSetWidthHeight;
    console.log(this.showPaginationControls);
    if (!this.showPaginationControls) { this.scrollDistance = 0; }
  }

  /**
   * Check if the pagination arrows should be activated.
   */
  checkScrollingControls(): void {
    this.disableScrollBefore = this.scrollDistance === 0;
    this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
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

  scrollHeader(scrollDir: ScrollDirection): void {
    if (scrollDir === 'before' && !this.disableScrollBefore) {
      this.nzOnPrevClick.emit();
    } else if (scrollDir === 'after' && !this.disableScrollAfter) {
      this.nzOnNextClick.emit();
    }
    // Move the scroll distance one-third the length of the tab list's viewport.
    this.scrollDistance += (scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix / 3;
  }

  scrollToLabel(labelIndex: number): void {
    const selectedLabel = this.listOfNzTabLabelDirective
      ? this.listOfNzTabLabelDirective.toArray()[ labelIndex ]
      : null;

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

  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  getMaxScrollDistance(): number {
    return (this.tabListScrollWidthHeightPix - this.viewWidthHeightPix) || 0;
  }

  get viewWidthHeightPix(): number {
    const PAGINATION_PIX = this.showPaginationControls ? 64 : 0;
    return this.nzPositionMode === 'horizontal'
      ?  this.navContainerElement.nativeElement.offsetWidth - PAGINATION_PIX
      : this.navContainerElement.nativeElement.offsetHeight - PAGINATION_PIX;
  }

  get tabListScrollWidthHeightPix(): number {
    return this.nzPositionMode === 'horizontal'
      ? this.navListElement.nativeElement.scrollWidth
      : this.navListElement.nativeElement.scrollHeight;
  }

  get elementRefOffSetWidthHeight(): number {
    return this.nzPositionMode === 'horizontal'
      ? this.elementRef.nativeElement.offsetWidth
      : this.elementRef.nativeElement.offsetHeight;
  }

  getLayoutDirection(): Direction {
    return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  alignInkBarToSelectedTab(): void {
    if (this.nzType === 'line') {
      const selectedLabelWrapper = this.listOfNzTabLabelDirective && this.listOfNzTabLabelDirective.length
        ? this.listOfNzTabLabelDirective.toArray()[ this.selectedIndex ].elementRef.nativeElement
        : null;
      if (this.nzTabsInkBarDirective) {
        this.nzTabsInkBarDirective.alignToElement(selectedLabelWrapper);
      }
    }
  }

  constructor(
    public elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer: Renderer2,
    @Optional() private dir: Directionality) {
  }

  onContentChanges(): void {
    if (this.nzShowPagination) {
      this.updatePagination();
    }
    this.alignInkBarToSelectedTab();
  }

  ngAfterContentChecked(): void {
    if (this.tabLabelCount !== this.listOfNzTabLabelDirective.length) {
      if (this.nzShowPagination) {
        this.updatePagination();
      }
      this.tabLabelCount = this.listOfNzTabLabelDirective.length;
    }
    if (this.selectedIndexChanged) {
      this.scrollToLabel(this._selectedIndex);
      if (this.nzShowPagination) {
        this.checkScrollingControls();
      }
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
    }
    if (this.scrollDistanceChanged) {
      if (this.nzShowPagination) {
        this.updateTabScrollPosition();
      }
      this.scrollDistanceChanged = false;
    }
  }

  /**
   * When windows resizes or scroll direction changes, update pagination and
   * realign ink bar.
   */
  ngAfterContentInit(): void {
    this.realignInkBar = this.ngZone.runOutsideAngular(() => {
      const dirChange = this.dir ? this.dir.change : observableOf(null);
      const resize = typeof window !== 'undefined' ?
        fromEvent(window, 'resize').pipe(auditTime(10)) :
        observableOf(null);
      return merge(dirChange, resize).pipe(startWith(null)).subscribe(() => {
        if (this.nzShowPagination) { this.updatePagination(); }
        this.alignInkBarToSelectedTab();
      });
    });
  }
}
