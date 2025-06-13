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
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, EMPTY, Subject, combineLatest, fromEvent, merge } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { IndexableObject } from 'ng-zorro-antd/core/types';

import { NzDropdownMenuComponent, NzPlacementType } from './dropdown-menu.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'dropDown';

const listOfPositions = [
  POSITION_MAP.bottomLeft,
  POSITION_MAP.bottomRight,
  POSITION_MAP.topRight,
  POSITION_MAP.topLeft
];

@Directive({
  selector: '[nz-dropdown]',
  exportAs: 'nzDropdown',
  host: {
    class: 'ant-dropdown-trigger'
  }
})
export class NzDropDownDirective implements AfterViewInit, OnChanges {
  public readonly nzConfigService = inject(NzConfigService);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);
  private platform = inject(Platform);
  private destroyRef = inject(DestroyRef);
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  public elementRef = inject(ElementRef);
  private overlay = inject(Overlay);

  private portal?: TemplatePortal;
  private overlayRef: OverlayRef | null = null;

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
  @Input({ transform: booleanAttribute }) @WithConfig() nzBackdrop = false;
  @Input({ transform: booleanAttribute }) nzClickHide = true;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzVisible = false;
  @Input() nzOverlayClassName: string = '';
  @Input() nzOverlayStyle: IndexableObject = {};
  @Input() nzPlacement: NzPlacementType = 'bottomLeft';
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    });
  }

  setDropdownMenuValue<T extends keyof NzDropdownMenuComponent>(key: T, value: NzDropdownMenuComponent[T]): void {
    if (this.nzDropdownMenu) {
      this.nzDropdownMenu.setValue(key, value);
    }
  }

  ngAfterViewInit(): void {
    if (this.nzDropdownMenu) {
      const nativeElement: HTMLElement = this.elementRef.nativeElement;
      /** host mouse state **/
      const hostMouseState$ = merge(
        fromEvent(nativeElement, 'mouseenter').pipe(map(() => true)),
        fromEvent(nativeElement, 'mouseleave').pipe(map(() => false))
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
        map(() => false)
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
          takeUntilDestroyed(this.destroyRef)
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
                hasBackdrop: this.nzBackdrop && this.nzTrigger === 'click',
                scrollStrategy: this.overlay.scrollStrategies.reposition()
              });
              merge(
                this.overlayRef.backdropClick(),
                this.overlayRef.detachments(),
                this.overlayRef
                  .outsidePointerEvents()
                  .pipe(filter((e: MouseEvent) => !this.elementRef.nativeElement.contains(e.target))),
                this.overlayRef.keydownEvents().pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e)))
              )
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                  this.overlayClose$.next(false);
                });
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

      this.nzDropdownMenu!.animationStateChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
        if (event.toState === 'void') {
          if (this.overlayRef) {
            this.overlayRef.dispose();
          }
          this.overlayRef = null;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzVisible, nzDisabled, nzOverlayClassName, nzOverlayStyle, nzTrigger } = changes;
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
  }
}
