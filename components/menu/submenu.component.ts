/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
import {
  collapseMotion,
  DEFAULT_SUBMENU_POSITIONS,
  getPlacementName,
  InputBoolean,
  NzNoAnimationDirective,
  POSITION_MAP,
  slideMotion,
  zoomBigMotion
} from 'ng-zorro-antd/core';
import { combineLatest, merge, Subject } from 'rxjs';
import { flatMap, map, startWith, takeUntil } from 'rxjs/operators';
import { NzMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
import { NzSubmenuService } from './submenu.service';

@Component({
  selector: '[nz-submenu]',
  exportAs: 'nzSubmenu',
  providers: [NzSubmenuService],
  animations: [collapseMotion, zoomBigMotion, slideMotion],
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
      [@collapseMotion]="expandState"
      [@.disabled]="noAnimation?.nzNoAnimation"
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
        [cdkConnectedOverlayWidth]="triggerWidth"
        [cdkConnectedOverlayOpen]="nzOpen"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [placement]="placement"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@slideMotion]="expandState"
          [@zoomBigMotion]="expandState"
          [@.disabled]="noAnimation?.nzNoAnimation"
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
    '[class.ant-menu-submenu-active]': `!isMenuInsideDropDown && isActive`
  }
})
export class NzSubMenuComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  @Input() nzMenuClassName: string | null = null;
  @Input() nzPaddingLeft: number | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() nzIcon: string | null = null;
  @Input() @InputBoolean() nzOpen = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzOpenChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef }) cdkOverlayOrigin: ElementRef | null = null;
  @ContentChildren(NzSubMenuComponent, { descendants: true })
  listOfNzSubMenuComponent: QueryList<NzSubMenuComponent> | null = null;
  @ContentChildren(NzMenuItemDirective, { descendants: true })
  listOfNzMenuItemDirective: QueryList<NzMenuItemDirective> | null = null;
  private level = this.nzSubmenuService.level;
  private destroy$ = new Subject<void>();
  placement = 'rightTop';
  triggerWidth: number | null = null;
  expandState = 'collapsed';
  theme: NzMenuThemeType = 'light';
  mode: NzMenuModeType = 'vertical';
  inlinePaddingLeft: number | null = null;
  /** TODO: fix position error **/
  overlayPositions = [...DEFAULT_SUBMENU_POSITIONS];
  isSelected = false;
  isActive = false;

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
    if (this.mode === 'horizontal' && this.platform.isBrowser) {
      /** TODO: fast dom **/
      this.triggerWidth = this.cdkOverlayOrigin!.nativeElement.getBoundingClientRect().width;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.placement = getPlacementName(position)!;
    this.cdr.markForCheck();
  }

  constructor(
    public nzMenuService: MenuService,
    private cdr: ChangeDetectorRef,
    public nzSubmenuService: NzSubmenuService,
    private platform: Platform,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.nzMenuService.theme$.pipe(takeUntil(this.destroy$)).subscribe(theme => {
      this.theme = theme;
      this.cdr.markForCheck();
    });
    this.nzSubmenuService.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.mode = mode;
      this.cdr.markForCheck();
    });
    combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        this.cdr.markForCheck();
      });
    combineLatest([this.nzSubmenuService.mode$, this.nzSubmenuService.isHostSubMenuOpen$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, open]) => {
        if (open) {
          if (mode === 'inline') {
            this.expandState = 'expanded';
          } else if (mode === 'horizontal') {
            this.expandState = 'bottom';
          } else if (mode === 'vertical') {
            this.expandState = 'active';
          }
        } else {
          this.isActive = false;
          this.expandState = 'collapsed';
        }
        this.overlayPositions = mode === 'horizontal' ? [POSITION_MAP.bottomLeft] : [POSITION_MAP.rightTop, POSITION_MAP.leftTop];
        if (open !== this.nzOpen) {
          this.setTriggerWidth();
          this.nzOpen = open;
          this.nzOpenChange.emit(this.nzOpen);
        }
        this.cdr.markForCheck();
      });
  }

  ngAfterContentInit(): void {
    this.setTriggerWidth();
    const mergedObservable = merge(
      ...[this.listOfNzMenuItemDirective!.changes, ...this.listOfNzMenuItemDirective!.map(menu => menu.selected$)]
    );
    this.listOfNzMenuItemDirective!.changes.pipe(
      startWith(this.listOfNzMenuItemDirective),
      flatMap(() => mergedObservable),
      startWith(true),
      map(() => this.listOfNzMenuItemDirective!.some(e => e.nzSelected)),
      takeUntil(this.destroy$)
    ).subscribe(selected => {
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
