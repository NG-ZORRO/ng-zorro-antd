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

import { toBoolean } from '../core/util/convert';

import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';

const EXAGGERATED_OVERSCROLL = 64;
export type ScrollDirection = 'after' | 'before';

import { NzTabPositionMode } from './nz-tabset.component';

@Component({
  selector           : '[nz-tabs-nav]',
  preserveWhitespaces: false,
  templateUrl        : './nz-tabs-nav.component.html'
})
export class NzTabsNavComponent implements AfterContentChecked, AfterContentInit {
  private _animated = true;
  private _hideBar = false;
  private _showPagination = true;
  private _type = 'line';
  private _tabPositionMode: NzTabPositionMode = 'horizontal';
  private _scrollDistance = 0;
  private _selectedIndex = 0;
  showPaginationControls = false;
  disableScrollAfter = true;
  disableScrollBefore = true;
  selectedIndexChanged = false;
  realignInkBar: Subscription | null = null;
  tabLabelCount: number;
  scrollDistanceChanged: boolean;
  @ContentChildren(NzTabLabelDirective) listOfNzTabLabelDirective: QueryList<NzTabLabelDirective>;
  @ViewChild(NzTabsInkBarDirective) nzTabsInkBarDirective: NzTabsInkBarDirective;
  @ViewChild('navContainerElement') navContainerElement: ElementRef;
  @ViewChild('navListElement') navListElement: ElementRef;
  @Output() nzOnNextClick = new EventEmitter<void>();
  @Output() nzOnPrevClick = new EventEmitter<void>();
  @Input() nzTabBarExtraContent: TemplateRef<void>;

  @Input()
  set nzAnimated(value: boolean) {
    this._animated = toBoolean(value);
  }

  get nzAnimated(): boolean {
    return this._animated;
  }

  @Input()
  set nzHideBar(value: boolean) {
    this._hideBar = toBoolean(value);
  }

  get nzHideBar(): boolean {
    return this._hideBar;
  }

  @Input()
  set nzType(value: string) {
    this._type = value;
    if (this._type !== 'line') {
      this.nzTabsInkBarDirective.setDisplay('none');
    } else {
      this.nzTabsInkBarDirective.setDisplay('block');
    }
  }

  get nzType(): string {
    return this._type;
  }

  @Input()
  set nzShowPagination(value: boolean) {
    this._showPagination = toBoolean(value);
  }

  get nzShowPagination(): boolean {
    return this._showPagination;
  }

  @Input()
  set nzPositionMode(value: NzTabPositionMode) {
    this._tabPositionMode = value;
    this.alignInkBarToSelectedTab();
    if (this.nzShowPagination) {
      this.updatePagination();
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

  constructor(public elementRef: ElementRef,
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

  scrollHeader(scrollDir: ScrollDirection): void {
    if (scrollDir === 'before' && !this.disableScrollBefore) {
      this.nzOnPrevClick.emit();
    } else if (scrollDir === 'after' && !this.disableScrollAfter) {
      this.nzOnNextClick.emit();
    }
    // Move the scroll distance one-third the length of the tab list's viewport.
    this.scrollDistance += (scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix / 3;
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

  ngAfterContentInit(): void {
    this.realignInkBar = this.ngZone.runOutsideAngular(() => {
      const dirChange = this.dir ? this.dir.change : observableOf(null);
      const resize = typeof window !== 'undefined' ?
        fromEvent(window, 'resize').pipe(auditTime(10)) :
        observableOf(null);
      return merge(dirChange, resize).pipe(startWith(null)).subscribe(() => {
        if (this.nzShowPagination) {
          this.updatePagination();
        }
        this.alignInkBarToSelectedTab();
      });
    });
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
    this.showPaginationControls =
      this.tabListScrollWidthHeightPix > this.elementRefOffSetWidthHeight;

    if (!this.showPaginationControls) {
      this.scrollDistance = 0;
    }
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

  checkScrollingControls(): void {
    // Check if the pagination arrows should be activated.
    this.disableScrollBefore = this.scrollDistance === 0;
    this.disableScrollAfter = this.scrollDistance === this.getMaxScrollDistance();
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
      PAGINATION_PIX = 64;
    }
    if (this.nzPositionMode === 'horizontal') {
      return this.navContainerElement.nativeElement.offsetWidth - PAGINATION_PIX;
    } else {
      return this.navContainerElement.nativeElement.offsetHeight - PAGINATION_PIX;
    }
  }

  get tabListScrollWidthHeightPix(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this.navListElement.nativeElement.scrollWidth;
    } else {
      return this.navListElement.nativeElement.scrollHeight;
    }
  }

  get elementRefOffSetWidthHeight(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this.elementRef.nativeElement.offsetWidth;
    } else {
      return this.elementRef.nativeElement.offsetHeight;
    }
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
}
