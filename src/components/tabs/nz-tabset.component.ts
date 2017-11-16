/** code from https://github.com/angular/material2 */

import {
  Component,
  OnInit,
  Output,
  ElementRef,
  ViewEncapsulation,
  Input,
  AfterContentChecked,
  AfterViewInit,
  EventEmitter,
  Renderer2,
  ContentChild,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzTabComponent } from './nz-tab.component';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

export interface NzAnimatedInterface {
  inkBar: boolean,
  tabPane: boolean
}

export class NzTabChangeEvent {
  index: number;
  tab: NzTabComponent;
}

export type NzTabPosition = 'top' | 'bottom' | 'left' | 'right';
export type NzTabPositionMode = 'horizontal' | 'vertical';
export type NzTabType = 'line' | 'card';

@Component({
  selector     : 'nz-tabset',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [ngClass]="_classMap" #hostContent>
      <nz-tabs-nav
        #tabNav
        [nzSize]="nzSize"
        [nzType]="nzType"
        [nzShowPagination]="nzShowPagination"
        [nzPositionMode]="_tabPositionMode"
        [nzAnimated]="inkBarAnimated"
        [nzHideBar]="nzHide"
        [selectedIndex]="nzSelectedIndex">
        <ng-template #tabBarExtraContent>
          <ng-template [ngTemplateOutlet]="nzTabBarExtraTemplate || nzTabBarExtraContent"></ng-template>
        </ng-template>
        <div
          nz-tab-label
          [class.ant-tabs-tab-active]="(nzSelectedIndex == i)&&!nzHide"
          [disabled]="tab.disabled"
          (click)="clickLabel(i)"
          *ngFor="let tab of _tabs; let i = index">
          <ng-template [ngTemplateOutlet]="tab._tabHeading"></ng-template>
        </div>
      </nz-tabs-nav>
      <div class="ant-tabs-content"
        #tabContent
        [class.ant-tabs-content-animated]="tabPaneAnimated"
        [class.ant-tabs-content-no-animated]="!tabPaneAnimated"
        [style.margin-left.%]="tabPaneAnimated&&(-nzSelectedIndex*100)">
        <nz-tab-body
          class="ant-tabs-tabpane"
          [class.ant-tabs-tabpane-active]="(nzSelectedIndex == i)&&!nzHide"
          [class.ant-tabs-tabpane-inactive]="(nzSelectedIndex != i)||nzHide"
          [content]="tab.content"
          *ngFor="let tab of _tabs; let i = index">
        </nz-tab-body>
      </div>
    </div>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzTabSetComponent implements AfterContentChecked, OnInit, AfterViewInit {
  _el;
  _classMap;
  _prefixCls = 'ant-tabs';
  _width;
  _tabPosition: NzTabPosition = 'top';
  _tabPositionMode: NzTabPositionMode = 'horizontal';
  _indexToSelect: number | null = 0;
  _selectedIndex: number | null = null;
  _isViewInit = false;
  _tabs: Array<NzTabComponent> = [];
  @Input() nzTabBarExtraTemplate: TemplateRef<any>;
  @ContentChild('nzTabBarExtraContent') nzTabBarExtraContent: TemplateRef<any>;
  @ViewChild('tabNav') _tabNav: NzTabsNavComponent;
  @ViewChild('tabContent') _tabContent: ElementRef;
  @ViewChild('hostContent') _hostContent: ElementRef;
  @Input() nzAnimated: NzAnimatedInterface | boolean = true;
  @Input() nzShowPagination = true;
  @Input() nzHide = false;

  @Input()
  set nzSelectedIndex(value: number | null) {
    this._indexToSelect = value;
  }

  get nzSelectedIndex(): number | null {
    return this._selectedIndex;
  }

  @Output()
  get nzSelectedIndexChange(): Observable<number> {
    return this.nzSelectChange.pipe(map(event => event.index));
  }

  @Output() nzSelectChange: EventEmitter<NzTabChangeEvent> = new EventEmitter<NzTabChangeEvent>(true);


  @Input() nzSize = 'default';
  _type: NzTabType = 'line';
  tabs: Array<NzTabComponent> = [];

  @Input()
  get nzTabPosition() {
    return this._tabPosition;
  };

  set nzTabPosition(value) {
    if (this._tabPosition === value) {
      return;
    }
    this._tabPosition = value;
    if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
      this._tabPositionMode = 'horizontal'
    } else {
      this._tabPositionMode = 'vertical';
    }
    this._setPosition(value);
    this._setClassMap();
  }

  @Input()
  get nzType(): NzTabType {
    return this._type;
  }

  set nzType(value: NzTabType) {
    if (this._type === value) {
      return;
    }
    this._type = value;
    if (this._type === 'card') {
      this.nzAnimated = false;
    }
    this._setClassMap();
  }

  _setPosition(value) {
    if (this._isViewInit) {
      if (value === 'bottom') {
        this._renderer.insertBefore(this._hostContent.nativeElement, this._tabContent.nativeElement, this._tabNav._elementRef.nativeElement);
      } else {
        this._renderer.insertBefore(this._hostContent.nativeElement, this._tabNav._elementRef.nativeElement, this._tabContent.nativeElement);
      }
    }

  }

  _setClassMap(): void {
    this._classMap = {
      [this._prefixCls]                          : true,
      [`${this._prefixCls}-vertical`]            : (this._tabPosition === 'left') || (this._tabPosition === 'right'),
      [`${this._prefixCls}-${this._tabPosition}`]: this._tabPosition,
      [`${this._prefixCls}-no-animation`]        : (this.nzAnimated === false) || ((<NzAnimatedInterface>this.nzAnimated).tabPane === false),
      [`${this._prefixCls}-${this._type}`]       : this._type,
      [`${this._prefixCls}-mini`]                : (this.nzSize === 'small')
    };
  }

  clickLabel(index) {
    this.nzSelectedIndex = index;
    this._tabs[ index ].nzClick.emit();
  }

  ngOnInit() {
    this._setClassMap();
  }

  ngAfterContentChecked(): void {
    // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
    // ensures that values like NaN can't get through and which would otherwise throw the
    // component into an infinite loop (since Math.max(NaN, 0) === NaN).
    const indexToSelect = this._indexToSelect =
      Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
      this.nzSelectChange.emit(this._createChangeEvent(indexToSelect));
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: NzTabComponent, index: number) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    this._selectedIndex = indexToSelect;
  }

  ngAfterViewInit() {
    this._isViewInit = true;
    this._setPosition(this._tabPosition);
  }

  private _createChangeEvent(index: number): NzTabChangeEvent {
    const event = new NzTabChangeEvent;
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs[ index ];
      this._tabs.forEach((item, i) => {
        if (i !== index) {
          item.nzDeselect.emit();
        }
      });
      event.tab.nzSelect.emit();
    }
    return event;
  }

  get inkBarAnimated() {
    return (this.nzAnimated === true) || ((<NzAnimatedInterface>this.nzAnimated).inkBar === true);
  }

  get tabPaneAnimated() {
    return (this.nzAnimated === true) || ((<NzAnimatedInterface>this.nzAnimated).tabPane === true);
  }

  constructor(private _renderer: Renderer2) {
  }
}
