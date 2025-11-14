/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import {
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  OverlayRef
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import {
  getPlacementName,
  POSITION_MAP,
  POSITION_TYPE,
  setConnectedPositionOffset,
  TOOLTIP_OFFSET_MAP
} from 'ng-zorro-antd/core/overlay';
import { IndexableObject } from 'ng-zorro-antd/core/types';

import { NzDropdownMenuComponent, NzPlacementType } from './dropdown-menu.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'dropdown';

const listOfPositions: POSITION_TYPE[] = ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'];

const normalizePlacementForClass = (p: NzPlacementType): NzDropdownMenuComponent['placement'] => {
  // Map center placements to generic top/bottom classes for styling
  if (p === 'topCenter') {
    return 'top';
  }
  if (p === 'bottomCenter') {
    return 'bottom';
  }
  return p as NzDropdownMenuComponent['placement'];
};

@Directive({
  selector: '[nz-dropdown]',
  exportAs: 'nzDropdown',
  host: {
    class: 'ant-dropdown-trigger'
  }
})
export class NzDropdownDirective implements AfterViewInit, OnChanges {
  public readonly nzConfigService = inject(NzConfigService);
  private renderer = inject(Renderer2);
  private viewContainerRef = inject(ViewContainerRef);
  private platform = inject(Platform);
  private destroyRef = inject(DestroyRef);
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  public elementRef = inject(ElementRef);
  private injector = inject(Injector);

  private portal?: TemplatePortal;
  private overlayRef: OverlayRef | null = null;

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
  @Input({ transform: booleanAttribute }) nzArrow = false;
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
    this.nzDropdownMenu?.setValue(key, value);
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
        .subscribe(visible => {
          const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : nativeElement;
          const triggerWidth = element.getBoundingClientRect().width;
          if (this.nzVisible !== visible) {
            this.nzVisibleChange.emit(visible);
          }
          this.nzVisible = visible;

          if (visible) {
            const positionStrategy = createFlexibleConnectedPositionStrategy(
              this.injector,
              this.elementRef.nativeElement
            )
              .withLockedPosition()
              .withTransformOriginOn('.ant-dropdown');

            // Listen for placement changes to update the menu classes (arrow position)
            positionStrategy.positionChanges
              .pipe(
                filter(() => Boolean(this.overlayRef)),
                map(change => getPlacementName(change) as NzPlacementType | undefined),
                takeUntilDestroyed(this.destroyRef)
              )
              .subscribe(placement => {
                if (placement) {
                  this.setDropdownMenuValue('placement', normalizePlacementForClass(placement));
                }
              });

            /** set up overlayRef **/
            if (!this.overlayRef) {
              /** new overlay **/
              this.overlayRef = createOverlayRef(this.injector, {
                positionStrategy,
                minWidth: triggerWidth,
                disposeOnNavigation: true,
                hasBackdrop: this.nzBackdrop && this.nzTrigger === 'click',
                scrollStrategy: createRepositionScrollStrategy(this.injector)
              });
              merge(
                this.overlayRef.backdropClick(),
                this.overlayRef.detachments(),
                this.overlayRef
                  .outsidePointerEvents()
                  .pipe(filter(e => !this.elementRef.nativeElement.contains(e.target))),
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
            const positions = [this.nzPlacement, ...listOfPositions].map(position => {
              return this.nzArrow
                ? setConnectedPositionOffset(POSITION_MAP[position], TOOLTIP_OFFSET_MAP[position])
                : POSITION_MAP[position];
            });
            positionStrategy.withPositions(positions);
            /** reset portal if needed **/
            if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu!.templateRef) {
              this.portal = new TemplatePortal(this.nzDropdownMenu!.templateRef, this.viewContainerRef);
            }
            // Initialize arrow and placement on open
            this.setDropdownMenuValue('nzArrow', this.nzArrow);
            this.setDropdownMenuValue('placement', normalizePlacementForClass(this.nzPlacement));
            this.overlayRef.attach(this.portal);
          } else {
            /** detach overlayRef if needed **/
            this.overlayRef?.detach();
          }
        });

      this.nzDropdownMenu!.animationStateChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
        if (event.toState === 'void') {
          this.overlayRef?.dispose();
          this.overlayRef = null;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzVisible, nzDisabled, nzOverlayClassName, nzOverlayStyle, nzTrigger, nzArrow, nzPlacement } = changes;
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
    if (nzArrow) {
      this.setDropdownMenuValue('nzArrow', this.nzArrow);
    }
    if (nzPlacement) {
      this.setDropdownMenuValue('placement', normalizePlacementForClass(this.nzPlacement));
    }
  }
}
