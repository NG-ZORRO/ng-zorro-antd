/** code from https://github.com/angular/material2 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  Optional,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { auditTime } from 'rxjs/operators/auditTime';
import { startWith } from 'rxjs/operators/startWith';
import { toBoolean } from '../util/convert';
import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';

const EXAGGERATED_OVERSCROLL = 64;
export type ScrollDirection = 'after' | 'before';

/** duplicated defined https://github.com/angular/angular-cli/issues/2034 **/
export type NzTabPositionMode = 'horizontal' | 'vertical';

@Component({
  selector     : 'nz-tabs-nav',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div style="float:right;" *ngIf="_tabBarExtraContent">
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="_tabBarExtraContent">
        </ng-template>
      </div>
    </div>
    <div class="ant-tabs-nav-container" [class.ant-tabs-nav-container-scrolling]="_showPaginationControls" #tabListContainer>
      <span class="ant-tabs-tab-prev ant-tabs-tab-arrow-show" (click)="_scrollHeader('before')" [class.ant-tabs-tab-btn-disabled]="_disableScrollBefore" *ngIf="_showPaginationControls">
        <span class="ant-tabs-tab-prev-icon"></span>
      </span>
      <span class="ant-tabs-tab-next ant-tabs-tab-arrow-show" (click)="_scrollHeader('after')" [class.ant-tabs-tab-btn-disabled]="_disableScrollAfter" *ngIf="_showPaginationControls">
        <span class="ant-tabs-tab-next-icon"></span>
      </span>
      <div class="ant-tabs-nav-wrap">
        <div class="ant-tabs-nav-scroll">
          <div class="ant-tabs-nav" [class.ant-tabs-nav-animated]="nzAnimated" #tabList (cdkObserveContent)="_onContentChanges()">
            <div nz-tabs-ink-bar [hidden]="nzHideBar" [nzAnimated]="nzAnimated" [nzPositionMode]="nzPositionMode" style="display: block;"></div>
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class.ant-tabs-bar]': 'true'
  }
})
export class NzTabsNavComponent implements AfterContentChecked, AfterContentInit {
  private _animated = true;
  private _hideBar = false;
  private _showPagination = true;

  _showPaginationControls = false;
  _disableScrollAfter = true;
  _disableScrollBefore = true;
  _scrollDistance = 0;
  _selectedIndexChanged = false;
  _realignInkBar: Subscription | null = null;
  _tabLabelCount: number;
  _scrollDistanceChanged: boolean;
  _selectedIndex = 0;
  _tabPositionMode: NzTabPositionMode = 'horizontal';
  @Input() nzSize = 'default';
  _type = 'line';

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
      this._inkBar.setDisplay('none');
    } else {
      this._inkBar.setDisplay('block');
    }
  }

  get nzType(): string {
    return this._type;
  }

  @ContentChild('tabBarExtraContent') _tabBarExtraContent: TemplateRef<void>;
  @ContentChildren(NzTabLabelDirective) _labelWrappers: QueryList<NzTabLabelDirective>;
  @ViewChild(NzTabsInkBarDirective) _inkBar: NzTabsInkBarDirective;
  @ViewChild('tabListContainer') _tabListContainer: ElementRef;
  @ViewChild('tabList') _tabList: ElementRef;

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
    this._alignInkBarToSelectedTab();
    if (this.nzShowPagination) {
      this._updatePagination();
    }
  }

  get nzPositionMode(): NzTabPositionMode {
    return this._tabPositionMode;
  }

  @Input()
  set selectedIndex(value: number) {
    this._selectedIndexChanged = this._selectedIndex !== value;

    this._selectedIndex = value;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  constructor(public _elementRef: ElementRef,
              private _ngZone: NgZone,
              private _renderer: Renderer2,
              @Optional() private _dir: Directionality) {
  }

  _onContentChanges(): void {
    if (this.nzShowPagination) {
      this._updatePagination();
    }
    this._alignInkBarToSelectedTab();
  }

  _scrollHeader(scrollDir: ScrollDirection): void {

    // Move the scroll distance one-third the length of the tab list's viewport.
    this.scrollDistance += (scrollDir === 'before' ? -1 : 1) * this.viewWidthHeightPix / 3;
  }

  ngAfterContentChecked(): void {

    if (this._tabLabelCount !== this._labelWrappers.length) {
      if (this.nzShowPagination) {
        this._updatePagination();
      }
      this._tabLabelCount = this._labelWrappers.length;
    }
    if (this._selectedIndexChanged) {
      this._scrollToLabel(this._selectedIndex);
      if (this.nzShowPagination) {
        this._checkScrollingControls();
      }
      this._alignInkBarToSelectedTab();
      this._selectedIndexChanged = false;
    }
    if (this._scrollDistanceChanged) {
      if (this.nzShowPagination) {
        this._updateTabScrollPosition();
      }
      this._scrollDistanceChanged = false;
    }
  }

  ngAfterContentInit(): void {
    this._realignInkBar = this._ngZone.runOutsideAngular(() => {
      const dirChange = this._dir ? this._dir.change : observableOf(null);
      const resize = typeof window !== 'undefined' ?
        fromEvent(window, 'resize').pipe(auditTime(10)) :
        observableOf(null);
      return merge(dirChange, resize).pipe(startWith(null)).subscribe(() => {
        if (this.nzShowPagination) {
          this._updatePagination();
        }
        this._alignInkBarToSelectedTab();
      });
    });
  }

  _updateTabScrollPosition(): void {
    const scrollDistance = this.scrollDistance;
    if (this.nzPositionMode === 'horizontal') {
      const translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
      this._renderer.setStyle(this._tabList.nativeElement, 'transform',
        `translate3d(${translateX}px, 0, 0)`);
    } else {
      this._renderer.setStyle(this._tabList.nativeElement, 'transform',
        `translate3d(0,${-scrollDistance}px, 0)`);
    }
  }

  _updatePagination(): void {
    this._checkPaginationEnabled();
    this._checkScrollingControls();
    this._updateTabScrollPosition();
  }

  _checkPaginationEnabled(): void {
    this._showPaginationControls =
      this.tabListScrollWidthHeightPix > this.elementRefOffSetWidthHeight;

    if (!this._showPaginationControls) {
      this.scrollDistance = 0;
    }
  }

  _scrollToLabel(labelIndex: number): void {
    const selectedLabel = this._labelWrappers
      ? this._labelWrappers.toArray()[ labelIndex ]
      : null;

    if (!selectedLabel) {
      return;
    }

    // The view length is the visible width of the tab labels.

    let labelBeforePos: number;
    let labelAfterPos: number;
    if (this.nzPositionMode === 'horizontal') {
      if (this._getLayoutDirection() === 'ltr') {
        labelBeforePos = selectedLabel.getOffsetLeft();
        labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
      } else {
        labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
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

  _checkScrollingControls(): void {
    // Check if the pagination arrows should be activated.
    this._disableScrollBefore = this.scrollDistance === 0;
    this._disableScrollAfter = this.scrollDistance === this._getMaxScrollDistance();
  }

  /**
   * Determines what is the maximum length in pixels that can be set for the scroll distance. This
   * is equal to the difference in width between the tab list container and tab header container.
   *
   * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
   * should be called sparingly.
   */
  _getMaxScrollDistance(): number {
    return (this.tabListScrollWidthHeightPix - this.viewWidthHeightPix) || 0;
  }

  /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
  set scrollDistance(v: number) {
    this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));

    // Mark that the scroll distance has changed so that after the view is checked, the CSS
    // transformation can move the header.
    this._scrollDistanceChanged = true;

    this._checkScrollingControls();
  }

  get scrollDistance(): number {
    return this._scrollDistance;
  }

  get viewWidthHeightPix(): number {
    let PAGINATION_PIX = 0;
    if (this._showPaginationControls) {
      PAGINATION_PIX = 64;
    }
    if (this.nzPositionMode === 'horizontal') {
      return this._tabListContainer.nativeElement.offsetWidth - PAGINATION_PIX;
    } else {
      return this._tabListContainer.nativeElement.offsetHeight - PAGINATION_PIX;
    }
  }

  get tabListScrollWidthHeightPix(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this._tabList.nativeElement.scrollWidth;
    } else {
      return this._tabList.nativeElement.scrollHeight;
    }
  }

  get elementRefOffSetWidthHeight(): number {
    if (this.nzPositionMode === 'horizontal') {
      return this._elementRef.nativeElement.offsetWidth;
    } else {
      return this._elementRef.nativeElement.offsetHeight;
    }
  }

  _getLayoutDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  _alignInkBarToSelectedTab(): void {
    if (this.nzType === 'line') {
      const selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length
        ? this._labelWrappers.toArray()[ this.selectedIndex ].elementRef.nativeElement
        : null;
      if (this._inkBar) {
        this._inkBar.alignToElement(selectedLabelWrapper);
      }
    }
  }
}
