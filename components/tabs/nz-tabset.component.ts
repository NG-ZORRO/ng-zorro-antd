/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** get some code from https://github.com/angular/material2 */

import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { merge, Subject, Subscription } from 'rxjs';

import {
  toNumber,
  InputBoolean,
  NzConfigService,
  NzFourDirectionType,
  NzSizeLDSType,
  NzUpdateHostClassService,
  PREFIX,
  WithConfig
} from 'ng-zorro-antd/core';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { NzTabComponent } from './nz-tab.component';
import { NzTabsNavComponent } from './nz-tabs-nav.component';

export interface NzAnimatedInterface {
  inkBar: boolean;
  tabPane: boolean;
}

export class NzTabChangeEvent {
  index: number;
  tab: NzTabComponent;
}

export type NzTabPosition = NzFourDirectionType;
export type NzTabPositionMode = 'horizontal' | 'vertical';
export type NzTabType = 'line' | 'card';

const NZ_CONFIG_COMPONENT_NAME = 'tabs';

@Component({
  selector: 'nz-tabset',
  exportAs: 'nzTabset',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzUpdateHostClassService],
  templateUrl: './nz-tabset.component.html',
  styles: [
    `
      nz-tabset {
        display: block;
      }
    `
  ]
})
export class NzTabSetComponent
  implements AfterContentChecked, OnInit, AfterViewInit, OnChanges, AfterContentInit, OnDestroy {
  private indexToSelect: number | null = 0;
  private el: HTMLElement = this.elementRef.nativeElement;
  private _selectedIndex: number | null = null;
  /** Subscription to tabs being added/removed. */
  private tabsSubscription = Subscription.EMPTY;
  /** Subscription to changes in the tab labels. */
  private tabLabelSubscription = Subscription.EMPTY;

  private destroy$ = new Subject<void>();

  tabPositionMode: NzTabPositionMode = 'horizontal';
  @ContentChildren(NzTabComponent) listOfNzTabComponent: QueryList<NzTabComponent>;
  @ViewChild(NzTabsNavComponent, { static: false }) nzTabsNavComponent: NzTabsNavComponent;
  @ViewChild('tabContent', { static: false }) tabContent: ElementRef;

  @Input() nzTabBarExtraContent: TemplateRef<void>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) nzShowPagination: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) nzAnimated: NzAnimatedInterface | boolean;
  @Input() nzHideAll = false;
  @Input() nzTabPosition: NzTabPosition = 'top';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeLDSType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzTabBarGutter: number;
  @Input() nzTabBarStyle: { [key: string]: string };
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'line') nzType: NzTabType;

  @Input() @InputBoolean() nzLinkRouter = false;
  @Input() @InputBoolean() nzLinkExact = true;

  @Output() readonly nzOnNextClick = new EventEmitter<void>();
  @Output() readonly nzOnPrevClick = new EventEmitter<void>();
  @Output() readonly nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);
  @Output() readonly nzSelectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set nzSelectedIndex(value: number | null) {
    this.indexToSelect = value ? toNumber(value, null) : null;
  }

  get nzSelectedIndex(): number | null {
    return this._selectedIndex;
  }

  get inkBarAnimated(): boolean {
    return this.nzAnimated === true || (this.nzAnimated as NzAnimatedInterface).inkBar === true;
  }

  get tabPaneAnimated(): boolean {
    return this.nzAnimated === true || (this.nzAnimated as NzAnimatedInterface).tabPane === true;
  }

  setPosition(value: NzTabPosition): void {
    if (this.tabContent) {
      if (value === 'bottom') {
        this.renderer.insertBefore(
          this.el,
          this.tabContent.nativeElement,
          this.nzTabsNavComponent.elementRef.nativeElement
        );
      } else {
        this.renderer.insertBefore(
          this.el,
          this.nzTabsNavComponent.elementRef.nativeElement,
          this.tabContent.nativeElement
        );
      }
    }
  }

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [`ant-tabs`]: true,
      [`ant-tabs-vertical`]: this.nzTabPosition === 'left' || this.nzTabPosition === 'right',
      [`ant-tabs-${this.nzTabPosition}`]: this.nzTabPosition,
      [`ant-tabs-no-animation`]:
        this.nzAnimated === false || (this.nzAnimated as NzAnimatedInterface).tabPane === false,
      [`ant-tabs-${this.nzType}`]: this.nzType,
      [`ant-tabs-large`]: this.nzSize === 'large',
      [`ant-tabs-small`]: this.nzSize === 'small'
    });
  }

  clickLabel(index: number, disabled: boolean): void {
    if (!disabled) {
      const tabs = this.listOfNzTabComponent.toArray();
      this.nzSelectedIndex = index;
      tabs[index].nzClick.emit();
    }
  }

  createChangeEvent(index: number): NzTabChangeEvent {
    const event = new NzTabChangeEvent();
    event.index = index;
    if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
      event.tab = this.listOfNzTabComponent.toArray()[index];
      this.listOfNzTabComponent.forEach((item, i) => {
        if (i !== index) {
          item.nzDeselect.emit();
        }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this.listOfNzTabComponent.length - 1, Math.max(index || 0, 0));
  }

  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }
    this.tabLabelSubscription = merge(...this.listOfNzTabComponent.map(tab => tab.stateChanges)).subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  constructor(
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTabPosition) {
      if (this.nzTabPosition === 'top' || this.nzTabPosition === 'bottom') {
        this.tabPositionMode = 'horizontal';
      } else {
        this.tabPositionMode = 'vertical';
      }
      this.setPosition(this.nzTabPosition);
    }
    if (changes.nzType) {
      if (this.nzType === 'card') {
        this.nzAnimated = false;
      }
    }
    if (changes.nzSize || changes.nzAnimated || changes.nzTabPosition || changes.nzType) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngAfterContentChecked(): void {
    if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
      // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
      // the amount of tabs changes before the actual change detection runs.
      const indexToSelect = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));
      // If there is a change in selected index, emit a change event. Should not trigger if
      // the selected index has not yet been initialized.
      if (this._selectedIndex !== indexToSelect) {
        const isFirstRun = this._selectedIndex == null;
        if (!isFirstRun) {
          this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
        }

        // Changing these values after change detection has run
        // since the checked content may contain references to them.
        Promise.resolve().then(() => {
          this.listOfNzTabComponent.forEach((tab, index) => (tab.isActive = index === indexToSelect));

          if (!isFirstRun) {
            this.nzSelectedIndexChange.emit(indexToSelect);
          }
        });
      }

      // Setup the position for each tab and optionally setup an origin on the next selected tab.
      this.listOfNzTabComponent.forEach((tab: NzTabComponent, index: number) => {
        tab.position = index - indexToSelect;

        // If there is already a selected tab, then set up an origin for the next selected tab
        // if it doesn't have one already.
        if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
          tab.origin = indexToSelect - this._selectedIndex;
        }
      });

      if (this._selectedIndex !== indexToSelect) {
        this._selectedIndex = indexToSelect;
        this.cdr.markForCheck();
      }
    }
  }

  ngAfterContentInit(): void {
    this.subscribeToTabLabels();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabsSubscription = this.listOfNzTabComponent.changes.subscribe(() => {
      const indexToSelect = this.clampTabIndex(this.indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        const tabs = this.listOfNzTabComponent.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `selectedIndexChange` event.
            this.indexToSelect = this._selectedIndex = i;
            break;
          }
        }
      }

      this.subscribeToTabLabels();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.tabsSubscription.unsubscribe();
    this.tabLabelSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.setPosition(this.nzTabPosition);

    if (this.nzLinkRouter) {
      if (!this.router) {
        throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
      }

      this.router.events
        .pipe(
          takeUntil(this.destroy$),
          filter(e => e instanceof NavigationEnd),
          startWith(true)
        )
        .subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
    }
  }

  private updateRouterActive(): void {
    if (this.router.navigated) {
      const index = this.findShouldActiveTabIndex();
      if (index !== this._selectedIndex) {
        this.nzSelectedIndex = index;
        this.nzSelectedIndexChange.emit(index);
      }
      this.nzHideAll = index === -1;
    }
  }

  private findShouldActiveTabIndex(): number {
    const tabs = this.listOfNzTabComponent.toArray();
    const isActive = this.isLinkActive(this.router);

    return tabs.findIndex(tab => {
      const c = tab.linkDirective;
      return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
    });
  }

  private isLinkActive(router: Router): (link?: RouterLink | RouterLinkWithHref) => boolean {
    return (link?: RouterLink | RouterLinkWithHref) => (link ? router.isActive(link.urlTree, this.nzLinkExact) : false);
  }
}
