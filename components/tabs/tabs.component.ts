/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** get some code from https://github.com/angular/material2 */

import { A11yModule } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChildren,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  forwardRef,
  HOST_TAG_NAME,
  inject,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { merge, Observable, of, Subscription } from 'rxjs';
import { delay, filter, first, startWith } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX, warn } from 'ng-zorro-antd/core/logger';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { wrapIntoObservable } from 'ng-zorro-antd/core/util';

import {
  NzAnimatedInterface,
  NzTabChangeEvent,
  NzTabPosition,
  NzTabPositionMode,
  NzTabsCanDeactivateFn,
  NzTabScrollEvent,
  NzTabType
} from './interfaces';
import { NzTabBarExtraContentDirective } from './tab-bar-extra-content.directive';
import { NzTabBodyComponent } from './tab-body.component';
import { NzTabCloseButtonComponent } from './tab-close-button.component';
import { NzTabLinkDirective } from './tab-link.directive';
import { NzTabNavBarComponent } from './tab-nav-bar.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NZ_TAB_SET, NzTabComponent } from './tab.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'tabs';

let nextId = 0;

@Component({
  selector: 'nz-tabs,nz-tabset',
  exportAs: 'nzTabs',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NZ_TAB_SET,
      useExisting: forwardRef(() => NzTabsComponent)
    }
  ],
  template: `
    @if (tabs.length || addable) {
      <nz-tabs-nav
        [style]="nzTabBarStyle"
        [selectedIndex]="nzSelectedIndex || 0"
        [inkBarAnimated]="inkBarAnimated"
        [addable]="addable"
        [addIcon]="nzAddIcon"
        [hideBar]="nzHideAll"
        [position]="position"
        [extraTemplate]="nzTabBarExtraContent"
        [extraContents]="extraContents()"
        (tabScroll)="nzTabListScroll.emit($event)"
        (selectFocusedIndex)="setSelectedIndex($event)"
        (addClicked)="onAdd()"
      >
        @for (tab of tabs; track tab; let i = $index) {
          <div
            class="ant-tabs-tab"
            [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
            [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
            [class.ant-tabs-tab-active]="nzSelectedIndex === i"
            [class.ant-tabs-tab-disabled]="tab.nzDisabled"
            (click)="clickNavItem(tab, i, $event)"
            (contextmenu)="contextmenuNavItem(tab, $event)"
          >
            <button
              type="button"
              role="tab"
              [id]="getTabContentId(i)"
              [attr.tabIndex]="getTabIndex(tab, i)"
              [attr.aria-disabled]="tab.nzDisabled"
              [attr.aria-selected]="nzSelectedIndex === i && !nzHideAll"
              [attr.aria-controls]="getTabContentId(i)"
              [disabled]="tab.nzDisabled"
              [tab]="tab"
              [active]="nzSelectedIndex === i"
              class="ant-tabs-tab-btn"
              nzTabNavItem
              cdkMonitorElementFocus
            >
              <ng-container *nzStringTemplateOutlet="tab.label; context: { visible: true }">
                {{ tab.label }}
              </ng-container>
              @if (tab.nzClosable && closable && !tab.nzDisabled) {
                <button
                  type="button"
                  nz-tab-close-button
                  [closeIcon]="tab.nzCloseIcon"
                  (click)="onClose(i, $event)"
                ></button>
              }
            </button>
          </div>
        }
      </nz-tabs-nav>
    }
    <div class="ant-tabs-content-holder">
      <div
        class="ant-tabs-content"
        [class.ant-tabs-content-top]="nzTabPosition === 'top'"
        [class.ant-tabs-content-bottom]="nzTabPosition === 'bottom'"
        [class.ant-tabs-content-left]="nzTabPosition === 'left'"
        [class.ant-tabs-content-right]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
      >
        @if (!nzHideAll) {
          @for (tab of tabs; track tab; let i = $index) {
            @if (tab.nzForceRender) {
              <ng-template [ngTemplateOutlet]="tabpaneTmpl"></ng-template>
            } @else if (nzDestroyInactiveTabPane) {
              @if (nzSelectedIndex === i) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl"></ng-template>
              }
            } @else {
              @if (nzSelectedIndex === i || tab.hasBeenActive) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl"></ng-template>
              }
            }

            <ng-template #tabpaneTmpl>
              <div
                role="tabpanel"
                [id]="getTabContentId(i)"
                [attr.aria-labelledby]="getTabContentId(i)"
                nz-tab-body
                [active]="nzSelectedIndex === i"
                [content]="tab.content"
                [animated]="tabPaneAnimated"
              ></div>
            </ng-template>
          }
        }
      </div>
    </div>
  `,
  host: {
    class: 'ant-tabs',
    '[class.ant-tabs-card]': `nzType === 'card' || nzType === 'editable-card'`,
    '[class.ant-tabs-editable]': `nzType === 'editable-card'`,
    '[class.ant-tabs-editable-card]': `nzType === 'editable-card'`,
    '[class.ant-tabs-centered]': `nzCentered`,
    '[class.ant-tabs-rtl]': `dir === 'rtl'`,
    '[class.ant-tabs-top]': `nzTabPosition === 'top'`,
    '[class.ant-tabs-bottom]': `nzTabPosition === 'bottom'`,
    '[class.ant-tabs-left]': `nzTabPosition === 'left'`,
    '[class.ant-tabs-right]': `nzTabPosition === 'right'`,
    '[class.ant-tabs-default]': `nzSize === 'default'`,
    '[class.ant-tabs-small]': `nzSize === 'small'`,
    '[class.ant-tabs-large]': `nzSize === 'large'`
  },
  imports: [
    NzTabNavBarComponent,
    NgTemplateOutlet,
    NzTabNavItemDirective,
    A11yModule,
    NzOutletModule,
    NzTabCloseButtonComponent,
    NzTabBodyComponent
  ]
})
export class NzTabsComponent implements OnInit, AfterContentChecked, AfterContentInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  public nzConfigService = inject(NzConfigService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Input()
  get nzSelectedIndex(): number | null {
    return this.selectedIndex;
  }
  set nzSelectedIndex(value: null | number) {
    this.indexToSelect = coerceNumberProperty(value, null);
  }
  @Input() nzTabPosition: NzTabPosition = 'top';
  @Input() nzTabBarExtraContent?: TemplateRef<void>;
  @Input() nzCanDeactivate: NzTabsCanDeactivateFn | null = null;
  @Input() nzAddIcon: string | TemplateRef<NzSafeAny> = 'plus';
  @Input() nzTabBarStyle: Record<string, string> | null = null;
  @Input() @WithConfig() nzType: NzTabType = 'line';
  @Input() @WithConfig() nzSize: NzSizeLDSType = 'default';
  @Input() @WithConfig() nzAnimated: NzAnimatedInterface | boolean = true;
  @Input() @WithConfig() nzTabBarGutter?: number = undefined;
  @Input({ transform: booleanAttribute }) nzHideAdd: boolean = false;
  @Input({ transform: booleanAttribute }) nzCentered: boolean = false;
  @Input({ transform: booleanAttribute }) nzHideAll = false;
  @Input({ transform: booleanAttribute }) nzLinkRouter = false;
  @Input({ transform: booleanAttribute }) nzLinkExact = true;
  @Input({ transform: booleanAttribute }) nzDestroyInactiveTabPane = false;

  @Output() readonly nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);
  @Output() readonly nzSelectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly nzTabListScroll = new EventEmitter<NzTabScrollEvent>();
  @Output() readonly nzClose = new EventEmitter<{ index: number }>();
  @Output() readonly nzAdd = new EventEmitter<void>();

  get position(): NzTabPositionMode {
    return ['top', 'bottom'].indexOf(this.nzTabPosition) === -1 ? 'vertical' : 'horizontal';
  }

  get addable(): boolean {
    return this.nzType === 'editable-card' && !this.nzHideAdd;
  }

  get closable(): boolean {
    return this.nzType === 'editable-card';
  }

  get line(): boolean {
    return this.nzType === 'line';
  }

  get inkBarAnimated(): boolean {
    return this.line && (typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.inkBar);
  }

  get tabPaneAnimated(): boolean {
    return typeof this.nzAnimated === 'boolean' ? this.nzAnimated : this.nzAnimated.tabPane;
  }

  // Pick up only direct descendants under ivy rendering engine
  // We filter out only the tabs that belong to this tab set in `tabs`.
  @ContentChildren(NzTabComponent, { descendants: true })
  allTabs: QueryList<NzTabComponent> = new QueryList<NzTabComponent>();

  @ContentChildren(NzTabLinkDirective, { descendants: true })
  tabLinks: QueryList<NzTabLinkDirective> = new QueryList<NzTabLinkDirective>();
  @ViewChild(NzTabNavBarComponent, { static: false }) tabNavBarRef!: NzTabNavBarComponent;
  // All the direct tabs for this tab set
  tabs: QueryList<NzTabComponent> = new QueryList<NzTabComponent>();

  readonly extraContents = contentChildren(NzTabBarExtraContentDirective);

  dir: Direction = 'ltr';
  private readonly tabSetId!: number;
  private indexToSelect: number | null = 0;
  private selectedIndex: number | null = null;
  private tabLabelSubscription = Subscription.EMPTY;
  private canDeactivateSubscription = Subscription.EMPTY;
  private router = inject(Router, { optional: true });

  constructor() {
    this.tabSetId = nextId++;

    // TODO: Remove this warning in 21.0.0
    if (inject(HOST_TAG_NAME) === 'nz-tabset') {
      warn(`${PREFIX} <nz-tabset> is deprecated, please use <nz-tabs> instead.`);
    }

    this.destroyRef.onDestroy(() => {
      this.tabs.destroy();
      this.tabLabelSubscription.unsubscribe();
      this.canDeactivateSubscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngAfterContentInit(): void {
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => this.setUpRouter());
    });

    this.subscribeToTabLabels();
    this.subscribeToAllTabChanges();

    // Subscribe to changes of the number of tabs, to be
    // able to re-render the content as new tabs are added or removed.
    this.tabs.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const indexToSelect = this.clampTabIndex(this.indexToSelect);

      // Maintain the previously selected tab if a new tab is added or removed, and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this.selectedIndex) {
        const tabs = this.tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `indexToSelect` and `selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `nzSelectedIndexChange` event.
            this.indexToSelect = this.selectedIndex = i;
            break;
          }
        }
      }
      this.subscribeToTabLabels();
      this.cdr.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));

    // If there is a change in the selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this.selectedIndex !== indexToSelect) {
      const isFirstRun = this.selectedIndex == null;

      if (!isFirstRun) {
        this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this.tabs.forEach((tab, index) => tab.setActive(index === indexToSelect));

        if (!isFirstRun) {
          this.nzSelectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Set up the position for each tab and optionally set up an origin on the next selected tab.
    this.tabs.forEach((tab, index) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this.selectedIndex;
      }
    });

    if (this.selectedIndex !== indexToSelect) {
      this.selectedIndex = indexToSelect;
      this.cdr.markForCheck();
    }
  }

  onClose(index: number, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.nzClose.emit({ index });
  }

  onAdd(): void {
    this.nzAdd.emit();
  }

  private clampTabIndex(index: number | null): number {
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }

  private createChangeEvent(index: number): NzTabChangeEvent {
    const event = new NzTabChangeEvent();
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
      this.tabs.forEach((tab, i) => {
        if (i !== index) {
          tab.nzDeselect.emit();
        }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }

    this.tabLabelSubscription = merge(...this.tabs.map(tab => tab.stateChanges)).subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  private subscribeToAllTabChanges(): void {
    this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs: QueryList<NzTabComponent>) => {
      this.tabs.reset(tabs.filter(tab => tab.closestTabSet === this));
      this.tabs.notifyOnChanges();
    });
  }

  canDeactivateFun(pre: number, next: number): Observable<boolean> {
    if (typeof this.nzCanDeactivate === 'function') {
      const observable = wrapIntoObservable(this.nzCanDeactivate(pre, next));
      return observable.pipe(first(), takeUntilDestroyed(this.destroyRef));
    } else {
      return of(true);
    }
  }

  clickNavItem(tab: NzTabComponent, index: number, e: MouseEvent): void {
    if (!tab.nzDisabled) {
      // ignore nzCanDeactivate
      tab.nzClick.emit();
      if (!this.isRouterLinkClickEvent(index, e)) {
        this.setSelectedIndex(index);
      }
    }
  }

  private isRouterLinkClickEvent(index: number, event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    if (this.nzLinkRouter) {
      return !!this.tabs.toArray()[index]?.linkDirective?.elementRef.nativeElement.contains(target);
    } else {
      return false;
    }
  }

  contextmenuNavItem(tab: NzTabComponent, e: MouseEvent): void {
    if (!tab.nzDisabled) {
      // ignore nzCanDeactivate
      tab.nzContextmenu.emit(e);
    }
  }

  setSelectedIndex(index: number): void {
    this.canDeactivateSubscription.unsubscribe();
    this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex!, index).subscribe(can => {
      if (can) {
        this.nzSelectedIndex = index;
        this.tabNavBarRef.focusIndex = index;
        this.cdr.markForCheck();
      }
    });
  }

  getTabIndex(tab: NzTabComponent, index: number): number | null {
    if (tab.nzDisabled) {
      return null;
    }
    return this.selectedIndex === index ? 0 : -1;
  }

  getTabContentId(i: number): string {
    return `nz-tabs-${this.tabSetId}-tab-${i}`;
  }

  private setUpRouter(): void {
    if (this.nzLinkRouter) {
      if (!this.router) {
        throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
      }
      merge(this.router.events.pipe(filter(e => e instanceof NavigationEnd)), this.tabLinks.changes)
        .pipe(startWith(true), delay(0), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
    }
  }

  private updateRouterActive(): void {
    if (this.router?.navigated) {
      const index = this.findShouldActiveTabIndex();
      if (index !== this.selectedIndex) {
        this.setSelectedIndex(index);
      }
      Promise.resolve().then(() => (this.nzHideAll = index === -1));
    }
  }

  private findShouldActiveTabIndex(): number {
    const tabs = this.tabs.toArray();
    const isActive = this.isLinkActive(this.router);

    return tabs.findIndex(tab => {
      const c = tab.linkDirective;
      return c ? isActive(c.routerLink) : false;
    });
  }

  private isLinkActive(router: Router | null): (link?: RouterLink | null) => boolean {
    return (link?: RouterLink | null) =>
      link
        ? !!router?.isActive(link.urlTree || '', {
            paths: this.nzLinkExact ? 'exact' : 'subset',
            queryParams: this.nzLinkExact ? 'exact' : 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored'
          })
        : false;
  }
}

/**
 * @deprecated Use `NzTabsComponent` instead. This will be removed in 21.0.0.
 */
export const NzTabSetComponent = NzTabsComponent;
