/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { fromEvent, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { inlineMenuCollapseMotion } from 'ng-zorro-antd/core/animation';

import { NZ_MENU_ITEM, NzMenuItem } from './item';
import { NZ_MENU, NZ_MENU_PANEL, NZ_MENU_TRIGGER, NzMenu, NzMenuPanel, NzMenuTrigger } from './menu';
import { NzMenuStack } from './menu-stack';

@Component({
  selector: 'nz-menu-item',
  animations: [inlineMenuCollapseMotion],
  template: `
    <ng-template #icon>
      <ng-content select="[nz-menu-icon]"></ng-content>
    </ng-template>

    <ng-template #defaultContent>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="!hasSubmenu">
      <ng-container [ngTemplateOutlet]="icon"></ng-container>
      <span class="ant-menu-title-content">
        <ng-container [ngTemplateOutlet]="defaultContent"></ng-container>
      </span>
    </ng-container>

    <div *ngIf="hasSubmenu" [style.padding-left.px]="isInline ? (level + 1) * 24 : null" class="ant-menu-submenu-title">
      <ng-container [ngTemplateOutlet]="icon"></ng-container>
      <span class="ant-menu-title-content">
        <ng-container [ngTemplateOutlet]="defaultContent"></ng-container>
      </span>
      <i *ngIf="isInPopup || isVertical" class="ant-menu-submenu-arrow"></i>
    </div>

    <ng-container cdkPortalOutlet></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NZ_MENU_ITEM,
      useExisting: NzMenuItemComponent
    }
  ],
  host: {
    '(click)': 'onClick($event)',
    '[@inlineMenuCollapseMotion]': 'isInlineSubmenu',
    '[style.padding-left.px]': '(!hasSubmenu && isInline) ? (level + 1) * 24 : null',
    '[class.ant-menu-item]': '!hasSubmenu',
    '[class.ant-menu-submenu-vertical]': '(hasSubmenu && isInPopup) || isVertical',
    '[class.ant-menu-item-selected]': '!hasSubmenu && selected',
    '[class.ant-menu-submenu]': 'hasSubmenu',
    '[class.ant-menu-submenu-selected]': 'hasSubmenu && selected',
    '[class.ant-menu-submenu-inline]': 'isInlineSubmenu'
  }
})
export class NzMenuItemComponent implements NzMenuItem, OnDestroy, AfterContentInit, AfterViewInit {
  get hasSubmenu(): boolean {
    return !!this.menuTrigger?.getMenu();
  }

  get isInPopup(): boolean {
    return !!this.parentMenuPanel;
  }

  get isVertical(): boolean {
    return this.parentMenu.orientation === 'vertical';
  }

  get isInlineSubmenu(): boolean {
    return this.hasSubmenu && this.parentMenu.submenuType === 'inline';
  }
  get isInline(): boolean {
    return this.parentMenu.submenuType === 'inline';
  }

  level = 0;

  @ViewChild(CdkPortalOutlet) inlineOutlet!: CdkPortalOutlet;
  selected: boolean = false;
  private destroy$ = new Subject();
  @Output() readonly nzSelected = new EventEmitter<NzMenuItem>();
  private selection: SelectionModel<NzMenuItem> | null = null;
  constructor(
    public elementRef: ElementRef<HTMLElement>,
    @Inject(NZ_MENU) public parentMenu: NzMenu,
    @Inject(NZ_MENU_PANEL) @Optional() private parentMenuPanel: NzMenuPanel,
    @Inject(NZ_MENU_TRIGGER) @Host() @Optional() public menuTrigger: NzMenuTrigger,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.setupMouseEnter();
  }

  setLevel(level: number): void {
    this.level = level;
    this.cdr.markForCheck();
  }

  onClick(e: MouseEvent): void {
    e.stopPropagation();
    if (this.hasSubmenu) {
      return;
    }
    this.selection?.select(this);
    this.nzSelected.emit(this);
  }

  ngAfterViewInit(): void {
    if (this.menuTrigger) {
      this.menuTrigger.inlineOutlet = this.inlineOutlet;
    }
  }

  ngAfterContentInit(): void {
    this.subscribeSelectionChange();
    this.subscribeSubmenuItemSelected();
  }

  private getMenuStack(): NzMenuStack | null {
    return this.parentMenu?.menuStack;
  }

  private subscribeSubmenuItemSelected(): void {
    if (!this.hasSubmenu) {
      return;
    }
    this.menuTrigger
      .getMenu()
      ?.itemSelected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        this.selected = true;
        this.nzSelected.emit(item);
        this.cdr.markForCheck();
      });
  }

  private subscribeSelectionChange(): void {
    const selectionStream = this.parentMenuPanel
      ? this.parentMenuPanel.selectionModelChanged()
      : of(this.parentMenu.selection);

    selectionStream
      .pipe(
        switchMap(selection => {
          this.selection = selection;
          return selection.changed;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.selected = this.selection!.isSelected(this);
        this.cdr.markForCheck();
      });
  }

  private setupMouseEnter(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent(this.elementRef.nativeElement, 'mouseenter')
        .pipe(
          filter(() => !this.getMenuStack()?.isEmpty() && !this.hasSubmenu),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            const menuStack = this.getMenuStack()!;
            if (menuStack.peek()?.triggerOn !== 'click') {
              const isRootParent = !menuStack.closeSubMenuOf(this.parentMenu) && menuStack.peek() !== this.parentMenu;
              if (isRootParent) {
                menuStack.closeAll();
              } else {
                menuStack?.closeSubMenuOf(this.parentMenu);
              }
            }
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
