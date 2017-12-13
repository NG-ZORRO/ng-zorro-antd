import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { toBoolean } from '../util/convert';
import { NzMenuComponent } from './nz-menu.component';

@Component({
  selector  : '[nz-submenu]',
  animations: [
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
      ])
    ])
  ],
  template  : `
    <div
      [class.ant-dropdown-menu-submenu-title]="isInDropDown"
      [class.ant-menu-submenu-title]="!isInDropDown"
      (mouseenter)="onMouseEnterEvent($event)"
      (mouseleave)="onMouseLeaveEvent($event)"
      (click)="clickSubMenuTitle()"
      [style.paddingLeft.px]="(nzMenuComponent.nzMode === 'inline')?(level*24):null">
      <ng-content select="[title]"></ng-content>
    </div>
    <ul
      [class.ant-dropdown-menu]="isInDropDown"
      [@expandAnimation]="expandState"
      [class.ant-menu]="!isInDropDown"
      [class.ant-dropdown-menu-vertical]="isInDropDown"
      [class.ant-menu-vertical]="(!isInDropDown)&&(nzMenuComponent.nzMode!=='inline')"
      [class.ant-menu-inline]="(!isInDropDown)&&(nzMenuComponent.nzMode==='inline')"
      [class.ant-dropdown-menu-sub]="isInDropDown"
      [class.ant-menu-sub]="!isInDropDown"
      *ngIf="nzOpen"
      (click)="clickSubMenuDropDown()"
      (mouseleave)="onMouseLeaveEvent($event)"
      (mouseenter)="onMouseEnterEvent($event)">
      <ng-content></ng-content>
    </ul>
  `,
})

export class NzSubMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  private _open = false;
  isInDropDown = false;
  level = 1;
  _$mouseSubject = new Subject();
  @ContentChildren(NzSubMenuComponent) subMenus;
  @Output() nzOpenChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  set nzOpen(value: boolean) {
    this._open = toBoolean(value);
  }

  get nzOpen(): boolean {
    return this._open;
  }

  get subItemSelected(): boolean {
    return !!this.nzMenuComponent.menuItems.find(e => e.nzSelected && e.nzSubMenuComponent === this);
  }

  get submenuSelected(): boolean {
    return !!this.subMenus._results.find(e => e !== this && e.subItemSelected);
  }

  get expandState(): string {
    if (this.nzOpen && this.nzMenuComponent.nzMode === 'inline') {
      return 'expand';
    } else if (this.nzOpen && this.nzMenuComponent.nzMode !== 'inline') {
      return 'fade';
    }
    return null;
  }

  clickSubMenuTitle(): void {
    if ((this.nzMenuComponent.nzMode === 'inline') && (!this.isInDropDown)) {
      this.nzOpen = !this.nzOpen;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  clickSubMenuDropDown(): void {
    if (this.isInDropDown || (this.nzMenuComponent.nzMode === 'vertical') || (this.nzMenuComponent.nzMode === 'horizontal')) {
      this._$mouseSubject.next(false);
      this.nzOpen = false;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  @HostListener('mouseenter', [ '$event' ])
  onMouseEnterEvent(e: MouseEvent): void {
    if ((this.nzMenuComponent.nzMode === 'horizontal') || (this.nzMenuComponent.nzMode === 'vertical') || this.isInDropDown) {
      this._$mouseSubject.next(true);
    }
  }

  @HostListener('mouseleave', [ '$event' ])
  onMouseLeaveEvent(e: MouseEvent): void {
    if ((this.nzMenuComponent.nzMode === 'horizontal') || (this.nzMenuComponent.nzMode === 'vertical') || this.isInDropDown) {
      this._$mouseSubject.next(false);
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
    return this.isInDropDown && (this.nzMenuComponent.nzMode === 'vertical');
  }

  @HostBinding('class.ant-dropdown-menu-submenu-horizontal')
  get setDropDownHorizontalClass(): boolean {
    return this.isInDropDown && (this.nzMenuComponent.nzMode === 'horizontal');
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
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'vertical');
  }

  @HostBinding('class.ant-menu-submenu-horizontal')
  get setMenuHorizontalClass(): boolean {
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-submenu-inline')
  get setMenuInlineClass(): boolean {
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'inline');
  }

  constructor(public nzMenuComponent: NzMenuComponent, public cd: ChangeDetectorRef) {
    this.nzMenuComponent.setHasSubMenu(true);
    this.nzMenuComponent.subMenus.push(this);
  }

  ngAfterViewInit(): void {
    this.isInDropDown = this.nzMenuComponent.isInDropDown;
    if (this.subMenus.length && (this.nzMenuComponent.nzMode === 'inline')) {
      this.subMenus.filter(x => x !== this).forEach(menu => {
        setTimeout(_ => {
          menu.level = this.level + 1;
        });
      });
    }
  }

  ngOnInit(): void {
    this._$mouseSubject.pipe(debounceTime(300)).subscribe((data: boolean) => {
      if (this.nzOpen !== data) {
        this.nzOpen = data;
        this.nzOpenChange.emit(this.nzOpen);
      }
    });
  }

  ngOnDestroy(): void {
    this._$mouseSubject.unsubscribe();
  }
}
