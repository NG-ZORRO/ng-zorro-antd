import {
  Component, OnInit, OnDestroy, HostBinding, HostListener, ContentChildren, AfterViewInit,
  Input, Output, EventEmitter, ChangeDetectorRef
} from '@angular/core';
import { style, animate, state, transition, trigger } from '@angular/animations';
import { NzMenuComponent } from './nz-menu.component';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';

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
  isInDropDown = false;
  level = 1;
  _$mouseSubject = new Subject();
  @ContentChildren(NzSubMenuComponent) subMenus;
  @Input() nzOpen = false;
  @Output() nzOpenChange: EventEmitter<boolean> = new EventEmitter();

  get subItemSelected(): boolean {
    return !!this.nzMenuComponent.menuItems.find(e => e.selected && e.nzSubMenuComponent === this);
  }

  get submenuSelected(): boolean {
    return !!this.subMenus._results.find(e => e !== this && e.subItemSelected)
  }

  get expandState() {
    if (this.nzOpen && this.nzMenuComponent.nzMode === 'inline') {
      return 'expand';
    } else if (this.nzOpen && this.nzMenuComponent.nzMode !== 'inline') {
      return 'fade'
    }
    return null;
  }

  clickSubMenuTitle() {
    if ((this.nzMenuComponent.nzMode === 'inline') && (!this.isInDropDown)) {
      this.nzOpen = !this.nzOpen;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  clickSubMenuDropDown() {
    if (this.isInDropDown || (this.nzMenuComponent.nzMode === 'vertical') || (this.nzMenuComponent.nzMode === 'horizontal')) {
      this._$mouseSubject.next(false);
      this.nzOpen = false;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  @HostListener('mouseenter', [ '$event' ])
  onMouseEnterEvent(e) {
    if ((this.nzMenuComponent.nzMode === 'horizontal') || (this.nzMenuComponent.nzMode === 'vertical') || this.isInDropDown) {
      this._$mouseSubject.next(true);
    }
  }

  @HostListener('mouseleave', [ '$event' ])
  onMouseLeaveEvent(e) {
    if ((this.nzMenuComponent.nzMode === 'horizontal') || (this.nzMenuComponent.nzMode === 'vertical') || this.isInDropDown) {
      this._$mouseSubject.next(false);
    }
  }

  @HostBinding('class.ant-dropdown-menu-submenu')
  get setDropDownSubmenuClass() {
    return this.isInDropDown;
  }

  @HostBinding('class.ant-menu-submenu-open')
  get setMenuSubmenuOpenClass() {
    return (!this.isInDropDown) && (this.nzOpen);
  }

  @HostBinding('class.ant-dropdown-menu-submenu-vertical')
  get setDropDownVerticalClass() {
    return this.isInDropDown && (this.nzMenuComponent.nzMode === 'vertical');
  }

  @HostBinding('class.ant-dropdown-menu-submenu-horizontal')
  get setDropDownHorizontalClass() {
    return this.isInDropDown && (this.nzMenuComponent.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-submenu')
  get setMenuSubmenuClass() {
    return !this.isInDropDown;
  }

  @HostBinding('class.ant-menu-submenu-selected')
  get setMenuSubmenuSelectedClass() {
    return this.submenuSelected || this.subItemSelected;
  }

  @HostBinding('class.ant-menu-submenu-vertical')
  get setMenuVerticalClass() {
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'vertical');
  }

  @HostBinding('class.ant-menu-submenu-horizontal')
  get setMenuHorizontalClass() {
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'horizontal');
  }

  @HostBinding('class.ant-menu-submenu-inline')
  get setMenuInlineClass() {
    return (!this.isInDropDown) && (this.nzMenuComponent.nzMode === 'inline');
  }


  constructor(public nzMenuComponent: NzMenuComponent, public cd: ChangeDetectorRef) {
    this.nzMenuComponent.setHasSubMenu(true);
    this.nzMenuComponent.subMenus.push(this);
  }

  ngAfterViewInit() {
    this.isInDropDown = this.nzMenuComponent.isInDropDown;
    if (this.subMenus.length && (this.nzMenuComponent.nzMode === 'inline')) {
      this.subMenus.filter(x => x !== this).forEach(menu => {
        setTimeout(_ => {
          menu.level = this.level + 1;
        });
      });
    }
  }

  ngOnInit() {
    this._$mouseSubject.pipe(debounceTime(300)).subscribe((data: boolean) => {
      if (this.nzOpen !== data) {
        this.nzOpen = data;
        this.nzOpenChange.emit(this.nzOpen);
      }
    });
  }

  ngOnDestroy() {
    this._$mouseSubject.unsubscribe();
  }
}
