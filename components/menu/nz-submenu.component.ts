import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewChild
} from '@angular/core';

import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { auditTime, map, takeUntil } from 'rxjs/operators';

import { POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzDropDownButtonComponent } from '../dropdown/nz-dropdown-button.component';
import { NzDropDownComponent } from '../dropdown/nz-dropdown.component';

import { NzMenuDirective } from './nz-menu.directive';

@Component({
  selector           : '[nz-submenu]',
  preserveWhitespaces: false,
  animations         : [
    trigger('expandAnimation', [
      state('expand', style({ height: '*' })),
      state('hidden', style({ height: 0, overflow: 'hidden' })),
      transition('expand => hidden', animate(150)),
      transition('hidden => expand', animate(150)),
      state('fade', style({ opacity: 1 })),
      transition('fade => void', [
        animate(150, style({ opacity: 0 }))
      ]),
      transition('void => fade', [
        style({ opacity: '0' }),
        animate(150)
      ]),
      state('bottom', style({
        opacity        : 1,
        transform      : 'scaleY(1)',
        transformOrigin: '0% 0%'
      })),
      transition('void => bottom', [
        style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }),
        animate('150ms cubic-bezier(0.23, 1, 0.32, 1)')
      ]),
      transition('bottom => void', [
        animate('150ms cubic-bezier(0.23, 1, 0.32, 1)', style({
          opacity        : 0,
          transform      : 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }))
      ])
    ])
  ],
  templateUrl        : './nz-submenu.component.html',
  styles             : [
    `
      .ant-menu-submenu-placement-bottomLeft {
        top: 6px;
        position: relative;
      }

      .ant-menu-submenu-placement-rightTop {
        left: 4px;
        position: relative;
      }

      .ant-menu-submenu-placement-leftTop {
        right: 4px;
        position: relative;
      }
    `
  ]
})

export class NzSubMenuComponent implements OnInit, OnDestroy {
  private _open = false;
  private _disabled = false;
  private $mouseSubject = new Subject<boolean>();
  private unsubscribe$ = new Subject<void>();

  placement = 'rightTop';
  $subOpen = new BehaviorSubject<boolean>(false);
  isInDropDown = false;
  isInSubMenu = false;
  level = 1;
  triggerWidth = null;
  @ContentChildren(NzSubMenuComponent, { descendants: true }) subMenus: QueryList<NzSubMenuComponent>;
  @Output() nzOpenChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkConnectedOverlay) cdkOverlay: CdkConnectedOverlay;
  @ViewChild('trigger') trigger: ElementRef;

  @Input()
  set nzOpen(value: boolean) {
    this._open = toBoolean(value);
    this.setTriggerWidth();
  }

  get nzOpen(): boolean {
    return this._open;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  get subItemSelected(): boolean {
    return !!this.nzMenuDirective.menuItems.find(e => e.nzSelected && e.nzSubMenuComponent === this);
  }

  get submenuSelected(): boolean {
    return !!this.subMenus.toArray().find(e => e !== this && e.subItemSelected);
  }

  get expandState(): string {
    if (this.nzOpen && this.subMenuMode === 'inline') {
      return 'expand';
    } else if (this.nzOpen && this.subMenuMode === 'horizontal') {
      return 'bottom';
    } else if (this.nzOpen && this.subMenuMode === 'vertical') {
      return 'fade';
    } else {
      return 'hidden';
    }
  }

  get overlayPositions(): ConnectionPositionPair[] {
    if (this.subMenuMode === 'horizontal') {
      return [ POSITION_MAP.bottomLeft ];
    } else {
      return [ POSITION_MAP.rightTop, POSITION_MAP.leftTop ];
    }
  }

  clickSubMenuTitle($event: MouseEvent): void {
    if (this.nzDisabled) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }
    if ((this.subMenuMode === 'inline') && (!this.isInDropDown)) {
      this.nzOpen = !this.nzOpen;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  clickSubMenuDropDown(): void {
    if (this.isInDropDown || (this.subMenuMode === 'vertical') || (this.subMenuMode === 'horizontal')) {
      this.$mouseSubject.next(false);
    }
  }

  get subMenuMode(): string {
    if (this.nzMenuDirective.nzMode === 'inline') {
      return 'inline';
    } else if ((this.nzMenuDirective.nzMode === 'vertical') || (this.isInSubMenu)) {
      return 'vertical';
    } else {
      return 'horizontal';
    }
  }

  onMouseEnterEvent(e: MouseEvent): void {
    if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
      this.$mouseSubject.next(true);
    }
  }

  onMouseLeaveEvent(e: MouseEvent): void {
    if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
      this.$mouseSubject.next(false);
    }
  }

  @HostBinding('class.ant-dropdown-menu-submenu')
  get setDropDownSubmenuClass(): boolean {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu-submenu-open')
  get setMenuSubmenuOpenClass(): boolean {
    return (!this.isInDropDown) && (this.nzOpen);
  }

  @HostBinding('class.ant-dropdown-menu-submenu-vertical')
  get setDropDownVerticalClass(): boolean {
    return this.isInDropDown && (this.subMenuMode === 'vertical');
  }

  @HostBinding('class.ant-dropdown-menu-submenu-horizontal')
  get setDropDownHorizontalClass(): boolean {
    return this.isInDropDown && (this.subMenuMode === 'horizontal');
  }

  @HostBinding('class.ant-dropdown-menu-submenu-disabled')
  get setDropDownDisabled(): boolean {
    return this.isInDropDown && this.nzDisabled;
  }

  @HostBinding('class.ant-menu-submenu')
  get setMenuSubmenuClass(): boolean {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-menu-submenu-selected')
  get setMenuSubmenuSelectedClass(): boolean {
    return this.submenuSelected || this.subItemSelected;
  }

  @HostBinding('class.ant-menu-submenu-vertical')
  get setMenuVerticalClass(): boolean {
    return (!this.isInDropDown) && (this.subMenuMode === 'vertical');
  }

  @HostBinding('class.ant-menu-submenu-horizontal')
  get setMenuHorizontalClass(): boolean {
    return (!this.isInDropDown) && (this.subMenuMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-submenu-inline')
  get setMenuInlineClass(): boolean {
    return (!this.isInDropDown) && (this.subMenuMode === 'inline');
  }

  @HostBinding('class.ant-menu-submenu-disabled')
  get setMenuDisabled(): boolean {
    return (!this.isInDropDown) && this.nzDisabled;
  }

  setTriggerWidth(): void {
    if (this.subMenuMode === 'horizontal') {
      this.triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
      /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
      if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
        this.cdkOverlay.overlayRef.updateSize({
          width: this.triggerWidth
        });
      }
    }

  }

  onPositionChange($event: ConnectedOverlayPositionChange): void {
    if ($event.connectionPair) {
      const originMap = {
        originX : $event.connectionPair.originX,
        originY : $event.connectionPair.originY,
        overlayX: $event.connectionPair.overlayX,
        overlayY: $event.connectionPair.overlayY
      };
      const keyList = [ 'originX', 'originY', 'overlayX', 'overlayY' ];
      if (keyList.every(key => originMap[ key ] === POSITION_MAP.leftTop[ key ])) {
        this.placement = 'leftTop';
      } else if (keyList.every(key => originMap[ key ] === POSITION_MAP.rightTop[ key ])) {
        this.placement = 'rightTop';
      }
      this.cd.detectChanges();
    }
  }

  handleOpenEvent = (data: boolean) => {
    if (this.nzDisabled) {
      return;
    }
    if (this.nzOpen !== data) {
      this.nzOpen = data;
      this.nzOpenChange.emit(this.nzOpen);
    }
    if (this.nzSubMenuComponent) {
      this.nzSubMenuComponent.$subOpen.next(this.nzOpen);
    }
    if (this.nzDropDownComponent) {
      this.nzDropDownComponent.$subOpen.next(this.nzOpen);
    }
    if (this.nzDropDownButtonComponent) {
      this.nzDropDownButtonComponent.$subOpen.next(this.nzOpen);
    }
  }

  constructor(public nzMenuDirective: NzMenuDirective, private cd: ChangeDetectorRef, @SkipSelf() @Optional() private nzSubMenuComponent: NzSubMenuComponent, @Host() @Optional() private nzDropDownComponent: NzDropDownComponent, @Host() @Optional() private nzDropDownButtonComponent: NzDropDownButtonComponent) {
  }

  ngOnInit(): void {
    if (this.nzSubMenuComponent) {
      this.level = this.nzSubMenuComponent.level + 1;
      this.isInSubMenu = true;
    }
    this.nzMenuDirective.subMenus.push(this);
    const $combineAll = combineLatest(this.$subOpen, this.$mouseSubject.asObservable()).pipe(map(value => value[ 0 ] || value[ 1 ]), auditTime(150));
    $combineAll.pipe(takeUntil(this.unsubscribe$)).subscribe(this.handleOpenEvent);
    this.isInDropDown = this.nzMenuDirective.nzInDropDown;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
