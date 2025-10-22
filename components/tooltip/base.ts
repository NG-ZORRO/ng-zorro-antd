/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { _getEventTarget } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, asapScheduler } from 'rxjs';
import { delay, distinctUntilChanged, filter } from 'rxjs/operators';

import { NzConfigService, PopConfirmConfig, PopoverConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import {
  DEFAULT_TOOLTIP_POSITIONS,
  POSITION_MAP,
  POSITION_TYPE,
  getPlacementName,
  setConnectedPositionOffset,
  TOOLTIP_OFFSET_MAP
} from 'ng-zorro-antd/core/overlay';
import { NgClassInterface, NgStyleInterface, NzSafeAny, NzTSType } from 'ng-zorro-antd/core/types';
import { isNotNil, toBoolean } from 'ng-zorro-antd/core/util';

export interface PropertyMapping {
  [key: string]: [string, () => unknown];
}

export type NzTooltipTrigger = 'click' | 'focus' | 'hover' | null;

@Directive()
export abstract class NzTooltipBaseDirective implements AfterViewInit, OnChanges {
  config?: Required<PopoverConfig | PopConfirmConfig>;
  abstract arrowPointAtCenter?: boolean;
  abstract directiveTitle?: NzTSType | null;
  abstract directiveContent?: NzTSType | null;
  abstract title?: NzTSType | null;
  abstract content?: NzTSType | null;
  abstract trigger?: NzTooltipTrigger;
  abstract placement?: string | string[];
  abstract origin?: ElementRef<HTMLElement>;
  abstract visible?: boolean;
  abstract mouseEnterDelay?: number;
  abstract mouseLeaveDelay?: number;
  abstract overlayClassName?: string;
  abstract overlayStyle?: NgStyleInterface;
  abstract overlayClickable?: boolean;
  cdkConnectedOverlayPush?: boolean;
  visibleChange = new EventEmitter<boolean>();

  /**
   * This true title that would be used in other parts on this component.
   */
  protected get _title(): NzTSType | null {
    return this.title || this.directiveTitle || null;
  }

  protected get _content(): NzTSType | null {
    return this.content || this.directiveContent || null;
  }

  protected get _trigger(): NzTooltipTrigger {
    return typeof this.trigger !== 'undefined' ? this.trigger : 'hover';
  }

  protected get _placement(): string[] {
    const p = this.placement;
    return Array.isArray(p) && p.length > 0 ? p : typeof p === 'string' && p ? [p] : ['top'];
  }

  protected get _visible(): boolean {
    return (typeof this.visible !== 'undefined' ? this.visible : this.internalVisible) || false;
  }

  protected get _mouseEnterDelay(): number {
    return this.mouseEnterDelay || 0.15;
  }

  protected get _mouseLeaveDelay(): number {
    return this.mouseLeaveDelay || 0.1;
  }

  protected get _overlayClassName(): string | null {
    return this.overlayClassName || null;
  }

  protected get _overlayStyle(): NgStyleInterface | null {
    return this.overlayStyle || null;
  }

  protected get _overlayClickable(): boolean {
    return this.overlayClickable ?? true;
  }

  private internalVisible = false;

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      noAnimation: ['noAnimation', () => !!this.noAnimation]
    };
  }

  component?: NzTooltipBaseComponent;

  protected readonly destroy$ = new Subject<void>();
  protected readonly triggerDisposables: VoidFunction[] = [];

  private delayTimer?: ReturnType<typeof setTimeout>;

  elementRef = inject(ElementRef);
  protected hostView = inject(ViewContainerRef);
  protected renderer = inject(Renderer2);
  protected noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  protected nzConfigService = inject(NzConfigService);
  protected destroyRef = inject(DestroyRef);
  protected platformId = inject(PLATFORM_ID);

  constructor(protected componentType: Type<NzTooltipBaseComponent>) {
    this.destroyRef.onDestroy(() => {
      // Clear toggling timer. Issue #3875 #4317 #4386
      this.clearTogglingTimer();
      this.removeTriggerListeners();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createComponent();
      this.registerTriggers();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { trigger } = changes;

    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }

    if (this.component) {
      this.updatePropertiesByChanges(changes);
    }
  }

  show(): void {
    this.component?.show();
  }

  hide(): void {
    this.component?.hide();
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.component) {
      this.component.updatePosition();
    }
  }

  /**
   * Create a dynamic tooltip component. This method can be overridden.
   */
  protected createComponent(): void {
    const componentRef = this.hostView.createComponent(this.componentType);

    this.component = componentRef.instance as NzTooltipBaseComponent;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      componentRef.location.nativeElement
    );
    this.component.setOverlayOrigin(this.origin || this.elementRef);

    this.initProperties();

    const visibleChange$ = this.component.nzVisibleChange.pipe(distinctUntilChanged());

    visibleChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((visible: boolean) => {
      this.internalVisible = visible;
      this.visibleChange.emit(visible);
    });

    // In some cases, the rendering takes into account the height at which the `arrow` is in the wrong place,
    // so `cdk` sets the container position incorrectly.
    // To avoid this, after placing the `arrow` in the correct position, we should `re-calculate` the position of the `overlay`.
    visibleChange$
      .pipe(
        filter((visible: boolean) => visible),
        delay(0, asapScheduler),
        filter(() => Boolean(this.component?.overlay?.overlayRef)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.component?.updatePosition();
      });
  }

  protected registerTriggers(): void {
    // When the method gets invoked, all properties have been synced to the dynamic component.
    // After removing the old API, we can just check the directive's own `nzTrigger`.
    const el = this.elementRef.nativeElement;
    const trigger = this.trigger;

    this.removeTriggerListeners();

    if (trigger === 'hover') {
      let overlayElement: HTMLElement;
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseenter', () => {
          this.delayEnterLeave(true, true, this._mouseEnterDelay);
        })
      );
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseleave', () => {
          this.delayEnterLeave(true, false, this._mouseLeaveDelay);
          if (this.component?.overlay.overlayRef && !overlayElement) {
            overlayElement = this.component.overlay.overlayRef.overlayElement;
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseenter', () => {
                this.delayEnterLeave(false, true, this._mouseEnterDelay);
              })
            );
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseleave', () => {
                this.delayEnterLeave(false, false, this._mouseLeaveDelay);
              })
            );
          }
        })
      );
    } else if (trigger === 'focus') {
      this.triggerDisposables.push(this.renderer.listen(el, 'focusin', () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, 'focusout', () => this.hide()));
    } else if (trigger === 'click') {
      this.triggerDisposables.push(
        this.renderer.listen(el, 'click', (e: MouseEvent) => {
          e.preventDefault();
          this.show();
        })
      );
    }
    // Else do nothing because user wants to control the visibility programmatically.
  }

  private updatePropertiesByChanges(changes: SimpleChanges): void {
    this.updatePropertiesByKeys(Object.keys(changes));
  }

  private updatePropertiesByKeys(keys?: string[]): void {
    const mappingProperties: PropertyMapping = {
      // common mappings
      title: ['nzTitle', () => this._title],
      directiveTitle: ['nzTitle', () => this._title],
      content: ['nzContent', () => this._content],
      directiveContent: ['nzContent', () => this._content],
      trigger: ['nzTrigger', () => this._trigger],
      placement: ['nzPlacement', () => this._placement],
      visible: ['nzVisible', () => this._visible],
      mouseEnterDelay: ['nzMouseEnterDelay', () => this._mouseEnterDelay],
      mouseLeaveDelay: ['nzMouseLeaveDelay', () => this._mouseLeaveDelay],
      overlayClassName: ['nzOverlayClassName', () => this._overlayClassName],
      overlayStyle: ['nzOverlayStyle', () => this._overlayStyle],
      overlayClickable: ['nzOverlayClickable', () => this._overlayClickable],
      arrowPointAtCenter: ['nzArrowPointAtCenter', () => this.arrowPointAtCenter],
      cdkConnectedOverlayPush: ['cdkConnectedOverlayPush', () => this.cdkConnectedOverlayPush],
      ...this.getProxyPropertyMap()
    };

    (keys || Object.keys(mappingProperties).filter(key => !key.startsWith('directive'))).forEach(
      (property: NzSafeAny) => {
        if (mappingProperties[property]) {
          const [name, valueFn] = mappingProperties[property];
          this.updateComponentValue(name, valueFn());
        }
      }
    );

    this.component?.updateByDirective();
  }

  private initProperties(): void {
    this.updatePropertiesByKeys();
  }

  private updateComponentValue(key: string, value: NzSafeAny): void {
    if (typeof value !== 'undefined') {
      // @ts-ignore
      this.component[key] = value;
    }
  }

  private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
    if (this.delayTimer) {
      this.clearTogglingTimer();
    } else if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = undefined;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      // `isOrigin` is used due to the tooltip will not hide immediately
      // (maybe caused by the fade-out animation).
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }

  private removeTriggerListeners(): void {
    this.triggerDisposables.forEach(dispose => dispose());
    this.triggerDisposables.length = 0;
  }

  private clearTogglingTimer(): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }
  }
}

@Directive()
export abstract class NzTooltipBaseComponent implements OnInit {
  @ViewChild('overlay', { static: false }) overlay!: CdkConnectedOverlay;

  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  protected directionality = inject(Directionality);
  protected cdr = inject(ChangeDetectorRef);
  protected elementRef = inject(ElementRef);
  protected destroyRef = inject(DestroyRef);

  nzTitle: NzTSType | null = null;
  nzContent: NzTSType | null = null;
  nzArrowPointAtCenter: boolean = false;
  nzOverlayClassName!: string;
  nzOverlayStyle: NgStyleInterface = {};
  nzOverlayClickable: boolean = true;
  nzBackdrop = false;
  nzMouseEnterDelay?: number;
  nzMouseLeaveDelay?: number;
  cdkConnectedOverlayPush?: boolean = true;

  nzVisibleChange = new Subject<boolean>();

  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
      this.nzVisibleChange.next(visible);
    }
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  _visible = false;

  set nzTrigger(value: NzTooltipTrigger) {
    this._trigger = value;
  }

  get nzTrigger(): NzTooltipTrigger {
    return this._trigger;
  }

  protected _trigger: NzTooltipTrigger = 'hover';

  set nzPlacement(value: POSITION_TYPE[]) {
    const preferredPosition = value.map(placement =>
      setConnectedPositionOffset(POSITION_MAP[placement], TOOLTIP_OFFSET_MAP[placement])
    );
    this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
  }

  preferredPlacement: string = 'top';

  origin!: ElementRef<NzSafeAny>;

  public dir: Direction = 'ltr';

  _classMap: NgClassInterface = {};

  _prefix = 'ant-tooltip';

  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.nzVisibleChange.complete();
    });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  show(): void {
    if (this.nzVisible) {
      return;
    }

    if (!this.isEmpty()) {
      this.nzVisible = true;
      this.nzVisibleChange.next(true);
      this.cdr.detectChanges();
    }

    // for ltr for overlay to display tooltip in correct placement in rtl direction.
    if (this.origin && this.overlay && this.overlay.overlayRef && this.overlay.overlayRef.getDirection() === 'rtl') {
      this.overlay.overlayRef.setDirection('ltr');
    }
  }

  hide(): void {
    if (!this.nzVisible) {
      return;
    }

    this.nzVisible = false;
    this.nzVisibleChange.next(false);
    this.cdr.detectChanges();
  }

  updateByDirective(): void {
    this.updateStyles();
    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.updatePosition();
      this.updateVisibilityByTitle();
    });
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.preferredPlacement = getPlacementName(position)!;
    this.updateStyles();

    // We have to trigger immediate change detection or the element would blink.
    this.cdr.detectChanges();
  }

  setOverlayOrigin(origin: ElementRef<HTMLElement>): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.nzOverlayClickable) {
      return;
    }
    const target = _getEventTarget(event);
    if (!this.origin.nativeElement.contains(target) && this.nzTrigger !== null) {
      this.hide();
    }
  }

  /**
   * Hide the component while the content is empty.
   */
  private updateVisibilityByTitle(): void {
    if (this.isEmpty()) {
      this.hide();
    }
  }

  protected updateStyles(): void {
    this._classMap = {
      ...this.transformClassListToMap(this.nzOverlayClassName),
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true
    };
  }

  protected transformClassListToMap(klass: string): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    /**
     * @see https://github.com/angular/angular/blob/f6e97763cfab9fa2bea6e6b1303b64f1b499c3ef/packages/common/src/directives/ng_class.ts#L92
     */
    const classes = klass !== null ? klass.split(/\s+/) : [];
    classes.forEach(className => (result[className] = true));
    return result;
  }

  /**
   * Empty component cannot be opened.
   */
  protected abstract isEmpty(): boolean;
}

export function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean {
  return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
