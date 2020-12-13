/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { DEFAULT_TOOLTIP_POSITIONS, getPlacementName, POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { BooleanInput, NgClassInterface, NgStyleInterface, NzSafeAny, NzTSType } from 'ng-zorro-antd/core/types';
import { isNotNil, toBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

export interface PropertyMapping {
  [key: string]: [string, () => unknown];
}

export type NzTooltipTrigger = 'click' | 'focus' | 'hover' | null;

@Directive()
export abstract class NzTooltipBaseDirective implements OnChanges, OnDestroy, AfterViewInit {
  directiveTitle?: NzTSType | null;
  directiveContent?: NzTSType | null;
  title?: NzTSType | null;
  content?: NzTSType | null;
  trigger?: NzTooltipTrigger;
  placement?: string | string[];
  origin?: ElementRef<HTMLElement>;
  visible?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: NgStyleInterface;
  visibleChange = new EventEmitter<boolean>();

  /**
   * For create tooltip dynamically. This should be override for each different component.
   */
  protected componentFactory!: ComponentFactory<NzTooltipBaseComponent>;

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

  private internalVisible = false;

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      noAnimation: ['noAnimation', () => this.noAnimation]
    };
  }

  component?: NzTooltipBaseComponent;

  protected readonly destroy$ = new Subject<void>();
  protected readonly triggerDisposables: Array<() => void> = [];

  private delayTimer?: number;

  constructor(
    public elementRef: ElementRef,
    protected hostView: ViewContainerRef,
    protected resolver: ComponentFactoryResolver,
    protected renderer: Renderer2,
    protected noAnimation?: NzNoAnimationDirective
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { specificTrigger } = changes;

    if (specificTrigger && !specificTrigger.isFirstChange()) {
      this.registerTriggers();
    }

    if (this.component) {
      this.updatePropertiesByChanges(changes);
    }
  }

  ngAfterViewInit(): void {
    this.createComponent();
    this.registerTriggers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Clear toggling timer. Issue #3875 #4317 #4386
    this.clearTogglingTimer();
    this.removeTriggerListeners();
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
   * Create a dynamic tooltip component. This method can be override.
   */
  protected createComponent(): void {
    const componentRef = this.hostView.createComponent(this.componentFactory);

    this.component = componentRef.instance as NzTooltipBaseComponent;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
    this.component.setOverlayOrigin({ elementRef: this.origin || this.elementRef });

    this.initProperties();

    this.component.nzVisibleChange.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((visible: boolean) => {
      this.internalVisible = visible;
      this.visibleChange.emit(visible);
    });
  }

  protected registerTriggers(): void {
    // When the method gets invoked, all properties has been synced to the dynamic component.
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
      this.triggerDisposables.push(this.renderer.listen(el, 'focus', () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, 'blur', () => this.hide()));
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
      ...this.getProxyPropertyMap()
    };

    (keys || Object.keys(mappingProperties).filter(key => !key.startsWith('directive'))).forEach((property: NzSafeAny) => {
      if (mappingProperties[property]) {
        const [name, valueFn] = mappingProperties[property];
        this.updateComponentValue(name, valueFn());
      }
    });

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
      // (may caused by the fade-out animation).
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
// tslint:disable-next-line:directive-class-suffix
export abstract class NzTooltipBaseComponent implements OnDestroy, OnInit {
  static ngAcceptInputType_nzVisible: BooleanInput;

  @ViewChild('overlay', { static: false }) overlay!: CdkConnectedOverlay;

  nzTitle: NzTSType | null = null;
  nzContent: NzTSType | null = null;
  nzOverlayClassName!: string;
  nzOverlayStyle: NgStyleInterface = {};
  nzMouseEnterDelay?: number;
  nzMouseLeaveDelay?: number;

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

  set nzPlacement(value: string[]) {
    const preferredPosition = value.map(placement => POSITION_MAP[placement]);
    this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
  }

  preferredPlacement: string = 'top';

  origin!: CdkOverlayOrigin;

  public dir: Direction = 'ltr';

  _classMap: NgClassInterface = {};

  _hasBackdrop = false;

  _prefix = 'ant-tooltip';

  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];

  private destroy$ = new Subject<void>();

  constructor(
    public cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    public noAnimation?: NzNoAnimationDirective
  ) { }
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.nzVisibleChange.complete();
    this.destroy$.next();
    this.destroy$.complete();
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

  updateStyles(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.origin.elementRef.nativeElement.contains(event.target)) {
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

  /**
   * Empty component cannot be opened.
   */
  protected abstract isEmpty(): boolean;
}

export function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean {
  return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
