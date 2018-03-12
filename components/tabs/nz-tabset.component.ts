/** get some code from https://github.com/angular/material2 */

import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util/check';
import { toNumber } from '../core/util/convert';

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

@Component({
  selector           : 'nz-tabset',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  template           : `
    <div nz-tabs-nav
      role="tablist"
      tabindex="0"
      [nzType]="nzType"
      [nzShowPagination]="nzShowPagination"
      [nzPositionMode]="tabPositionMode"
      [nzAnimated]="inkBarAnimated"
      [ngStyle]="nzTabBarStyle"
      [nzHideBar]="nzHideAll"
      [nzTabBarExtraContent]="nzTabBarExtraContent"
      [selectedIndex]="nzSelectedIndex"
      (nzOnNextClick)="nzOnNextClick.emit()"
      (nzOnPrevClick)="nzOnPrevClick.emit()">
      <div
        nz-tab-label
        role="tab"
        [style.margin-right.px]="nzTabBarGutter"
        [class.ant-tabs-tab-active]="(nzSelectedIndex == i) && !nzHideAll"
        [disabled]="tab.nzDisabled"
        (click)="clickLabel(i,tab.nzDisabled)"
        *ngFor="let tab of listOfNzTabComponent; let i = index">
        <ng-container *ngIf="tab.isTitleString; else titleTemplate">{{ tab.nzTitle }}</ng-container>
        <ng-template #titleTemplate>
          <ng-template [ngTemplateOutlet]="tab.nzTitle"></ng-template>
        </ng-template>
      </div>
    </div>
    <div
      class="ant-tabs-content"
      #tabContent
      [class.ant-tabs-content-animated]="tabPaneAnimated"
      [class.ant-tabs-content-no-animated]="!tabPaneAnimated"
      [style.margin-left.%]="tabPaneAnimated&&(-nzSelectedIndex*100)">
      <div nz-tab-body
        class="ant-tabs-tabpane"
        [class.ant-tabs-tabpane-active]="(nzSelectedIndex == i) && !nzHideAll"
        [class.ant-tabs-tabpane-inactive]="(nzSelectedIndex != i) || nzHideAll"
        [content]="tab.content"
        *ngFor="let tab of listOfNzTabComponent; let i = index">
      </div>
    </div>`,
  styles             : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzTabSetComponent implements AfterContentChecked, OnInit, AfterViewInit {
  private _tabPosition: NzTabPosition = 'top';
  private _indexToSelect: number | null = 0;
  private _selectedIndex: number | null = null;
  private _type: NzTabType = 'line';
  private _size = 'default';
  private _animated: NzAnimatedInterface | boolean = true;
  el: HTMLElement;
  prefixCls = 'ant-tabs';
  tabPositionMode: NzTabPositionMode = 'horizontal';
  inkBarAnimated = true;
  tabPaneAnimated = true;
  isViewInit = false;
  listOfNzTabComponent: NzTabComponent[] = [];
  @Input() nzTabBarExtraContent: TemplateRef<void>;
  @ViewChild(NzTabsNavComponent) nzTabsNavComponent: NzTabsNavComponent;
  @ViewChild('tabContent') tabContent: ElementRef;
  @Input() nzShowPagination = true;
  @Input() nzHideAll = false;
  @Input() nzTabBarGutter: number;
  @Input() nzTabBarStyle: { [key: string]: string };
  @Output() nzOnNextClick = new EventEmitter<void>();
  @Output() nzOnPrevClick = new EventEmitter<void>();

  @Input()
  set nzAnimated(value: NzAnimatedInterface | boolean) {
    this._animated = value;
    this.setClassMap();
    this.inkBarAnimated = (this.nzAnimated === true) || ((this.nzAnimated as NzAnimatedInterface).inkBar === true);
    this.tabPaneAnimated = (this.nzAnimated === true) || ((this.nzAnimated as NzAnimatedInterface).tabPane === true);
  }

  get nzAnimated(): NzAnimatedInterface | boolean {
    return this._animated;
  }

  @Input()
  set nzSelectedIndex(value: number | null) {
    this._indexToSelect = toNumber(value, null);
  }

  get nzSelectedIndex(): number | null {
    return this._selectedIndex;
  }

  @Output()
  get nzSelectedIndexChange(): Observable<number> {
    return this.nzSelectChange.pipe(map(event => event.index));
  }

  @Output() nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);

  @Input() set nzSize(value: string) {
    this._size = value;
    this.setClassMap();
  }

  get nzSize(): string {
    return this._size;
  }

  @Input()
  set nzTabPosition(value: NzTabPosition) {
    if (this._tabPosition === value) {
      return;
    }
    this._tabPosition = value;
    if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
      this.tabPositionMode = 'horizontal';
    } else {
      this.tabPositionMode = 'vertical';
    }
    this.setPosition(value);
    this.setClassMap();
  }

  get nzTabPosition(): NzTabPosition {
    return this._tabPosition;
  }

  @Input()
  set nzType(value: NzTabType) {
    if (this._type === value) {
      return;
    }
    this._type = value;
    if (this._type === 'card') {
      this.nzAnimated = false;
    }
    this.setClassMap();
  }

  get nzType(): NzTabType {
    return this._type;
  }

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

  clickLabel(index: number, disabled: boolean): void {
    if (!disabled) {
      this.nzSelectedIndex = index;
      this.listOfNzTabComponent[ index ].nzClick.emit();
    }
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngAfterContentChecked(): void {
    // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
    // ensures that values like NaN can't get through and which would otherwise throw the
    // component into an infinite loop (since Math.max(NaN, 0) === NaN).
    const indexToSelect = this._indexToSelect =
      Math.min(this.listOfNzTabComponent.length - 1, Math.max(this._indexToSelect || 0, 0));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && isNotNil(this._selectedIndex)) {
      this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.listOfNzTabComponent.forEach((tab: NzTabComponent, index: number) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (isNotNil(this._selectedIndex) && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    this._selectedIndex = indexToSelect;
  }

  createChangeEvent(index: number): NzTabChangeEvent {
    const event = new NzTabChangeEvent();
    event.index = index;
    if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
      event.tab = this.listOfNzTabComponent[ index ];
      this.listOfNzTabComponent.forEach((item, i) => {
        if (i !== index) {
          item.nzDeselect.emit();
        }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  addTab(value: NzTabComponent): void {
    this.listOfNzTabComponent.push(value);
  }

  removeTab(value: NzTabComponent): void {
    this.listOfNzTabComponent.splice(this.listOfNzTabComponent.indexOf(value), 1);
  }

  constructor(private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService, private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
    this.setPosition(this.nzTabPosition);
  }

}
