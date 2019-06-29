/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
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
import { flatMap, map, startWith, takeUntil } from 'rxjs/operators';

import {
  collapseMotion,
  getPlacementName,
  slideMotion,
  zoomBigMotion,
  DEFAULT_SUBMENU_POSITIONS,
  InputBoolean,
  NzMenuBaseService,
  NzNoAnimationDirective,
  NzUpdateHostClassService,
  POSITION_MAP
} from 'ng-zorro-antd/core';

import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzSubmenuService } from './nz-submenu.service';

@Component({
  selector: '[nz-submenu]',
  exportAs: 'nzSubmenu',
  providers: [NzSubmenuService, NzUpdateHostClassService],
  animations: [collapseMotion, zoomBigMotion, slideMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  templateUrl: './nz-submenu.component.html',
  styles: [
    `
      :root .ant-menu-submenu.ant-menu-submenu-placement-bottomLeft {
        top: 6px;
        position: relative;
      }

      :root .ant-menu-submenu.ant-menu-submenu-placement-rightTop {
        left: 4px;
        position: relative;
      }

      :root .ant-menu-submenu.ant-menu-submenu-placement-leftTop {
        right: 4px;
        position: relative;
      }
    `
  ]
})
export class NzSubMenuComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  @Input() nzMenuClassName: string;
  @Input() nzPaddingLeft: number;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzIcon: string;
  @Input() @InputBoolean() nzOpen = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzOpenChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef }) cdkOverlayOrigin: ElementRef;
  @ContentChildren(NzSubMenuComponent, { descendants: true })
  listOfNzSubMenuComponent: QueryList<NzSubMenuComponent>;
  @ContentChildren(NzMenuItemDirective, { descendants: true })
  listOfNzMenuItemDirective: QueryList<NzMenuItemDirective>;

  placement = 'rightTop';
  triggerWidth: number;
  expandState = 'collapsed';
  overlayPositions = [...DEFAULT_SUBMENU_POSITIONS];

  private destroy$ = new Subject<void>();
  private isChildMenuSelected = false;
  private isMouseHover = false;

  setOpenState(open: boolean): void {
    this.nzSubmenuService.setOpenState(open);
  }

  clickSubMenuTitle(): void {
    if (this.nzSubmenuService.mode === 'inline' && !this.nzMenuService.isInDropDown && !this.nzDisabled) {
      this.setOpenState(!this.nzOpen);
    }
  }

  setMouseEnterState(value: boolean): void {
    this.isMouseHover = value;
    this.setClassMap();
    this.nzSubmenuService.setMouseEnterState(value);
  }

  setTriggerWidth(): void {
    if (this.nzSubmenuService.mode === 'horizontal' && this.platform.isBrowser) {
      this.triggerWidth = this.cdkOverlayOrigin.nativeElement.getBoundingClientRect().width;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.placement = getPlacementName(position)!;
    this.cdr.markForCheck();
  }

  setClassMap(): void {
    const prefixName = this.nzMenuService.isInDropDown ? 'ant-dropdown-menu-submenu' : 'ant-menu-submenu';
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`${prefixName}`]: true,
      [`${prefixName}-disabled`]: this.nzDisabled,
      [`${prefixName}-open`]: this.nzOpen,
      [`${prefixName}-selected`]: this.isChildMenuSelected,
      [`${prefixName}-${this.nzSubmenuService.mode}`]: true,
      [`${prefixName}-active`]: this.isMouseHover && !this.nzDisabled
    });
  }

  constructor(
    private elementRef: ElementRef,
    public nzMenuService: NzMenuBaseService,
    private cdr: ChangeDetectorRef,
    public nzSubmenuService: NzSubmenuService,
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private platform: Platform,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    combineLatest([this.nzSubmenuService.mode$, this.nzSubmenuService.open$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, open]) => {
        if (open && mode === 'inline') {
          this.expandState = 'expanded';
        } else if (open && mode === 'horizontal') {
          this.expandState = 'bottom';
        } else if (open && mode === 'vertical') {
          this.expandState = 'active';
        } else {
          this.isMouseHover = false;
          this.expandState = 'collapsed';
        }
        this.overlayPositions =
          mode === 'horizontal' ? [POSITION_MAP.bottomLeft] : [POSITION_MAP.rightTop, POSITION_MAP.leftTop];
        if (open !== this.nzOpen) {
          this.setTriggerWidth();
          this.nzOpen = open;
          this.nzOpenChange.emit(this.nzOpen);
        }
        this.setClassMap();
      });
    this.nzSubmenuService.menuOpen$.pipe(takeUntil(this.destroy$)).subscribe((data: boolean) => {
      this.nzMenuService.menuOpen$.next(data);
    });
    merge(
      this.nzMenuService.mode$,
      this.nzMenuService.inlineIndent$,
      this.nzSubmenuService.level$,
      this.nzSubmenuService.open$,
      this.nzSubmenuService.mode$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngAfterContentInit(): void {
    this.setTriggerWidth();
    this.listOfNzMenuItemDirective.changes
      .pipe(
        startWith(true),
        flatMap(() =>
          merge(this.listOfNzMenuItemDirective.changes, ...this.listOfNzMenuItemDirective.map(menu => menu.selected$))
        ),
        startWith(true),
        map(() => this.listOfNzMenuItemDirective.some(e => e.nzSelected)),
        takeUntil(this.destroy$)
      )
      .subscribe(selected => {
        this.isChildMenuSelected = selected;
        this.setClassMap();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzOpen) {
      this.nzSubmenuService.setOpenState(this.nzOpen);
      this.setTriggerWidth();
    }
    if (changes.nzDisabled) {
      this.nzSubmenuService.disabled = this.nzDisabled;
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
