/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { combineLatest, merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { getPlacementName, POSITION_MAP, POSITION_TYPE_HORIZONTAL } from 'ng-zorro-antd/core/overlay';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import { NzSubmenuService } from './submenu.service';

const listOfVerticalPositions = [
  POSITION_MAP.rightTop,
  POSITION_MAP.right,
  POSITION_MAP.rightBottom,
  POSITION_MAP.leftTop,
  POSITION_MAP.left,
  POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [
  POSITION_MAP.bottomLeft,
  POSITION_MAP.bottomRight,
  POSITION_MAP.topRight,
  POSITION_MAP.topLeft
];

@Component({
  selector: '[nz-submenu]',
  exportAs: 'nzSubmenu',
  providers: [NzSubmenuService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div
      nz-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzIcon]="nzIcon"
      [nzTitle]="nzTitle"
      [mode]="mode"
      [nzDisabled]="nzDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="nzPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      nz-submenu-inline-child
      [mode]="mode"
      [nzOpen]="nzOpen"
      [@.disabled]="!!noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [menuClass]="nzMenuClassName"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [nzOpen]="nzOpen"
          [position]="position"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@.disabled]="!!noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>

    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-dropdown-menu-submenu]': `isMenuInsideDropDown`,
    '[class.ant-dropdown-menu-submenu-disabled]': `isMenuInsideDropDown && nzDisabled`,
    '[class.ant-dropdown-menu-submenu-open]': `isMenuInsideDropDown && nzOpen`,
    '[class.ant-dropdown-menu-submenu-selected]': `isMenuInsideDropDown && isSelected`,
    '[class.ant-dropdown-menu-submenu-vertical]': `isMenuInsideDropDown && mode === 'vertical'`,
    '[class.ant-dropdown-menu-submenu-horizontal]': `isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.ant-dropdown-menu-submenu-inline]': `isMenuInsideDropDown && mode === 'inline'`,
    '[class.ant-dropdown-menu-submenu-active]': `isMenuInsideDropDown && isActive`,
    '[class.ant-menu-submenu]': `!isMenuInsideDropDown`,
    '[class.ant-menu-submenu-disabled]': `!isMenuInsideDropDown && nzDisabled`,
    '[class.ant-menu-submenu-open]': `!isMenuInsideDropDown && nzOpen`,
    '[class.ant-menu-submenu-selected]': `!isMenuInsideDropDown && isSelected`,
    '[class.ant-menu-submenu-vertical]': `!isMenuInsideDropDown && mode === 'vertical'`,
    '[class.ant-menu-submenu-horizontal]': `!isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.ant-menu-submenu-inline]': `!isMenuInsideDropDown && mode === 'inline'`,
    '[class.ant-menu-submenu-active]': `!isMenuInsideDropDown && isActive`,
    '[class.ant-menu-submenu-rtl]': `dir === 'rtl'`
  }
})
export class NzSubMenuComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  static ngAcceptInputType_nzOpen: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzMenuClassName: string = '';
  @Input() nzPaddingLeft: number | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() nzIcon: string | null = null;
  @Input() @InputBoolean() nzOpen = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() nzPlacement: POSITION_TYPE_HORIZONTAL = 'bottomLeft';
  @Output() readonly nzOpenChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef }) cdkOverlayOrigin: ElementRef | null = null;
  // fix errors about circular dependency
  // Can't construct a query for the property ... since the query selector wasn't defined"
  @ContentChildren(forwardRef(() => NzSubMenuComponent), { descendants: true })
  listOfNzSubMenuComponent: QueryList<NzSubMenuComponent> | null = null;
  @ContentChildren(NzMenuItemDirective, { descendants: true })
  listOfNzMenuItemDirective: QueryList<NzMenuItemDirective> | null = null;
  private level = this.nzSubmenuService.level;
  private destroy$ = new Subject<void>();
  position = 'right';
  triggerWidth: number | null = null;
  theme: NzMenuThemeType = 'light';
  mode: NzMenuModeType = 'vertical';
  inlinePaddingLeft: number | null = null;
  overlayPositions = listOfVerticalPositions;
  isSelected = false;
  isActive = false;
  dir: Direction = 'ltr';

  /** set the submenu host open status directly **/
  setOpenStateWithoutDebounce(open: boolean): void {
    this.nzSubmenuService.setOpenStateWithoutDebounce(open);
  }

  toggleSubMenu(): void {
    this.setOpenStateWithoutDebounce(!this.nzOpen);
  }

  setMouseEnterState(value: boolean): void {
    this.isActive = value;
    if (this.mode !== 'inline') {
      this.nzSubmenuService.setMouseEnterTitleOrOverlayState(value);
    }
  }

  setTriggerWidth(): void {
    if (
      this.mode === 'horizontal' &&
      this.platform.isBrowser &&
      this.cdkOverlayOrigin &&
      this.nzPlacement === 'bottomLeft'
    ) {
      /** TODO: fast dom **/
      this.triggerWidth = this.cdkOverlayOrigin!.nativeElement.getBoundingClientRect().width;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const placement = getPlacementName(position);
    if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
      this.position = 'right';
    } else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
      this.position = 'left';
    }
  }

  constructor(
    public nzMenuService: MenuService,
    private cdr: ChangeDetectorRef,
    public nzSubmenuService: NzSubmenuService,
    private platform: Platform,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    /** submenu theme update **/
    this.nzMenuService.theme$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
      this.theme = theme;
      this.cdr.markForCheck();
    });
    /** submenu mode update **/
    this.nzSubmenuService.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.mode = mode;
      if (mode === 'horizontal') {
        this.overlayPositions = [POSITION_MAP[this.nzPlacement], ...listOfHorizontalPositions];
      } else if (mode === 'vertical') {
        this.overlayPositions = listOfVerticalPositions;
      }
      this.cdr.markForCheck();
    });
    /** inlineIndent update **/
    combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        this.cdr.markForCheck();
      });
    /** current submenu open status **/
    this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntil(this.destroy$)).subscribe(open => {
      this.isActive = open;
      if (open !== this.nzOpen) {
        this.setTriggerWidth();
        this.nzOpen = open;
        this.nzOpenChange.emit(this.nzOpen);
        this.cdr.markForCheck();
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.setTriggerWidth();
    const listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
    const changes = listOfNzMenuItemDirective!.changes;
    const mergedObservable = merge(...[changes, ...listOfNzMenuItemDirective!.map(menu => menu.selected$)]);
    changes
      .pipe(
        startWith(listOfNzMenuItemDirective),
        switchMap(() => mergedObservable),
        startWith(true),
        map(() => listOfNzMenuItemDirective!.some(e => e.nzSelected)),
        takeUntil(this.destroy$)
      )
      .subscribe(selected => {
        this.isSelected = selected;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOpen } = changes;
    if (nzOpen) {
      this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen);
      this.setTriggerWidth();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
