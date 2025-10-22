/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { getPlacementName, POSITION_MAP, POSITION_TYPE_HORIZONTAL } from 'ng-zorro-antd/core/overlay';

import { NzMenuItemComponent } from './menu-item.component';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzMenuModeType, NzMenuThemeType, NzSubmenuTrigger } from './menu.types';
import { NzSubmenuInlineChildComponent } from './submenu-inline-child.component';
import { NzSubmenuNoneInlineChildComponent } from './submenu-non-inline-child.component';
import { NzSubMenuTitleComponent } from './submenu-title.component';
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
      [nzTriggerSubMenuAction]="nzTriggerSubMenuAction"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      @if (!nzTitle) {
        <ng-content select="[title]" />
      }
    </div>
    @if (mode === 'inline') {
      <div
        nz-submenu-inline-child
        [mode]="mode"
        [nzOpen]="nzOpen"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [menuClass]="nzMenuClassName"
        [templateOutlet]="subMenuTemplate"
      ></div>
    } @else {
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
        (overlayOutsideClick)="setMouseEnterState(false)"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [nzOpen]="nzOpen"
          [position]="position"
          [nzDisabled]="nzDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [nzTriggerSubMenuAction]="nzTriggerSubMenuAction"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="nzMenuClassName"
          [@.disabled]="!!noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    }

    <ng-template #subMenuTemplate>
      <ng-content />
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
  },
  imports: [
    NzSubMenuTitleComponent,
    NzSubmenuInlineChildComponent,
    NzNoAnimationDirective,
    NzSubmenuNoneInlineChildComponent,
    OverlayModule
  ]
})
export class NzSubMenuComponent implements OnInit, AfterContentInit, OnChanges {
  public readonly nzSubmenuService = inject(NzSubmenuService);
  protected readonly isMenuInsideDropDown = inject(NzIsMenuInsideDropDownToken);
  protected readonly noAnimation = inject(NzNoAnimationDirective, { optional: true, host: true });
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzMenuService = inject(MenuService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly platform = inject(Platform);

  @Input() nzMenuClassName: string = '';
  @Input() nzPaddingLeft: number | null = null;
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() nzIcon: string | null = null;
  @Input() nzTriggerSubMenuAction: NzSubmenuTrigger = 'hover';
  @Input({ transform: booleanAttribute }) nzOpen = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input() nzPlacement: POSITION_TYPE_HORIZONTAL = 'bottomLeft';
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef }) cdkOverlayOrigin: ElementRef | null = null;
  // fix errors about circular dependency
  // Can't construct a query for the property ... since the query selector wasn't defined
  @ContentChildren(forwardRef(() => NzSubMenuComponent), { descendants: true })
  listOfNzSubMenuComponent: QueryList<NzSubMenuComponent> | null = null;
  @ContentChildren(NzMenuItemComponent, { descendants: true })
  listOfNzMenuItemDirective: QueryList<NzMenuItemComponent> | null = null;

  private level = this.nzSubmenuService.level;
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
      /** TODO: fast dom */
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

  ngOnInit(): void {
    /** submenu theme update **/
    this.nzMenuService.theme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(theme => {
      this.theme = theme;
      this.cdr.markForCheck();
    });

    /** submenu mode update **/
    this.nzSubmenuService.mode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(mode => {
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        this.cdr.markForCheck();
      });

    /** current submenu open status **/
    this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(open => {
      this.isActive = open;
      if (open !== this.nzOpen) {
        this.setTriggerWidth();
        this.nzOpen = open;
        this.nzOpenChange.emit(this.nzOpen);
        this.cdr.markForCheck();
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.setTriggerWidth();
    const listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
    const changes = listOfNzMenuItemDirective!.changes;
    const mergedObservable = merge(changes, ...listOfNzMenuItemDirective!.map(menu => menu.selected$));
    changes
      .pipe(
        startWith(listOfNzMenuItemDirective),
        switchMap(() => mergedObservable),
        startWith(true),
        map(() => listOfNzMenuItemDirective!.some(e => e.nzSelected)),
        takeUntilDestroyed(this.destroyRef)
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
}
