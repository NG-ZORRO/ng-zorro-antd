/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { asapScheduler, EMPTY, fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenuItem } from './item';
import { NZ_MENU, NZ_MENU_PANEL, NZ_MENU_TRIGGER, NzMenu, NzMenuPanel, NzMenuTrigger } from './menu';
import { NzMenuStack } from './menu-stack';

const listOfHorizontalPositions: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: 20, offsetY: 10 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: 20, offsetY: -10 },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: -20, offsetY: 10 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: -20, offsetY: -10 }
];

const listOfVerticalPositions: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 5 },
  { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 5 },
  { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -5 },
  { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -5 }
];

@Directive({
  selector: '[nzMenuTriggerFor]',
  exportAs: 'nzMenuTriggerFor',
  host: {
    '(click)': 'toggle($event)',
    '[class.ant-menu-submenu-open]': 'menuOpen'
  },
  providers: [{ provide: NZ_MENU_TRIGGER, useExisting: NzMenuTriggerForDirective }]
})
export class NzMenuTriggerForDirective implements OnDestroy, NzMenuTrigger, AfterViewInit {
  _menu: NzMenuPanel | null = null;
  menuOpen = false;
  menuStack = new NzMenuStack();
  selection = new SelectionModel<NzMenuItem>();
  inlineOutlet?: CdkPortalOutlet;

  private closingActionsSubscription: Subscription = Subscription.EMPTY;
  private overlayPositionChangesSubscription: Subscription = Subscription.EMPTY;
  private portal: TemplatePortal | null = null;
  private overlayRef: OverlayRef | null = null;
  private readonly destroy$: Subject<void> = new Subject();
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzMenuTriggerOpened') readonly opened = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzMenuTriggerClosed') readonly closed = new EventEmitter<void>();
  @Input('nzMenuTriggerOn') triggerMode: 'hover' | 'click' = 'hover';

  @Input('nzMenuTriggerFor')
  get menu(): NzMenuPanel | null {
    return this._menu;
  }

  set menu(menu: NzMenuPanel | null) {
    this._menu = menu;
    if (this._menu) {
      this._menu.registerMenu(this.getMenuStack(), this.getMenuSelection(), this.parentMenu.submenuType);
    }
  }

  constructor(
    @Inject(NZ_MENU) @Optional() public parentMenu: NzMenu,
    @Inject(NZ_MENU_PANEL) @Optional() private parentMenuPanel: NzMenuPanel,
    @Inject(DOCUMENT) private document: NzSafeAny,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.subscribeMouseEvent();
    this.subscribeSubmenuType();
    this.subscribeCloseAction();
  }

  isPopup(): boolean {
    return !this.parentMenu || this.parentMenu.submenuType === 'popup';
  }

  getMenu(): NzMenuPanel | null {
    return this.menu || null;
  }

  toggle(e: MouseEvent): void {
    e.stopPropagation();
    if (this.getMenu() !== null) {
      this.menuOpen ? this.close() : this.open();
    }
  }

  open(): void {
    if (this.isPopup()) {
      this.openDropdown();
    } else {
      this.openInlineSubmenu();
    }
  }

  close() {
    if (this.isPopup()) {
      this.closeDropdown();
    } else {
      this.closeInlineSubmenu();
    }
  }

  openInlineSubmenu(): void {
    if (!this.inlineOutlet || !this.menu || this.menuOpen) {
      return;
    }
    this.initMenu();
    this.inlineOutlet.attachTemplatePortal(this.getPortal());
    this.menu.startAnimation();
    this.menuOpen = true;
    this.opened.emit();
  }

  closeInlineSubmenu(): void {
    if (!this.inlineOutlet || !this.menu || !this.menuOpen) {
      return;
    }
    this.menu.resetAnimation();
    this.inlineOutlet.detach();
    this.menuOpen = false;
    this.closed.emit();
  }

  openDropdown(): void {
    if (this.menuOpen || this.menu === null || this.parentMenuPanel?.isAnimating) {
      return;
    }

    this.closeSiblingTriggers();
    const overlayRef = this.createOverlay();
    const overlayConfig = overlayRef.getConfig();
    const positionStrategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
    this.setPosition(positionStrategy);
    overlayRef.attach(this.getPortal());
    this.initMenu();
    this.menu.startAnimation();
    this.menu.triggerOn = this.triggerMode;
    this.getMenuStack().push(this.menu);

    this.closingActionsSubscription = this.menuClosingActions().subscribe(() => {
      const menuPanel = this.getMenu();
      if (menuPanel) {
        this.getMenuStack()?.close(menuPanel);
      }
    });
    this.menuOpen = true;
    this.opened.emit();
  }

  closeDropdown(): void {
    if (!this.overlayRef || !this.menuOpen || !this.menu) {
      return;
    }
    this.closingActionsSubscription.unsubscribe();

    const menuPanel = this.menu;

    setTimeout(() => {
      menuPanel.resetAnimation();
    });

    menuPanel
      .animationDone()
      .pipe(
        filter(e => {
          return e.toState === 'void';
        }),
        take(1),
        takeUntil(merge(this.destroy$, this.opened))
      )
      .subscribe(() => {
        this.overlayPositionChangesSubscription.unsubscribe();
        this.overlayRef!.detach();
        this.menuOpen = false;
        this.closed.emit();
        this.cdr.markForCheck();
      });
  }

  isOpened(): boolean {
    return this.menuOpen;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMenu();
    });
  }

  private initMenu(): void {
    if (this.menu) {
      this.menu.theme = this.parentMenu ? this.parentMenu.theme : 'light';
      this.menu.parentMenu = this.parentMenu ? this.parentMenu : undefined;
      let level = 0;
      let parentMenu = this.menu.parentMenu;
      while (parentMenu) {
        level++;
        parentMenu = parentMenu.parentMenu;
      }
      this.menu.setLevel(level);
    }
  }

  private subscribeMouseEvent(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.elementRef.nativeElement, 'mouseenter')
        .pipe(
          filter(() => this.isPopup() && this.triggerMode === 'hover' && this.menu !== null),
          delay(0, asapScheduler),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            if (this.menu?.isAnimating) {
              this.menu!.animationDone()
                .pipe(take(1), delay(0, asapScheduler), takeUntil(merge(this.destroy$, this.closed)))
                .subscribe(() => {
                  this.open();
                  this.subscribeMouseLeave();
                });
            } else {
              this.open();
              this.subscribeMouseLeave();
            }
          });
        });
    });
  }

  private subscribeMouseLeave(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.elementRef.nativeElement, 'mouseleave')
        .pipe(
          filter(() => this.isPopup() && this.triggerMode === 'hover' && !!this.menu && this.menuOpen),
          delay(180),
          takeUntil(merge(this.destroy$, this.menu!.mouseEntered(), this.closed))
        )
        .subscribe(() => {
          const menuStack = this.getMenuStack()!;
          const menuPanel = this.menu;
          if (!menuStack.isEmpty() && menuStack.peek() === menuPanel) {
            this.ngZone.run(() => {
              menuStack.close(menuPanel!);
            });
          }
        });
    });
  }

  private menuClosingActions(): Observable<NzSafeAny> {
    const backdrop = this.overlayRef!.backdropClick();
    const outsideClick = this.outsideClick();
    const detachments = this.overlayRef!.detachments();
    return merge(backdrop, detachments, outsideClick);
  }

  private outsideClick(): Observable<MouseEvent | TouchEvent> {
    return merge<MouseEvent | TouchEvent>(
      fromEvent<TouchEvent>(this.document, 'touchend'),
      this.overlayRef!.outsidePointerEvents()
    ).pipe(
      takeUntil(merge(this.closed, this.destroy$)),
      filter((event: MouseEvent | TouchEvent) => {
        const clickTarget = event.target as HTMLElement;
        return !this.isClickInsideMenuOverlay(clickTarget);
      })
    );
  }

  private isClickInsideMenuOverlay(target: Element): boolean {
    while (target?.parentElement) {
      const isOpenTrigger =
        target.classList.contains('ant-menu-submenu-open') && target.classList.contains('ant-menu-submenu');
      const isOverlayMenu =
        target.classList.contains('ant-menu-submenu-popup') && !target.classList.contains('ant-menu-root');

      if (isOpenTrigger || isOverlayMenu) {
        return true;
      }
      target = target.parentElement;
    }
    return false;
  }

  private createOverlay(): OverlayRef {
    if (!this.overlayRef) {
      const config = this.getOverlayConfig();
      this.overlayRef = this.overlay.create(config);
    }
    return this.overlayRef!;
  }

  private getOverlayConfig(): OverlayConfig {
    const triggerWidth = this.elementRef.nativeElement?.getBoundingClientRect()?.width;
    return new OverlayConfig({
      minWidth: triggerWidth ? triggerWidth - 40 : undefined,
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withTransformOriginOn('.ant-menu-submenu'),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }
  private setPosition(positionStrategy: FlexibleConnectedPositionStrategy): void {
    if (!this.parentMenu || this.parentMenu.orientation === 'horizontal') {
      positionStrategy.withPositions(listOfHorizontalPositions);
    } else {
      positionStrategy.withPositions(listOfVerticalPositions);
    }
  }

  private getPortal(): TemplatePortal {
    if (!this.portal || this.portal.templateRef !== this.menu!.templateRef) {
      this.portal = new TemplatePortal(this.menu!.templateRef, this.viewContainerRef);
    }
    return this.portal;
  }

  private getMenuStack(): NzMenuStack {
    return this.parentMenu?.menuStack || this.menuStack;
  }

  private getMenuSelection(): SelectionModel<NzMenuItem> {
    return this.parentMenu?.selection || this.selection;
  }

  private closeSiblingTriggers(): void {
    if (this.parentMenu) {
      const menuStack = this.getMenuStack()!;
      const isRootParent = !menuStack.closeSubMenuOf(this.parentMenu) && menuStack.peek() !== this.parentMenu;
      if (isRootParent) {
        menuStack.closeAll();
      } else {
        menuStack?.closeSubMenuOf(this.parentMenu);
      }
    }
  }

  private subscribeSubmenuType(): void {
    const submenuTypeStream$ = this.parentMenu ? this.parentMenu.submenuTypeChanged() : EMPTY;
    submenuTypeStream$.pipe(takeUntil(this.destroy$)).subscribe(type => {
      if (!this.menuOpen) {
        this.menu?.setSubmenuType(type);
      } else {
        if (type === 'inline') {
          this.closeDropdown();
        } else {
          this.closeInlineSubmenu();
        }
        this.menu?.setSubmenuType(type);
      }
      this.cdr.markForCheck();
    });
  }

  private subscribeCloseAction(): void {
    if (!this.parentMenu) {
      this.menuStack
        .closed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(item => {
          if (item === this.menu) {
            this.close();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    this.closingActionsSubscription.unsubscribe();
    this.overlayPositionChangesSubscription.unsubscribe();
  }
}
