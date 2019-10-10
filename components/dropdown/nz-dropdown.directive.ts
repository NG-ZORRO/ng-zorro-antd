/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { hasModifierKey, ESCAPE } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { NzButtonComponent, NzButtonGroupComponent } from 'ng-zorro-antd/button';
import { DEFAULT_DROPDOWN_POSITIONS, InputBoolean, POSITION_MAP } from 'ng-zorro-antd/core';
import { combineLatest, fromEvent, merge, EMPTY, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mapTo, takeUntil, tap } from 'rxjs/operators';
import { NzDropdownMenuComponent, NzPlacementType } from './nz-dropdown-menu.component';

@Directive({
  selector: '[nz-dropdown]',
  exportAs: 'nzDropdown'
})
export class NzDropDownDirective implements AfterViewInit, OnDestroy, OnChanges {
  private portal: TemplatePortal;
  private overlayRef: OverlayRef | null = null;
  private destroy$ = new Subject();
  private triggerWidth = 0;
  private el: HTMLElement = this.elementRef.nativeElement;
  private dropdownOpen = false;
  private positionStrategy: FlexibleConnectedPositionStrategy;
  private positions: ConnectionPositionPair[] = [...DEFAULT_DROPDOWN_POSITIONS];
  private positionSubscription = Subscription.EMPTY;
  private overlaySubscription = Subscription.EMPTY;
  readonly hover$: Observable<boolean> = merge(
    fromEvent(this.el, 'mouseenter').pipe(mapTo(true)),
    fromEvent(this.el, 'mouseleave').pipe(mapTo(false))
  );
  readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
    tap(e => e.stopPropagation()),
    mapTo(true)
  );
  @Input() nzDropdownMenu: NzDropdownMenuComponent;
  @Input() nzTrigger: 'click' | 'hover' = 'hover';
  @Input() nzMatchWidthElement: ElementRef;
  @Input() @InputBoolean() nzBackdrop = true;
  @Input() @InputBoolean() nzClickHide = true;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzVisible = false;
  @Input() @InputBoolean() nzTableFilter = false;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [key: string]: string } = {};
  @Input() nzPlacement: NzPlacementType = 'bottomLeft';
  @Output() readonly nzVisibleChange: EventEmitter<boolean> = new EventEmitter();

  setDisabled(disabled: boolean): void {
    if (disabled) {
      this.renderer.setAttribute(this.el, 'disabled', '');
      if (this.nzVisible) {
        this.nzVisible = false;
        this.nzVisibleChange.emit(this.nzVisible);
        this.updateOverlayByVisible();
      }
    } else {
      this.renderer.removeAttribute(this.el, 'disabled');
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.el)
        .withLockedPosition(),
      minWidth: this.triggerWidth,
      hasBackdrop: this.nzTrigger === 'click',
      backdropClass: this.nzBackdrop ? undefined : 'nz-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private createOverlay(): OverlayRef {
    if (!this.overlayRef) {
      const config = this.getOverlayConfig();
      this.overlayRef = this.overlay.create(config);
      this.subscribeOverlayEvent(this.overlayRef);
      this.subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
      return this.overlayRef;
    } else {
      const overlayConfig = this.overlayRef.getConfig();
      this.updateOverlayConfig(overlayConfig);
      return this.overlayRef;
    }
  }

  updateOverlayConfig(overlayConfig: OverlayConfig): OverlayConfig {
    overlayConfig.minWidth = this.triggerWidth;
    overlayConfig.hasBackdrop = this.nzTrigger === 'click';
    return overlayConfig;
  }

  dispose(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.positionSubscription.unsubscribe();
      this.overlaySubscription.unsubscribe();
    }
  }

  private subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
    this.positionSubscription.unsubscribe();
    this.positionSubscription = position.positionChanges.pipe(takeUntil(this.destroy$)).subscribe(change => {
      this.nzDropdownMenu.setValue('dropDownPosition', change.connectionPair.originY);
    });
  }

  private subscribeOverlayEvent(overlayRef: OverlayRef): void {
    this.overlaySubscription.unsubscribe();
    this.overlaySubscription = merge(
      overlayRef.backdropClick(),
      overlayRef.detachments(),
      overlayRef.keydownEvents().pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e)))
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nzDropdownMenu.setVisibleStateWhen(false);
      });
  }

  private getPortal(): TemplatePortal {
    if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu.templateRef) {
      this.portal = new TemplatePortal(this.nzDropdownMenu.templateRef, this.viewContainerRef);
    }
    return this.portal;
  }

  private openMenu(): void {
    if (!this.dropdownOpen) {
      const overlayRef = this.createOverlay();
      const overlayConfig = overlayRef.getConfig();
      this.nzDropdownMenu.setValue('open', true);
      this.setPosition(overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy);
      overlayRef.attach(this.getPortal());
      this.dropdownOpen = true;
    }
  }

  private closeMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.dropdownOpen = false;
      this.nzDropdownMenu.setValue('open', false);
    }
  }

  private setPosition(positionStrategy: FlexibleConnectedPositionStrategy): void {
    this.positionStrategy = positionStrategy;
    positionStrategy.withPositions([...this.positions]);
  }

  private updatePositionStrategy(positions: ConnectedPosition[]): void {
    if (this.positionStrategy) {
      this.positionStrategy.withPositions(positions);
    }
  }

  private setTriggerWidth(): void {
    if (this.platform.isBrowser) {
      const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : this.el;
      this.triggerWidth = element.getBoundingClientRect().width;
    }
  }

  initActionSubscribe(): void {
    const hostVisible$ = this.nzTrigger === 'hover' ? this.hover$ : this.$click;
    const dropdownMenuVisible$ = this.nzDropdownMenu.visible$;
    const menuClickVisible$ = this.nzClickHide
      ? this.nzDropdownMenu.nzMenuDropdownService.menuItemClick$.pipe(mapTo(false))
      : EMPTY;
    const supVisible$ = merge(dropdownMenuVisible$, hostVisible$, menuClickVisible$);
    const subVisible$ = this.nzDropdownMenu.nzMenuDropdownService.menuOpen$;
    combineLatest([supVisible$, subVisible$])
      .pipe(
        map(([supVisible, subVisible]) => supVisible || subVisible),
        debounceTime(50),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(visible => {
        if (!this.nzDisabled && this.nzVisible !== visible) {
          this.nzVisible = visible;
          this.updateOverlayByVisible();
          this.nzVisibleChange.emit(this.nzVisible);
          this.setTriggerWidth();
          this.nzDropdownMenu.setValue('triggerWidth', this.triggerWidth);
        }
      });
  }

  updateOverlayByVisible(): void {
    if (this.nzVisible) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  updateDisabledState(): void {
    this.setDisabled(this.nzDisabled);
  }

  regeneratePosition(placement: NzPlacementType, positions: ConnectionPositionPair[]): ConnectionPositionPair[] {
    return [POSITION_MAP[placement], ...positions];
  }

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private overlay: Overlay,
    private platform: Platform,
    @Optional() @Host() private nzButtonComponent: NzButtonComponent,
    @Optional() private nzButtonGroupComponent: NzButtonGroupComponent,
    private viewContainerRef: ViewContainerRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-dropdown-trigger');
    if (this.nzButtonComponent) {
      this.nzButtonComponent.isInDropdown = true;
    }
    if (this.nzButtonGroupComponent) {
      this.nzButtonGroupComponent.isInDropdown = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.nzDropdownMenu) {
      this.setTriggerWidth();
      this.initActionSubscribe();
      this.updateDisabledState();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.dispose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzVisible,
      nzTrigger,
      nzPlacement,
      nzDisabled,
      nzOverlayClassName,
      nzOverlayStyle,
      nzTableFilter
    } = changes;
    if (this.nzDropdownMenu) {
      if (nzVisible) {
        this.updateOverlayByVisible();
        this.nzDropdownMenu.visible$.next(this.nzVisible);
      }
      if (nzTrigger) {
        this.nzDropdownMenu.setValue('nzTrigger', this.nzTrigger);
      }
      if (nzTableFilter) {
        this.nzDropdownMenu.setValue('nzTableFilter', this.nzTableFilter);
      }
      if (nzOverlayClassName) {
        this.nzDropdownMenu.setValue('nzOverlayClassName', this.nzOverlayClassName);
      }
      if (nzOverlayStyle) {
        this.nzDropdownMenu.setValue('nzOverlayStyle', this.nzOverlayStyle);
      }
      if (nzPlacement) {
        this.nzDropdownMenu.setValue('nzPlacement', this.nzPlacement);
        this.nzDropdownMenu.setValue(
          'dropDownPosition',
          this.nzDropdownMenu.nzPlacement.indexOf('top') !== -1 ? 'top' : 'bottom'
        );
        this.positions = this.regeneratePosition(this.nzPlacement, this.positions);
        this.updatePositionStrategy(this.positions);
      }
    }
    if (nzDisabled) {
      this.updateDisabledState();
    }
  }
}
