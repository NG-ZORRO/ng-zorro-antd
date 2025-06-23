/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusKeyManager } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW, hasModifierKey } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animationFrameScheduler, asapScheduler, merge, of } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTabPositionMode, NzTabScrollEvent, NzTabScrollListOffsetEvent } from './interfaces';
import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabBarExtraContentDirective } from './tab-bar-extra-content.directive';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabScrollListDirective } from './tab-scroll-list.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';

const RESIZE_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? animationFrameScheduler : asapScheduler;
const CSS_TRANSFORM_TIME = 150;

@Component({
  selector: 'nz-tabs-nav',
  exportAs: 'nzTabsNav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (startExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="startExtraContent()!.templateRef"></ng-template>
      </div>
    }
    <div
      class="ant-tabs-nav-wrap"
      [class.ant-tabs-nav-wrap-ping-left]="pingLeft"
      [class.ant-tabs-nav-wrap-ping-right]="pingRight"
      [class.ant-tabs-nav-wrap-ping-top]="pingTop"
      [class.ant-tabs-nav-wrap-ping-bottom]="pingBottom"
      #navWrap
    >
      <div
        class="ant-tabs-nav-list"
        #navList
        nzTabScrollList
        (offsetChange)="onOffsetChange($event)"
        (tabScroll)="tabScroll.emit($event)"
        role="tablist"
      >
        <ng-content></ng-content>
        @if (showAddButton) {
          <button
            role="tab"
            [attr.tabindex]="-1"
            nz-tab-add-button
            [addIcon]="addIcon"
            (click)="addClicked.emit()"
          ></button>
        }
        <div nz-tabs-ink-bar [hidden]="hideBar" [position]="position" [animated]="inkBarAnimated"></div>
      </div>
    </div>
    <nz-tab-nav-operation
      (addClicked)="addClicked.emit()"
      (selected)="onSelectedFromMenu($event)"
      [addIcon]="addIcon"
      [addable]="addable"
      [items]="hiddenItems"
    ></nz-tab-nav-operation>
    @if (endExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="endExtraContent()!.templateRef"></ng-template>
      </div>
    } @else if (extraTemplate) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="extraTemplate"></ng-template>
      </div>
    }
  `,
  host: {
    class: 'ant-tabs-nav',
    '(keydown)': 'handleKeydown($event)'
  },
  imports: [
    NzTabScrollListDirective,
    NzTabAddButtonComponent,
    NzTabsInkBarDirective,
    NzTabNavOperationComponent,
    NgTemplateOutlet
  ]
})
export class NzTabNavBarComponent implements AfterViewInit, AfterContentChecked, OnChanges {
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private viewportRuler = inject(ViewportRuler);
  private nzResizeObserver = inject(NzResizeObserver);
  private dir = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Output() readonly indexFocused: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly selectFocusedIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly addClicked = new EventEmitter<void>();
  @Output() readonly tabScroll = new EventEmitter<NzTabScrollEvent>();

  @Input() position: NzTabPositionMode = 'horizontal';
  @Input({ transform: booleanAttribute }) addable: boolean = false;
  @Input({ transform: booleanAttribute }) hideBar: boolean = false;
  @Input() addIcon: string | TemplateRef<NzSafeAny> = 'plus';
  @Input() inkBarAnimated = true;
  @Input() extraTemplate?: TemplateRef<void>;

  readonly extraContents = input.required<readonly NzTabBarExtraContentDirective[]>();

  readonly startExtraContent = computed(() => this.extraContents().find(item => item.position() === 'start'));
  readonly endExtraContent = computed(() => this.extraContents().find(item => item.position() === 'end'));

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(value: number) {
    const newValue = coerceNumberProperty(value);
    if (this._selectedIndex !== newValue) {
      this._selectedIndex = value;
      this.selectedIndexChanged = true;
      if (this.keyManager) {
        this.keyManager.updateActiveItem(value);
      }
    }
  }

  @ViewChild('navWrap', { static: true }) navWrapRef!: ElementRef<HTMLElement>;
  @ViewChild('navList', { static: true }) navListRef!: ElementRef<HTMLElement>;
  @ViewChild(NzTabNavOperationComponent, { static: true }) operationRef!: NzTabNavOperationComponent;
  @ViewChild(NzTabAddButtonComponent, { static: false }) addBtnRef!: NzTabAddButtonComponent;
  @ViewChild(NzTabsInkBarDirective, { static: true }) inkBar!: NzTabsInkBarDirective;
  @ContentChildren(NzTabNavItemDirective, { descendants: true }) items!: QueryList<NzTabNavItemDirective>;

  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex(): number {
    return this.keyManager ? this.keyManager.activeItemIndex! : 0;
  }

  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value: number) {
    if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
      return;
    }

    this.keyManager.setActiveItem(value);
  }

  get showAddButton(): boolean {
    return this.hiddenItems.length === 0 && this.addable;
  }

  translate: null | string = null;
  transformX = 0;
  transformY = 0;
  pingLeft = false;
  pingRight = false;
  pingTop = false;
  pingBottom = false;
  hiddenItems: NzTabNavItemDirective[] = [];

  private keyManager!: FocusKeyManager<NzTabNavItemDirective>;
  private _selectedIndex = 0;
  private wrapperWidth = 0;
  private wrapperHeight = 0;
  private scrollListWidth = 0;
  private scrollListHeight = 0;
  private operationWidth = 0;
  private operationHeight = 0;
  private addButtonWidth = 0;
  private addButtonHeight = 0;
  private selectedIndexChanged = false;
  private lockAnimationTimeoutId?: ReturnType<typeof setTimeout>;
  private cssTransformTimeWaitingId?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.lockAnimationTimeoutId);
      clearTimeout(this.cssTransformTimeWaitingId);
    });
  }

  ngAfterViewInit(): void {
    const dirChange = this.dir ? this.dir.change.asObservable() : of(null);
    const resize = this.viewportRuler.change(150);

    const realign = (): void => {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
    };
    this.keyManager = new FocusKeyManager<NzTabNavItemDirective>(this.items)
      .withHorizontalOrientation(this.getLayoutDirection())
      .withWrap();
    this.keyManager.updateActiveItem(this.selectedIndex);

    requestAnimationFrame(realign);

    merge(this.nzResizeObserver.observe(this.navWrapRef), this.nzResizeObserver.observe(this.navListRef))
      .pipe(takeUntilDestroyed(this.destroyRef), auditTime(16, RESIZE_SCHEDULER))
      .subscribe(() => {
        realign();
      });
    merge(dirChange, resize, this.items.changes)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        Promise.resolve().then(realign);
        this.keyManager.withHorizontalOrientation(this.getLayoutDirection());
      });

    this.keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(newFocusIndex => {
      this.indexFocused.emit(newFocusIndex);
      this.scrollToTab(this.keyManager.activeItem!);
    });
  }

  ngAfterContentChecked(): void {
    if (this.selectedIndexChanged) {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
      this.cdr.markForCheck();
    }
  }

  onSelectedFromMenu(tab: NzTabNavItemDirective): void {
    const tabIndex = this.items.toArray().findIndex(e => e === tab);
    if (tabIndex !== -1) {
      this.keyManager.updateActiveItem(tabIndex);
      if (this.focusIndex !== this.selectedIndex) {
        this.selectFocusedIndex.emit(this.focusIndex);
        this.scrollToTab(tab);
      }
    }
  }

  onOffsetChange(e: NzTabScrollListOffsetEvent): void {
    if (this.position === 'horizontal') {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformX >= 0 && e.x > 0) {
          return;
        }
        if (this.transformX <= this.wrapperWidth - this.scrollListWidth && e.x < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformX = this.clampTransformX(this.transformX + e.x);
      this.setTransform(this.transformX, 0);
    } else {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformY >= 0 && e.y > 0) {
          return;
        }
        if (this.transformY <= this.wrapperHeight - this.scrollListHeight && e.y < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformY = this.clampTransformY(this.transformY + e.y);
      this.setTransform(0, this.transformY);
    }

    this.lockAnimation();
    this.setVisibleRange();
    this.setPingStatus();
  }

  handleKeydown(event: KeyboardEvent): void {
    const inNavigationList = this.navWrapRef.nativeElement.contains(event.target as HTMLElement);
    if (hasModifierKey(event) || !inNavigationList) {
      return;
    }

    switch (event.keyCode) {
      case LEFT_ARROW:
      case UP_ARROW:
      case RIGHT_ARROW:
      case DOWN_ARROW:
        this.lockAnimation();
        this.keyManager.onKeydown(event);
        break;
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          this.selectFocusedIndex.emit(this.focusIndex);
        }
        break;
      default:
        this.keyManager.onKeydown(event);
    }
  }

  private isValidIndex(index: number): boolean {
    if (!this.items) {
      return true;
    }

    const tab = this.items ? this.items.toArray()[index] : null;
    return !!tab && !tab.disabled;
  }

  private scrollToTab(tab: NzTabNavItemDirective): void {
    if (!this.items.find(e => e === tab)) {
      return;
    }
    const tabs = this.items.toArray();

    if (this.position === 'horizontal') {
      let newTransform = this.transformX;
      if (this.getLayoutDirection() === 'rtl') {
        const right = tabs[0].left + tabs[0].width - tab.left - tab.width;

        if (right < this.transformX) {
          newTransform = right;
        } else if (right + tab.width > this.transformX + this.wrapperWidth) {
          newTransform = right + tab.width - this.wrapperWidth;
        }
      } else if (tab.left < -this.transformX) {
        newTransform = -tab.left;
      } else if (tab.left + tab.width > -this.transformX + this.wrapperWidth) {
        newTransform = -(tab.left + tab.width - this.wrapperWidth);
      }
      this.transformX = newTransform;
      this.transformY = 0;
      this.setTransform(newTransform, 0);
    } else {
      let newTransform = this.transformY;

      if (tab.top < -this.transformY) {
        newTransform = -tab.top;
      } else if (tab.top + tab.height > -this.transformY + this.wrapperHeight) {
        newTransform = -(tab.top + tab.height - this.wrapperHeight);
      }
      this.transformY = newTransform;
      this.transformX = 0;
      this.setTransform(0, newTransform);
    }

    clearTimeout(this.cssTransformTimeWaitingId);
    this.cssTransformTimeWaitingId = setTimeout(() => {
      this.setVisibleRange();
    }, CSS_TRANSFORM_TIME);
  }

  private lockAnimation(): void {
    if (!this.lockAnimationTimeoutId) {
      this.ngZone.runOutsideAngular(() => {
        this.navListRef.nativeElement.style.transition = 'none';
        this.lockAnimationTimeoutId = setTimeout(() => {
          this.navListRef.nativeElement.style.transition = '';
          this.lockAnimationTimeoutId = undefined;
        }, CSS_TRANSFORM_TIME);
      });
    }
  }

  private setTransform(x: number, y: number): void {
    this.navListRef.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }

  private clampTransformX(transform: number): number {
    const scrollWidth = this.wrapperWidth - this.scrollListWidth;
    if (this.getLayoutDirection() === 'rtl') {
      return Math.max(Math.min(scrollWidth, transform), 0);
    } else {
      return Math.min(Math.max(scrollWidth, transform), 0);
    }
  }

  private clampTransformY(transform: number): number {
    return Math.min(Math.max(this.wrapperHeight - this.scrollListHeight, transform), 0);
  }

  private updateScrollListPosition(): void {
    this.resetSizes();
    this.transformX = this.clampTransformX(this.transformX);
    this.transformY = this.clampTransformY(this.transformY);
    this.setVisibleRange();
    this.setPingStatus();
    if (this.keyManager) {
      this.keyManager.updateActiveItem(this.keyManager.activeItemIndex!);
      if (this.keyManager.activeItem) {
        this.scrollToTab(this.keyManager.activeItem);
      }
    }
  }

  private resetSizes(): void {
    this.addButtonWidth = this.addBtnRef ? this.addBtnRef.getElementWidth() : 0;
    this.addButtonHeight = this.addBtnRef ? this.addBtnRef.getElementHeight() : 0;
    this.operationWidth = this.operationRef.getElementWidth();
    this.operationHeight = this.operationRef.getElementHeight();
    this.wrapperWidth = this.navWrapRef.nativeElement.offsetWidth || 0;
    this.wrapperHeight = this.navWrapRef.nativeElement.offsetHeight || 0;
    this.scrollListHeight = this.navListRef.nativeElement.offsetHeight || 0;
    this.scrollListWidth = this.navListRef.nativeElement.offsetWidth || 0;
  }

  private alignInkBarToSelectedTab(): void {
    const selectedItem = this.items && this.items.length ? this.items.toArray()[this.selectedIndex] : null;
    const selectedItemElement = selectedItem ? selectedItem.elementRef.nativeElement : null;

    if (selectedItemElement) {
      /**
       * .ant-tabs-nav-list - Target offset parent element
       *   └──.ant-tabs-tab
       *        └──.ant-tabs-tab-btn - Currently focused element
       */
      this.inkBar.alignToElement(selectedItemElement.parentElement!);
    }
  }

  private setPingStatus(): void {
    const ping = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    const navWrap = this.navWrapRef.nativeElement;
    if (this.position === 'horizontal') {
      if (this.getLayoutDirection() === 'rtl') {
        ping.right = this.transformX > 0;
        ping.left = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        ping.left = this.transformX < 0;
        ping.right = -this.transformX + this.wrapperWidth < this.scrollListWidth;
      }
    } else {
      ping.top = this.transformY < 0;
      ping.bottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }

    (Object.keys(ping) as Array<'top' | 'right' | 'bottom' | 'left'>).forEach(pos => {
      const className = `ant-tabs-nav-wrap-ping-${pos}`;
      if (ping[pos]) {
        navWrap.classList.add(className);
      } else {
        navWrap.classList.remove(className);
      }
    });
  }

  private setVisibleRange(): void {
    let unit: 'width' | 'height';
    let position: 'left' | 'top' | 'right';
    let transformSize: number;
    let basicSize: number;
    let tabContentSize: number;
    let addSize: number;
    const tabs = this.items.toArray();
    const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

    const getOffset = (index: number): number => {
      let offset: number;
      const size = tabs[index] || DEFAULT_SIZE;
      if (position === 'right') {
        offset = tabs[0].left + tabs[0].width - tabs[index].left - tabs[index].width;
      } else {
        offset = size[position];
      }
      return offset;
    };

    if (this.position === 'horizontal') {
      unit = 'width';
      basicSize = this.wrapperWidth;
      tabContentSize = this.scrollListWidth - (this.hiddenItems.length ? this.operationWidth : 0);
      addSize = this.addButtonWidth;
      transformSize = Math.abs(this.transformX);
      if (this.getLayoutDirection() === 'rtl') {
        position = 'right';
        this.pingRight = this.transformX > 0;
        this.pingLeft = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        this.pingLeft = this.transformX < 0;
        this.pingRight = -this.transformX + this.wrapperWidth < this.scrollListWidth;
        position = 'left';
      }
    } else {
      unit = 'height';
      basicSize = this.wrapperHeight;
      tabContentSize = this.scrollListHeight - (this.hiddenItems.length ? this.operationHeight : 0);
      addSize = this.addButtonHeight;
      position = 'top';
      transformSize = -this.transformY;
      this.pingTop = this.transformY < 0;
      this.pingBottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }

    let mergedBasicSize = basicSize;
    if (tabContentSize + addSize > basicSize) {
      mergedBasicSize = basicSize - addSize;
    }

    if (!tabs.length) {
      this.hiddenItems = [];
      this.cdr.markForCheck();
      return;
    }

    const len = tabs.length;
    let endIndex = len;
    for (let i = 0; i < len; i += 1) {
      const offset = getOffset(i);
      const size = tabs[i] || DEFAULT_SIZE;
      if (offset + size[unit] > transformSize + mergedBasicSize) {
        endIndex = i - 1;
        break;
      }
    }

    let startIndex = 0;
    for (let i = len - 1; i >= 0; i -= 1) {
      const offset = getOffset(i);
      if (offset < transformSize) {
        startIndex = i + 1;
        break;
      }
    }

    const startHiddenTabs = tabs.slice(0, startIndex);
    const endHiddenTabs = tabs.slice(endIndex + 1);
    this.hiddenItems = [...startHiddenTabs, ...endHiddenTabs];
    this.cdr.markForCheck();
  }

  private getLayoutDirection(): Direction {
    return this.dir && this.dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { position } = changes;
    // The first will be aligning in ngAfterViewInit
    if (position && !position.isFirstChange()) {
      this.alignInkBarToSelectedTab();
      this.lockAnimation();
      this.updateScrollListPosition();
    }
  }
}
