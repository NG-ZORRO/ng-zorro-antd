/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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

export type NzTooltipTrigger = 'click' | 'focus' | 'hover' | null;

@Directive()
export abstract class NzTooltipBaseDirective implements OnChanges, OnDestroy, AfterViewInit {
  directiveNameTitle?: NzTSType | null;
  directiveNameContent?: NzTSType | null;
  specificTitle?: NzTSType | null;
  specificContent?: NzTSType | null;
  specificTrigger?: NzTooltipTrigger;
  specificPlacement?: string;
  specificOrigin?: ElementRef<HTMLElement>;
  specificVisible?: boolean;
  specificMouseEnterDelay?: number;
  specificMouseLeaveDelay?: number;
  specificOverlayClassName?: string;
  specificOverlayStyle?: NgStyleInterface;
  specificVisibleChange = new EventEmitter<boolean>();

  /**
   * For create tooltip dynamically. This should be override for each different component.
   */
  protected componentFactory!: ComponentFactory<NzTooltipBaseComponent>;

  /**
   * This true title that would be used in other parts on this component.
   */
  protected get title(): NzTSType | null {
    return this.specificTitle || this.directiveNameTitle || null;
  }

  protected get content(): NzTSType | null {
    return this.specificContent || this.directiveNameContent || null;
  }

  protected get trigger(): NzTooltipTrigger {
    return typeof this.specificTrigger !== 'undefined' ? this.specificTrigger : 'hover';
  }

  protected get placement(): string {
    return this.specificPlacement || 'top';
  }

  protected get isVisible(): boolean {
    return this.specificVisible || false;
  }

  protected get mouseEnterDelay(): number {
    return this.specificMouseEnterDelay || 0.15;
  }

  protected get mouseLeaveDelay(): number {
    return this.specificMouseLeaveDelay || 0.1;
  }

  protected get overlayClassName(): string | null {
    return this.specificOverlayClassName || null;
  }

  protected get overlayStyle(): NgStyleInterface | null {
    return this.specificOverlayStyle || null;
  }

  visible = false;
  protected needProxyProperties = ['noAnimation'];

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
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { specificTrigger } = changes;

    if (specificTrigger && !specificTrigger.isFirstChange()) {
      this.registerTriggers();
    }

    if (this.component) {
      this.updateChangedProperties(changes);
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
    this.component.setOverlayOrigin({ elementRef: this.specificOrigin || this.elementRef });

    this.updateChangedProperties(this.needProxyProperties);

    this.component.nzVisibleChange.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((visible: boolean) => {
      this.visible = visible;
      this.specificVisibleChange.emit(visible);
    });
  }

  protected registerTriggers(): void {
    // When the method gets invoked, all properties has been synced to the dynamic component.
    // After removing the old API, we can just check the directive's own `nzTrigger`.
    const el = this.elementRef.nativeElement;
    const trigger = this.specificTrigger;

    this.removeTriggerListeners();

    if (trigger === 'hover') {
      let overlayElement: HTMLElement;
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseenter', () => {
          this.delayEnterLeave(true, true, this.mouseEnterDelay);
        })
      );
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseleave', () => {
          this.delayEnterLeave(true, false, this.mouseLeaveDelay);
          if (this.component?.overlay.overlayRef && !overlayElement) {
            overlayElement = this.component.overlay.overlayRef.overlayElement;
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseenter', () => {
                this.delayEnterLeave(false, true);
              })
            );
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseleave', () => {
                this.delayEnterLeave(false, false);
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
    } // Else do nothing because user wants to control the visibility programmatically.
  }

  updatePropertiesByChanges(changes: SimpleChanges): void {
    const properties = {
      specificTitle: ['nzTitle', this.title],
      directiveNameTitle: ['nzTitle', this.title],
      specificContent: ['nzContent', this.content],
      directiveNameContent: ['nzContent', this.content],
      specificTrigger: ['nzTrigger', this.trigger],
      specificPlacement: ['nzPlacement', this.placement],
      specificVisible: ['nzVisible', this.isVisible],
      specificMouseEnterDelay: ['nzMouseEnterDelay', this.mouseEnterDelay],
      specificMouseLeaveDelay: ['nzMouseLeaveDelay', this.mouseLeaveDelay],
      specificOverlayClassName: ['nzOverlayClassName', this.overlayClassName],
      specificOverlayStyle: ['nzOverlayStyle', this.overlayStyle]
    };

    const keys = Object.keys(changes);
    keys.forEach((property: NzSafeAny) => {
      // @ts-ignore
      if (properties[property]) {
        // @ts-ignore
        const [name, value] = properties[property];
        this.updateComponentValue(name, value);
      }
    });
  }

  updatePropertiesByArray(): void {
    this.updateComponentValue('nzTitle', this.title);
    this.updateComponentValue('nzContent', this.content);
    this.updateComponentValue('nzPlacement', this.placement);
    this.updateComponentValue('nzTrigger', this.trigger);
    this.updateComponentValue('nzVisible', this.isVisible);
    this.updateComponentValue('nzMouseEnterDelay', this.mouseEnterDelay);
    this.updateComponentValue('nzMouseLeaveDelay', this.mouseLeaveDelay);
    this.updateComponentValue('nzOverlayClassName', this.overlayClassName);
    this.updateComponentValue('nzOverlayStyle', this.overlayStyle);
  }
  /**
   * Sync changed properties to the component and trigger change detection in that component.
   */
  protected updateChangedProperties(propertiesOrChanges: string[] | SimpleChanges): void {
    const isArray = Array.isArray(propertiesOrChanges);
    const keys = isArray ? (propertiesOrChanges as string[]) : Object.keys(propertiesOrChanges);

    keys.forEach((property: NzSafeAny) => {
      if (this.needProxyProperties.indexOf(property) !== -1) {
        // @ts-ignore
        this.updateComponentValue(property, this[property]);
      }
    });
    if (isArray) {
      this.updatePropertiesByArray();
    } else {
      this.updatePropertiesByChanges(propertiesOrChanges as SimpleChanges);
    }
    this.component?.updateByDirective();
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
export abstract class NzTooltipBaseComponent implements OnDestroy {
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
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): NzTooltipTrigger {
    return this._trigger;
  }

  protected _trigger: NzTooltipTrigger = 'hover';

  set nzPlacement(value: string) {
    if (value !== this.preferredPlacement) {
      this.preferredPlacement = value;
      this._positions = [POSITION_MAP[this.nzPlacement], ...DEFAULT_TOOLTIP_POSITIONS];
    }
  }

  get nzPlacement(): string {
    return this.preferredPlacement;
  }

  origin!: CdkOverlayOrigin;
  preferredPlacement = 'top';

  _classMap: NgClassInterface = {};
  _hasBackdrop = false;
  _prefix = 'ant-tooltip-placement';
  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];

  constructor(public cdr: ChangeDetectorRef, public noAnimation?: NzNoAnimationDirective) {}

  ngOnDestroy(): void {
    this.nzVisibleChange.complete();
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
    this.setClassMap();
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
    this.setClassMap();
    this.cdr.detectChanges();
  }

  setClassMap(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-${this.preferredPlacement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
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
