import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzMenuDirective } from './nz-menu.directive';

@Component({
  selector           : '[nz-submenu]',
  preserveWhitespaces: false,
  animations         : [
    trigger('expandAnimation', [
      state('fade', style({ opacity: 1 })),
      transition('expand => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate(150, style({ height: 0 }))
      ]),
      transition('void => expand', [
        style({ height: 0, overflow: 'hidden' }),
        animate(150, style({ height: '*' }))
      ]),
      transition('fade => void', [
        animate(150, style({ opacity: 0 }))
      ]),
      transition('void => fade', [
        style({ opacity: '0' }),
        animate(150, style({ opacity: 1 }))
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
    ]),
  ],
  template           : `
    <div
      #trigger
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [class.ant-dropdown-menu-submenu-title]="isInDropDown"
      [class.ant-menu-submenu-title]="!isInDropDown"
      (mouseenter)="onMouseEnterEvent($event)"
      (mouseleave)="onMouseLeaveEvent($event)"
      (click)="clickSubMenuTitle()"
      [style.paddingLeft.px]="(nzMenuDirective.nzMode === 'inline')?(level*nzMenuDirective.nzInlineIndent):null">
      <ng-content select="[title]"></ng-content>
      <i [class.ant-dropdown-menu-submenu-arrow]="isInDropDown" [class.ant-menu-submenu-arrow]="!isInDropDown"></i>
    </div>
    <ul
      [class.ant-dropdown-menu]="isInDropDown"
      [@expandAnimation]="expandState"
      [class.ant-menu]="!isInDropDown"
      [class.ant-dropdown-menu-vertical]="isInDropDown"
      [class.ant-menu-inline]="!isInDropDown"
      [class.ant-dropdown-menu-sub]="isInDropDown"
      [class.ant-menu-sub]="!isInDropDown"
      (mouseleave)="onMouseLeaveEvent($event)"
      (mouseenter)="onMouseEnterEvent($event)"
      *ngIf="nzOpen&&(nzMenuDirective.nzMode=='inline')">
      <ng-template *ngTemplateOutlet="subMenuTemplate"></ng-template>
    </ul>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayWidth]="triggerWidth"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayOpen]="nzOpen&&(nzMenuDirective.nzMode!='inline')">
      <div
        class="ant-menu-submenu ant-menu-submenu-popup"
        [class.ant-menu-light]="nzMenuDirective.nzTheme=='light'"
        [class.ant-menu-dark]="nzMenuDirective.nzTheme=='dark'"
        [class.ant-menu-submenu-placement-bottomLeft]="subMenuMode=='horizontal'"
        [class.ant-menu-submenu-placement-rightTop]="(subMenuMode=='vertical')&&(placement=='rightTop')"
        [class.ant-menu-submenu-placement-leftTop]="(subMenuMode=='vertical')&&(placement=='leftTop')"
        [@expandAnimation]="expandState">
        <ul
          [class.ant-dropdown-menu]="isInDropDown"
          [class.ant-menu]="!isInDropDown"
          [class.ant-dropdown-menu-vertical]="isInDropDown"
          [class.ant-menu-vertical]="!isInDropDown"
          [class.ant-dropdown-menu-sub]="isInDropDown"
          [class.ant-menu-sub]="!isInDropDown"
          (mouseleave)="onMouseLeaveEvent($event)"
          (mouseenter)="onMouseEnterEvent($event)">
          <ng-template *ngTemplateOutlet="subMenuTemplate"></ng-template>
        </ul>
      </div>
    </ng-template>
    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})

export class NzSubMenuComponent implements OnInit, OnDestroy, AfterContentInit {
  private _open = false;
  isInDropDown = false;
  level = 1;
  isInSubMenu = false;
  triggerWidth = null;
  $mouseSubject = new Subject();
  placement = 'rightTop';
  @ContentChildren(NzSubMenuComponent, { descendants: true }) subMenus;
  @Output() nzOpenChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;
  @ViewChild('trigger') trigger: ElementRef;

  @Input()
  set nzOpen(value: boolean) {
    this._open = toBoolean(value);
    this.setTriggerWidth();
  }

  get nzOpen(): boolean {
    if (this.subMenuMode === 'inline') {
      return this._open;
    } else {
      return this._open || this.isSubMenuOpen;
    }
  }

  get subItemSelected(): boolean {
    return !!this.nzMenuDirective.menuItems.find(e => e.nzSelected && e.nzSubMenuComponent === this);
  }

  get submenuSelected(): boolean {
    return !!this.subMenus._results.find(e => e !== this && e.subItemSelected);
  }

  get expandState(): string {
    if (this.nzOpen && this.subMenuMode === 'inline') {
      return 'expand';
    } else if (this.nzOpen && this.subMenuMode === 'horizontal') {
      return 'bottom';
    } else if (this.nzOpen && this.subMenuMode === 'vertical') {
      return 'fade';
    }
    return null;
  }

  get overlayPositions(): ConnectionPositionPair[] {
    if (this.subMenuMode === 'horizontal') {
      return [ POSITION_MAP.bottomLeft ];
    } else {
      return [ POSITION_MAP.rightTop, POSITION_MAP.leftTop ];
    }
  }

  get isSubMenuOpen(): boolean {
    return this.subMenus.some(menu => ((menu !== this) && (menu.nzOpen)));
  }

  clickSubMenuTitle(): void {
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

  @HostListener('mouseenter', [ '$event' ])
  onMouseEnterEvent(e: MouseEvent): void {
    if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
      this.$mouseSubject.next(true);
    }
  }

  @HostListener('mouseleave', [ '$event' ])
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

  setTriggerWidth(): void {
    if (this.subMenuMode === 'horizontal') {
      this.triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
      /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
      if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
        this._cdkOverlay.overlayRef.updateSize({
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
      if (JSON.stringify(originMap) === JSON.stringify(POSITION_MAP.leftTop)) {
        this.placement = 'leftTop';
      } else if (JSON.stringify(originMap) === JSON.stringify(POSITION_MAP.rightTop)) {
        this.placement = 'rightTop';
      }
      this.cd.detectChanges();
    }
  }

  constructor(public nzMenuDirective: NzMenuDirective, private cd: ChangeDetectorRef) {
    this.nzMenuDirective.setHasSubMenu(true);
    this.nzMenuDirective.subMenus.push(this);
  }

  ngOnInit(): void {
    this.$mouseSubject.pipe(debounceTime(150)).subscribe((data: boolean) => {
      // TODO reduce dump emit
      this.nzOpen = data;
      this.nzOpenChange.emit(this.nzOpen);
    });
    this.isInDropDown = this.nzMenuDirective.isInDropDown;
  }

  ngAfterContentInit(): void {
    if (this.subMenus && this.subMenus.length) {
      this.subMenus.filter(x => x !== this).forEach(menu => {
        if (this.subMenuMode === 'inline') {
          menu.level = this.level + 1;
        }
        menu.isInSubMenu = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.$mouseSubject.unsubscribe();
  }
}
