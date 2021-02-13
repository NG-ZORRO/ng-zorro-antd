/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { BooleanInput, IndexableObject } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, mapTo, switchMap, takeUntil } from 'rxjs/operators';
import { NzDropdownMenuComponent, NzPlacementType } from './dropdown-menu.component';

const listOfPositions = [POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight, POSITION_MAP.topRight, POSITION_MAP.topLeft];

@Directive({
  selector: '[nz-dropdown]',
  exportAs: 'nzDropdown'
})
export class NzDropDownDirective implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  static ngAcceptInputType_nzBackdrop: BooleanInput;
  static ngAcceptInputType_nzHasBackdrop: BooleanInput;
  static ngAcceptInputType_nzClickHide: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzVisible: BooleanInput;

  private portal?: TemplatePortal;
  private overlayRef: OverlayRef | null = null;
  private destroy$ = new Subject();
  private positionStrategy = this.overlay
    .position()
    .flexibleConnectedTo(this.elementRef.nativeElement)
    .withLockedPosition()
    .withTransformOriginOn('.ant-dropdown');
  private inputVisible$ = new BehaviorSubject<boolean>(false);
  private nzTrigger$ = new BehaviorSubject<'click' | 'hover'>('hover');
  private overlayClose$ = new Subject<boolean>();
  @Input() nzDropdownMenu: NzDropdownMenuComponent | null = null;
  @Input() nzTrigger: 'click' | 'hover' = 'hover';
  @Input() nzMatchWidthElement: ElementRef | null = null;
  /**
   * @deprecated Not supported, use `nzHasBackDrop` instead.
   * @breaking-change 12.0.0
   */
  @Input() @InputBoolean() nzBackdrop = false;
  @Input() @InputBoolean() nzHasBackdrop = false;
  @Input() @InputBoolean() nzClickHide = true;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzVisible = false;
  @Input() nzOverlayClassName: string = '';
  @Input() nzOverlayStyle: IndexableObject = {};
  @Input() nzPlacement: NzPlacementType = 'bottomLeft';
  @Output() readonly nzVisibleChange: EventEmitter<boolean> = new EventEmitter();

  setDropdownMenuValue<T extends keyof NzDropdownMenuComponent>(key: T, value: NzDropdownMenuComponent[T]): void {
    if (this.nzDropdownMenu) {
      this.nzDropdownMenu.setValue(key, value);
    }
  }

  constructor(
    public elementRef: ElementRef,
    private overlay: Overlay,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private platform: Platform
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-dropdown-trigger');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.nzDropdownMenu) {
      const nativeElement: HTMLElement = this.elementRef.nativeElement;
      /** host mouse state **/
      const hostMouseState$ = merge(
        fromEvent(nativeElement, 'mouseenter').pipe(mapTo(true)),
        fromEvent(nativeElement, 'mouseleave').pipe(mapTo(false))
      );
      /** menu mouse state **/
      const menuMouseState$ = this.nzDropdownMenu.mouseState$;
      /** merged mouse state **/
      const mergedMouseState$ = merge(menuMouseState$, hostMouseState$);
      /** host click state **/
      const hostClickState$ = fromEvent(nativeElement, 'click').pipe(map(() => !this.nzVisible));
      /** visible state switch by nzTrigger **/
      const visibleStateByTrigger$ = this.nzTrigger$.pipe(
        switchMap(trigger => {
          if (trigger === 'hover') {
            return mergedMouseState$;
          } else if (trigger === 'click') {
            return hostClickState$;
          } else {
            return EMPTY;
          }
        })
      );
      const descendantMenuItemClick$ = this.nzDropdownMenu.descendantMenuItemClick$.pipe(
        filter(() => this.nzClickHide),
        mapTo(false)
      );
      const domTriggerVisible$ = merge(visibleStateByTrigger$, descendantMenuItemClick$, this.overlayClose$).pipe(
        filter(() => !this.nzDisabled)
      );
      const visible$ = merge(this.inputVisible$, domTriggerVisible$);
      combineLatest([visible$, this.nzDropdownMenu.isChildSubMenuOpen$])
        .pipe(
          map(([visible, sub]) => visible || sub),
          auditTime(150),
          distinctUntilChanged(),
          filter(() => this.platform.isBrowser),
          takeUntil(this.destroy$)
        )
        .subscribe((visible: boolean) => {
          const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : nativeElement;
          const triggerWidth = element.getBoundingClientRect().width;
          if (this.nzVisible !== visible) {
            this.nzVisibleChange.emit(visible);
          }
          this.nzVisible = visible;
          if (visible) {
            /** set up overlayRef **/
            if (!this.overlayRef) {
              /** new overlay **/
              this.overlayRef = this.overlay.create({
                positionStrategy: this.positionStrategy,
                minWidth: triggerWidth,
                disposeOnNavigation: true,
                hasBackdrop: (this.nzHasBackdrop || this.nzBackdrop) && this.nzTrigger === 'click',
                scrollStrategy: this.overlay.scrollStrategies.reposition()
              });
              merge(
                this.overlayRef.backdropClick(),
                this.overlayRef.detachments(),
                this.overlayRef.outsidePointerEvents().pipe(filter((e: MouseEvent) => !this.elementRef.nativeElement.contains(e.target))),
                this.overlayRef.keydownEvents().pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e)))
              )
                .pipe(mapTo(false), takeUntil(this.destroy$))
                .subscribe(this.overlayClose$);
            } else {
              /** update overlay config **/
              const overlayConfig = this.overlayRef.getConfig();
              overlayConfig.minWidth = triggerWidth;
            }
            /** open dropdown with animation **/
            this.positionStrategy.withPositions([POSITION_MAP[this.nzPlacement], ...listOfPositions]);
            /** reset portal if needed **/
            if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu!.templateRef) {
              this.portal = new TemplatePortal(this.nzDropdownMenu!.templateRef, this.viewContainerRef);
            }
            this.overlayRef.attach(this.portal);
          } else {
            /** detach overlayRef if needed **/
            if (this.overlayRef) {
              this.overlayRef.detach();
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzVisible, nzDisabled, nzOverlayClassName, nzOverlayStyle, nzTrigger, nzBackdrop } = changes;
    if (nzTrigger) {
      this.nzTrigger$.next(this.nzTrigger);
    }
    if (nzVisible) {
      this.inputVisible$.next(this.nzVisible);
    }
    if (nzDisabled) {
      const nativeElement = this.elementRef.nativeElement;
      if (this.nzDisabled) {
        this.renderer.setAttribute(nativeElement, 'disabled', '');
        this.inputVisible$.next(false);
      } else {
        this.renderer.removeAttribute(nativeElement, 'disabled');
      }
    }
    if (nzOverlayClassName) {
      this.setDropdownMenuValue('nzOverlayClassName', this.nzOverlayClassName);
    }
    if (nzOverlayStyle) {
      this.setDropdownMenuValue('nzOverlayStyle', this.nzOverlayStyle);
    }
    if (nzBackdrop) {
      warnDeprecation('`nzBackdrop` in dropdown component will be removed in 12.0.0, please use `nzHasBackdrop` instead.');
    }
  }
}
