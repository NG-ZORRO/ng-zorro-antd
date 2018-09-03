/** get some code from https://github.com/angular/material2 */

import { DOCUMENT } from '@angular/common';
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
  Inject,
  Injector,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util/check';
import { toNumber, InputBoolean } from '../core/util/convert';

import { RouterModuleNotImportedError } from '../core/error/error';
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

export type NzTabPosition = 'top' | 'bottom' | 'left' | 'right';
export type NzTabPositionMode = 'horizontal' | 'vertical';
export type NzTabType = 'line' | 'card';
export type NzTabSize = 'large' | 'default' | 'small';

export const NZ_ROUTE_DATA_TABS = 'tabs';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-tabset',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  templateUrl        : './nz-tabset.component.html',
  host               : {
    '(scroll)': 'onScroll($event)'
  },
  styles             : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzTabSetComponent implements AfterContentInit, AfterContentChecked, AfterViewInit, OnInit, OnChanges, OnDestroy {
  @ContentChildren(NzTabComponent) tabComponents: QueryList<NzTabComponent>;
  @ViewChild(NzTabsNavComponent) nzTabsNavComponent: NzTabsNavComponent;
  @ViewChild('tabContent') tabContent: ElementRef;

  @Input() nzHideAll = false;
  @Input() nzTabBarExtraContent: TemplateRef<void>;
  @Input() nzTabBarGutter: number;
  @Input() nzTabBarStyle: { [ key: string ]: string };
  @Input() nzQueryParam: string;
  @Input() nzShowPagination = true;
  @Input() nzSize: NzTabSize = 'default';

  /** Set `true` to enable router linked tabs. */
  @Input() @InputBoolean() nzEnableRoute: boolean = false;

  @Input()
  get nzAnimated(): NzAnimatedInterface | boolean { return this._animated; }
  set nzAnimated(value: NzAnimatedInterface | boolean) {
    this._animated = value;
    this.inkBarAnimated = (this.nzAnimated === true) || ((this.nzAnimated as NzAnimatedInterface).inkBar === true);
    this.tabPaneAnimated = (this.nzAnimated === true) || ((this.nzAnimated as NzAnimatedInterface).tabPane === true);
  }
  inkBarAnimated = true;
  tabPaneAnimated = true;
  private _animated: NzAnimatedInterface | boolean = true;

  @Input()
  get nzSelectedIndex(): number | null { return this._selectedIndex; }
  set nzSelectedIndex(value: number | null) { this._indexToSelect = toNumber(value, null); }
  private _indexToSelect: number | null = 0;
  private _selectedIndex: number | null = null;

  @Input()
  get nzTabPosition(): NzTabPosition { return this._tabPosition; }
  set nzTabPosition(value: NzTabPosition) {
    if (this._tabPosition !== value) {
      this._tabPosition = value;
      this.tabPositionMode = this._tabPosition === 'top' || this._tabPosition === 'bottom' ? 'horizontal' : 'vertical';
      this.setPosition(value);
    }
  }
  tabPositionMode: NzTabPositionMode = 'horizontal';
  private _tabPosition: NzTabPosition = 'top';

  @Input()
  get nzType(): NzTabType { return this._type; }
  set nzType(value: NzTabType) {
    if (this._type !== value) {
      this._type = value;
      this.nzAnimated = this._type === 'card';
    }
  }
  private _type: NzTabType = 'line';

  @Output() readonly nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);
  @Output() readonly nzOnNextClick = new EventEmitter<void>();
  @Output() readonly nzOnPrevClick = new EventEmitter<void>();
  @Output() get(): Observable<number> {
    return this.nzSelectChange.pipe(map(event => event.index));
  }

  el: HTMLElement;
  prefixCls = 'ant-tabs';
  isViewInit = false;

  private unsubscribe$ = new Subject();

  setPosition(value: NzTabPosition): void {
    if (this.isViewInit) {
      if (value === 'bottom') {
        this.renderer.insertBefore(this.el, this.tabContent.nativeElement, this.nzTabsNavComponent.elementRef.nativeElement);
      } else {
        this.renderer.insertBefore(this.el, this.nzTabsNavComponent.elementRef.nativeElement, this.tabContent.nativeElement);
      }
    }
  }

  setClassMap(): void {
    const classMap = {
      [ this.prefixCls ]                           : true,
      [ `${this.prefixCls}-vertical` ]             : (this.nzTabPosition === 'left') || (this.nzTabPosition === 'right'),
      [ `${this.prefixCls}-${this.nzTabPosition}` ]: this.nzTabPosition,
      [ `${this.prefixCls}-no-animation` ]         : (this.nzAnimated === false) || ((this.nzAnimated as NzAnimatedInterface).tabPane === false),
      [ `${this.prefixCls}-${this.nzType}` ]       : this.nzType,
      [ `${this.prefixCls}-large` ]                : this.nzSize === 'large',
      [ `${this.prefixCls}-small` ]                : this.nzSize === 'small'
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  onLabelClick(index: number, disabled: boolean): void {
    if (!disabled) {
      const tabs = this.tabComponents.toArray();
      this.nzSelectedIndex = index;
      tabs[ index ].nzClick.emit();
      if (this.nzEnableRoute) {
        this.navigate(index);
      }
    }
  }

  createChangeEvent(index: number): NzTabChangeEvent {
    const tabs = this.tabComponents.toArray();
    const event = new NzTabChangeEvent();
    event.index = index;
    if (tabs && tabs.length) {
      event.tab = tabs[ index ];
      tabs.forEach((item, i) => {
        if (i !== index) { item.nzDeselect.emit(); }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  // From https://github.com/react-component/tabs/blob/master/src/Tabs.js
  // Prevent focus to make the Tabs scroll offset
  onScroll($event: Event): void {
    const target: Element = $event.target as Element;
    if (target.scrollLeft > 0) {
      target.scrollLeft = 0;
      if (this.document && this.document.activeElement) {
        (this.document.activeElement as HTMLElement).blur();
      }
    }
  }

  navigate(index: number): void {
    const router: Router = this.injector.get(Router);
    const activatedRoute: ActivatedRoute = this.injector.get(ActivatedRoute);
    const pathOrParam = this.tabComponents[ index ].nzPathOrParam;

    if (this.nzQueryParam) {
      this.ngZone.run(() => {
        router.navigate([ '.' ], {
          queryParams        : { [ `${this.nzQueryParam}` ]: pathOrParam || null },
          relativeTo         : activatedRoute,
          queryParamsHandling: 'merge',
          preserveFragment   : true
        }).then();
      });
    } else {
      this.ngZone.run(() => {
        if (pathOrParam) {
          router.navigate([ '.', pathOrParam ], {
            relativeTo: activatedRoute
          }).then();
        }
      });
    }
  }

  private addRouteLink(): void {
    try {
      const activatedRoute = this.injector.get(ActivatedRoute);
      const router = this.injector.get(Router);

      if (this.nzQueryParam) {
        activatedRoute.queryParamMap.pipe(
          takeUntil(this.unsubscribe$),
          map(params => params.get(this.nzQueryParam))
        ).subscribe(data => {
          this.nzSelectedIndex = this.tabComponents.toArray()
            .map(component => component.nzPathOrParam)
            .findIndex(nav => !data ? !nav : data === nav);
        });
      } else {
        router.events.pipe(
          takeUntil(this.unsubscribe$),
          filter(e => e instanceof NavigationEnd)
        ).subscribe(() => {
          const data = activatedRoute.snapshot.firstChild.data[ NZ_ROUTE_DATA_TABS ];
          this.nzSelectedIndex = this.tabComponents.toArray()
            .map(component => component.nzPathOrParam)
            .findIndex(nav => !data ? !nav : data === nav);
        });
      }
    } catch (e) {
      throw RouterModuleNotImportedError('router linked tabs');
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private elementRef: ElementRef,
    private injector: Injector,
    private ngZone: NgZone,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) private document: any
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAnimated || changes.nzType || changes.nzTabPosition || changes.nzSize) {
      this.setClassMap();
    }
  }

  ngAfterContentInit(): void {
    if (this.nzEnableRoute) {
      this.addRouteLink();
    }
  }

  ngAfterContentChecked(): void {
    // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
    // ensures that values like NaN can't get through and which would otherwise throw the
    // component into an infinite loop (since Math.max(NaN, 0) === NaN).
    const indexToSelect = this._indexToSelect =
      Math.min(this.tabComponents.length - 1, Math.max(this._indexToSelect || 0, 0));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && isNotNil(this._selectedIndex)) {
      this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.tabComponents.forEach((tab: NzTabComponent, index: number) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (isNotNil(this._selectedIndex) && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });

    if (this._selectedIndex !== indexToSelect) {
      this._selectedIndex = indexToSelect;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
    this.setPosition(this.nzTabPosition);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
