/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** get some code from https://github.com/angular/material2 */

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
  OnChanges,
  OnDestroy,
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
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { BooleanInput, NumberInput, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, toNumber, wrapIntoObservable } from 'ng-zorro-antd/core/util';

import { merge, Subject, Subscription } from 'rxjs';
import { filter, first, startWith, takeUntil } from 'rxjs/operators';
import { NzTabComponent } from './tab.component';
import { NzAnimatedInterface, NzTabChangeEvent, NzTabPosition, NzTabPositionMode, NzTabsCanDeactivateFn, NzTabType } from './table.types';
import { NzTabsNavComponent } from './tabs-nav.component';

const NZ_CONFIG_COMPONENT_NAME = 'tabs';

@Component({
  selector: 'nz-tabset',
  exportAs: 'nzTabset',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="listOfNzTabComponent">
      <nz-tabs-nav
        role="tablist"
        tabindex="0"
        [nzSize]="nzSize"
        [nzTabPosition]="nzTabPosition"
        [nzType]="nzType"
        [nzShowPagination]="nzShowPagination"
        [nzPositionMode]="tabPositionMode"
        [nzAnimated]="inkBarAnimated"
        [ngStyle]="nzTabBarStyle"
        [nzHideBar]="nzHideAll"
        [nzTabBarExtraContent]="nzTabBarExtraContent"
        [selectedIndex]="nzSelectedIndex!"
        (nzOnNextClick)="nzOnNextClick.emit()"
        (nzOnPrevClick)="nzOnPrevClick.emit()"
      >
        <div
          nz-tab-label
          role="tab"
          [style.margin-right.px]="nzTabBarGutter"
          [class.ant-tabs-tab-active]="nzSelectedIndex == i && !nzHideAll"
          [disabled]="tab.nzDisabled"
          (click)="clickLabel(i, tab.nzDisabled)"
          *ngFor="let tab of listOfNzTabComponent; let i = index"
        >
          <ng-container *nzStringTemplateOutlet="tab.nzTitle || tab.title">{{ tab.nzTitle }}</ng-container>
        </div>
      </nz-tabs-nav>
      <div
        #tabContent
        class="ant-tabs-content"
        [class.ant-tabs-top-content]="nzTabPosition === 'top'"
        [class.ant-tabs-bottom-content]="nzTabPosition === 'bottom'"
        [class.ant-tabs-left-content]="nzTabPosition === 'left'"
        [class.ant-tabs-right-content]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
        [class.ant-tabs-card-content]="nzType === 'card'"
        [class.ant-tabs-content-no-animated]="!tabPaneAnimated"
        [style.margin-left.%]="tabPositionMode === 'horizontal' && tabPaneAnimated && -(nzSelectedIndex || 0) * 100"
      >
        <div
          nz-tab-body
          class="ant-tabs-tabpane"
          *ngFor="let tab of listOfNzTabComponent; let i = index"
          [active]="nzSelectedIndex == i && !nzHideAll"
          [forceRender]="tab.nzForceRender"
          [content]="tab.template || tab.content"
        ></div>
      </div>
    </ng-container>
  `,
  host: {
    '[class.ant-tabs]': `true`,
    '[class.ant-tabs-no-animation]': `isAnimationDisabled`,
    '[class.ant-tabs-line]': `nzType === 'line'`,
    '[class.ant-tabs-card]': `nzType === 'card'`,
    '[class.ant-tabs-top]': `nzTabPosition === 'top'`,
    '[class.ant-tabs-bottom]': `nzTabPosition === 'bottom'`,
    '[class.ant-tabs-left]': `nzTabPosition === 'left'`,
    '[class.ant-tabs-right]': `nzTabPosition === 'right'`,
    '[class.ant-tabs-vertical]': `nzTabPosition === 'left' || nzTabPosition === 'right'`,
    '[class.ant-tabs-large]': `nzSize === 'large'`,
    '[class.ant-tabs-small]': `nzSize === 'small'`
  }
})
export class NzTabSetComponent implements AfterContentChecked, OnChanges, AfterContentInit, OnDestroy {
  static ngAcceptInputType_nzLinkRouter: BooleanInput;
  static ngAcceptInputType_nzLinkExact: BooleanInput;
  static ngAcceptInputType_nzSelectedIndex: NumberInput;

  private indexToSelect: number | null = 0;
  private el: HTMLElement = this.elementRef.nativeElement;
  private _selectedIndex: number | null = null;
  /** Subscription to tabs being added/removed. */
  private tabsSubscription = Subscription.EMPTY;
  /** Subscription to changes in the tab labels. */
  private tabLabelSubscription = Subscription.EMPTY;
  private destroy$ = new Subject<void>();
  tabPositionMode: NzTabPositionMode = 'horizontal';
  @ContentChildren(NzTabComponent) listOfNzTabComponent!: QueryList<NzTabComponent>;
  @ViewChild(NzTabsNavComponent, { static: false }) nzTabsNavComponent?: NzTabsNavComponent;
  @ViewChild('tabContent', { static: false }) tabContent?: ElementRef;

  @Input() nzTabBarExtraContent?: TemplateRef<void>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzShowPagination: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzAnimated: NzAnimatedInterface | boolean = true;
  @Input() nzHideAll = false;
  @Input() nzTabPosition: NzTabPosition = 'top';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSize: NzSizeLDSType = 'default';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzTabBarGutter?: number = undefined;
  @Input() nzTabBarStyle: { [key: string]: string } | null = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzType: NzTabType = 'line';

  @Input() @InputBoolean() nzLinkRouter = false;
  @Input() @InputBoolean() nzLinkExact = true;
  @Input() nzCanDeactivate: NzTabsCanDeactivateFn | null = null;

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

  get isAnimationDisabled(): boolean {
    return this.nzAnimated === false || (this.nzAnimated as NzAnimatedInterface).tabPane === false;
  }

  setPosition(value: NzTabPosition): void {
    if (this.tabContent) {
      if (value === 'bottom') {
        this.renderer.insertBefore(this.el, this.tabContent.nativeElement, this.nzTabsNavComponent!.elementRef.nativeElement);
      } else {
        this.renderer.insertBefore(this.el, this.nzTabsNavComponent!.elementRef.nativeElement, this.tabContent.nativeElement);
      }
    }
  }

  clickLabel(index: number, disabled: boolean): void {
    if (!disabled) {
      if (this.nzSelectedIndex !== null && this.nzSelectedIndex !== index && typeof this.nzCanDeactivate === 'function') {
        const observable = wrapIntoObservable(this.nzCanDeactivate(this.nzSelectedIndex, index));
        observable.pipe(first(), takeUntil(this.destroy$)).subscribe(canChange => canChange && this.emitClickEvent(index));
      } else {
        this.emitClickEvent(index);
      }
    }
  }

  private emitClickEvent(index: number): void {
    const tabs = this.listOfNzTabComponent.toArray();
    this.nzSelectedIndex = index;
    tabs[index].nzClick.emit();
    this.cdr.markForCheck();
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
    this.tabLabelSubscription = merge(...this.listOfNzTabComponent.map(tab => tab.stateChanges)).subscribe(() => this.cdr.markForCheck());
  }

  constructor(
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTabPosition, nzType } = changes;
    if (nzTabPosition) {
      if (this.nzTabPosition === 'top' || this.nzTabPosition === 'bottom') {
        this.tabPositionMode = 'horizontal';
      } else {
        this.tabPositionMode = 'vertical';
      }
      this.setPosition(this.nzTabPosition);
    }
    if (nzType) {
      if (this.nzType === 'card') {
        this.nzAnimated = false;
      }
    }
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
