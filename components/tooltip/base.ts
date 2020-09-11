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
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
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
  specificTitle?: NzTSType | null;
  directiveNameContent?: NzTSType | null;
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
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   * Please use a more specific API. Like `nzTooltipTitle`.
   */
  @Input() nzTitle?: NzTSType | null;

  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   * Please use a more specific API. Like `nzPopoverContent`.
   */
  @Input() nzContent?: NzTSType | null;

  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   * Please use a more specific API. Like `nzTooltipTrigger`.
   */
  @Input() nzTrigger: NzTooltipTrigger = 'hover';

  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   * Please use a more specific API. Like `nzTooltipPlacement`.
   */
  @Input() nzPlacement: string = 'top';

  @Input() nzMouseEnterDelay?: number;
  @Input() nzMouseLeaveDelay?: number;
  @Input() nzOverlayClassName?: string;
  @Input() nzOverlayStyle?: NgStyleInterface;
  @Input() nzVisible?: boolean;

  /**
   * For create tooltip dynamically. This should be override for each different component.
   */
  protected componentFactory!: ComponentFactory<NzTooltipBaseComponent>;

  /**
   * This true title that would be used in other parts on this component.
   */
  protected get title(): NzTSType | null {
    return this.specificTitle || this.directiveNameTitle || this.nzTitle || null;
  }

  protected get content(): NzTSType | null {
    return this.specificContent || this.directiveNameContent || this.nzContent || null;
  }

  protected get placement(): string {
    return this.specificPlacement || this.nzPlacement;
  }

  protected get trigger(): NzTooltipTrigger {
    // NzTooltipTrigger can be null.
    return typeof this.specificTrigger !== 'undefined' ? this.specificTrigger : this.nzTrigger;
  }

  protected get isVisible(): boolean {
    return this.specificVisible || this.nzVisible || false;
  }

  protected get mouseEnterDelay(): number {
    return this.specificMouseEnterDelay || this.nzMouseEnterDelay || 0.15;
  }

  protected get mouseLeaveDelay(): number {
    return this.specificMouseLeaveDelay || this.nzMouseLeaveDelay || 0.1;
  }

  protected get overlayClassName(): string | null {
    return this.specificOverlayClassName || this.nzOverlayClassName || null;
  }

  protected get overlayStyle(): NgStyleInterface | null {
    return this.specificOverlayStyle || this.nzOverlayStyle || null;
  }

  visible = false;
  protected needProxyProperties = ['noAnimation'];

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

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

  warnDeprecationIfNeeded(
    isNeeded: boolean,
    property: string,
    newProperty: string,
    comp: string = 'nz-tooltip',
    shared: boolean = true
  ): void {
    if (isNeeded) {
      let message = `'${property}' of '${comp}' is deprecated and will be removed in 10.0.0.
      Please use '${newProperty}' instead.`;

      if (shared) {
        message = `${message} The same with 'nz-popover' and 'nz-popconfirm'.`;
      }
      warnDeprecation(message);
    }
  }

  warnDeprecationByChanges(changes: SimpleChanges): void {
    // warn deprecated things when specific property is not given
    this.warnDeprecationIfNeeded(changes.nzTitle && !this.specificTitle && !this.directiveNameTitle, 'nzTitle', 'nzTooltipTitle');
    this.warnDeprecationIfNeeded(changes.nzContent && !this.specificContent, 'nzContent', 'nzPopoverContent', 'nz-popover', false);
    this.warnDeprecationIfNeeded(changes.nzPlacement && !this.specificPlacement, 'nzPlacement', 'nzTooltipPlacement');
    this.warnDeprecationIfNeeded(changes.nzTrigger && !this.specificTrigger, 'nzTrigger', 'nzTooltipTrigger');
    this.warnDeprecationIfNeeded(changes.nzVisible && !this.specificVisible, 'nzVisible', 'nzTooltipVisible');
    this.warnDeprecationIfNeeded(
      changes.nzMouseEnterDelay && !this.specificMouseEnterDelay,
      'nzMouseEnterDelay',
      'nzTooltipMouseEnterDelay'
    );
    this.warnDeprecationIfNeeded(
      changes.nzMouseLeaveDelay && !this.specificMouseLeaveDelay,
      'nzMouseLeaveDelay',
      'nzTooltipMouseLeaveDelay'
    );
    this.warnDeprecationIfNeeded(changes.nzOverlayClassName && !this.specificOverlayClassName, 'nzOverlayClassName', 'nzTooltipClassName');
    this.warnDeprecationIfNeeded(changes.nzOverlayStyle && !this.specificOverlayStyle, 'nzOverlayStyle', 'nzTooltipOverlayStyle');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTrigger, specificTrigger } = changes;
    const trigger = specificTrigger || nzTrigger;

    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }

    if (this.component) {
      this.updateChangedProperties(changes);
    }

    this.warnDeprecationByChanges(changes);
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

    this.component = componentRef.instance;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
    this.component.setOverlayOrigin({ elementRef: this.specificOrigin || this.elementRef });

    this.updateChangedProperties(this.needProxyProperties);

    this.component.nzVisibleChange.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((visible: boolean) => {
      this.visible = visible;
      this.specificVisibleChange.emit(visible);
      this.nzVisibleChange.emit(visible);
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
        this.renderer.listen(el, 'click', e => {
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
      nzTitle: ['nzTitle', this.title],
      specificContent: ['nzContent', this.content],
      directiveNameContent: ['nzContent', this.content],
      nzContent: ['nzContent', this.content],
      specificTrigger: ['nzTrigger', this.trigger],
      nzTrigger: ['nzTrigger', this.trigger],
      specificPlacement: ['nzPlacement', this.placement],
      nzPlacement: ['nzPlacement', this.placement],
      specificVisible: ['nzVisible', this.isVisible],
      nzVisible: ['nzVisible', this.isVisible],
      specificMouseEnterDelay: ['nzMouseEnterDelay', this.mouseEnterDelay],
      nzMouseEnterDelay: ['nzMouseEnterDelay', this.mouseEnterDelay],
      specificMouseLeaveDelay: ['nzMouseLeaveDelay', this.mouseLeaveDelay],
      nzMouseLeaveDelay: ['nzMouseLeaveDelay', this.mouseLeaveDelay],
      specificOverlayClassName: ['nzOverlayClassName', this.overlayClassName],
      nzOverlayClassName: ['nzOverlayClassName', this.overlayClassName],
      specificOverlayStyle: ['nzOverlayStyle', this.overlayStyle],
      nzOverlayStyle: ['nzOverlayStyle', this.overlayStyle]
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

  nzVisibleChange = new Subject<boolean>();
  nzTitle: NzTSType | null = null;
  nzContent: NzTSType | null = null;
  nzOverlayClassName!: string;
  nzOverlayStyle: NgStyleInterface = {};
  nzMouseEnterDelay?: number;
  nzMouseLeaveDelay?: number;

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
      this._positions = [POSITION_MAP[this.nzPlacement], ...this._positions];
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
