import { TemplateRef, ComponentRef, Renderer2 } from '@angular/core';
import {
  OverlayRef,
  Overlay,
  OverlayState,
  OverlayOrigin,
  ConnectedPositionStrategy,
  PositionStrategy
} from '../overlay/index';
import {
  TemplatePortal,
  ComponentPortal,
  Portal,
  Direction,
  ESCAPE
} from '@angular/cdk';
import { Subscription } from 'rxjs/Subscription';
import {
  FloaterProps,
  FloaterOptions,
  ConnectedPositionOptions,
} from './floater-props';

/**
 * Floater object to manage overlay (Enhanced verion of ConnectedOverlayDirective)
 * NOTE: don't like ConnectedOverlayDirective, Floater has no dependencies with directive (such as Component, Directive ...)
 *  but this will means that you should destroy it and incidental resources manually using destroy() method!
 */
export class Floater<T> {
  private _props: FloaterProps<T>;
  private _overlayRef: OverlayRef;
  private _attachedResult: ComponentRef<T> | Map<string, any>;
  private _contentPortal: Portal<any>;
  private _backdropSubscription: Subscription | null;
  private _positionSubscription: Subscription;
  private _escapeListener: Function;
  private _stateAttached = false; // State to prevent duplicated attaching/detaching
  private _stateDestroyed = false; // State to prevent duplicated destroying

  // The associated overlay reference
  get overlayRef(): OverlayRef {
    return this._overlayRef;
  }

  // The attached component ref or template locals(haven't done yet)
  get attachedResult() {
    return this._attachedResult;
  }

  // The element's layout direction && The direction of the text in the overlay panel
  get dir(): Direction {
    return this._props.dir ? this._props.dir.value : 'ltr';
  }

  constructor(private _overlay: Overlay,
              private _renderer: Renderer2 | Document,
              options: FloaterOptions<T>) {

    this._props = new FloaterProps(options);
    const { content, viewContainerRef, injector } = this._props;

    if (content instanceof TemplateRef) {
      this._contentPortal = new TemplatePortal(content, viewContainerRef);
    } else if (typeof content === 'function') { // Assume all functions stand as component
      this._contentPortal = new ComponentPortal(content, viewContainerRef, injector);
    } else {
      throw new Error('[Floater] Not support "content" type.');
    }
  }

  // Get attached component's instance
  getComponentInstance() {
    if (!this._isCreatedByComponent()) {
      throw new Error(`Cant't get ComponentRef when created without ComponentType (Should fill the "content" option with value of ComponentType)`);
    }
    return (<ComponentRef<T>>this.attachedResult).instance;
  }

  attach(): this {
    if (!this._stateAttached) {
      this._stateAttached = true;
      this._attachOverlay();
    }
    return this;
  }

  detach(): this {
    if (this._stateAttached) {
      this._stateAttached = false;
      this._detachOverlay();
    }
    return this;
  }

  destroy(): this {
    if (!this._stateDestroyed) {
      this._stateDestroyed = true;
      this._destroyOverlay();
    }
    return this;
  }

  // Attaches the overlay and subscribes to backdrop clicks if backdrop exists
  private _attachOverlay() {
    // console.log('[Floater] Attach overlay');

    const { hasBackdrop, backdropClick, attach, persist } = this._props;
    if (!this._overlayRef) {
      this._createOverlay();
    }

    const position = this._props.getPositionStrategy();
    if (position instanceof ConnectedPositionStrategy) {
      position.withDirection(this.dir);
    }

    this._overlayRef.getState().direction = this.dir;
    if (!persist) {
      this._initEscapeListener();
    }

    if (!this._overlayRef.hasAttached()) {
      this._attachedResult = this._overlayRef.attach(this._contentPortal);
      if (this._isCreatedByComponent()) {
        this._handleAttachedComponent(this._attachedResult as ComponentRef<T>);
      }
      if (attach) {
        attach.emit();
      }
    }

    if (hasBackdrop && backdropClick) {
      this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
        backdropClick.emit();
      });
    }
  }

  // Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
  private _detachOverlay() {
    // console.log('[Floater] Detach overlay');

    const { detach } = this._props;
    if (this._overlayRef) {
      this._overlayRef.detach();
      if (detach) {
        detach.emit();
      }
    }

    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
      this._backdropSubscription = null;
    }

    if (this._escapeListener) {
      this._escapeListener();
      this._escapeListener = null;
    }
  }

  // Destroys the overlay created by this directive
  private _destroyOverlay() {
    // console.log('[Floater] Destroy overlay');

    if (this._overlayRef) {
      this.overlayRef.dispose();
    }

    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }

    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe();
    }

    if (this._escapeListener) {
      this._escapeListener();
    }

    this._props.destroy();
  }

  // Creates an overlay
  private _createOverlay() {
    this._overlayRef = this._overlay.create(this._buildConfig(), this._props.paneClass);
  }

  // Builds the overlay config based on the directive's inputs
  private _buildConfig(): OverlayState {
    const overlayConfig = new OverlayState();
    const { width, height, minWidth, minHeight, hasBackdrop, backdropClass } = this._props;

    if (width || width === 0) {
      overlayConfig.width = width;
    }
    if (height || height === 0) {
      overlayConfig.height = height;
    }
    if (minWidth || minWidth === 0) {
      overlayConfig.minWidth = minWidth;
    }
    if (minHeight || minHeight === 0) {
      overlayConfig.minHeight = minHeight;
    }

    overlayConfig.hasBackdrop = hasBackdrop;

    if (backdropClass) {
      overlayConfig.backdropClass = backdropClass;
    }

    const strategy = this._createPositionStrategy();
    if (strategy) {
      this._props.setPositionStrategy(strategy);
      overlayConfig.positionStrategy = strategy;
      // Use noop scroll strategy by default
      overlayConfig.scrollStrategy =
        this._props.scrollStrategy ? this._props.scrollStrategy : this._overlay.scrollStrategies.noop();
    }

    return overlayConfig;
  }

  // Returns the position strategy of the overlay to be set on the overlay config
  private _createPositionStrategy(): PositionStrategy {
    const { positionStrategyType: strategyType, positionStrategyOptions: strategyOptions } = this._props;

    let strategy = null;
    if (strategyType === 'connected') { // Using ConnectedPositionStrategy
      const { positions, origin, offsetX, offsetY } = strategyOptions as ConnectedPositionOptions;
      const pos = positions[0];
      const originPoint = { originX: pos.originX, originY: pos.originY };
      const overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
      const elementRef = origin instanceof OverlayOrigin ? origin.elementRef : origin;
      strategy = this._overlay.position()
        .connectedTo(elementRef, originPoint, overlayPoint)
        .withOffsetX(offsetX || 0)
        .withOffsetY(offsetY || 0);

      this._handlePositionChanges(strategy);

      if (!this._props.scrollStrategy) { // Default scroll strategy for ConnectedPositionStrategy
        this._props.scrollStrategy = this._overlay.scrollStrategies.reposition();
      }
    } else if (strategyType === 'free') { // Using FreePositionStrategy
      strategy = this._overlay.position().free();
    }

    return strategy;
  }

  // For ConnectedPositionStrategy ONLY
  private _handlePositionChanges(strategy: ConnectedPositionStrategy): void {
    const { positionStrategyOptions: strategyOptions, positionChange } = this._props;
    const positions = (<ConnectedPositionOptions>strategyOptions).positions;
    for (let i = 1; i < positions.length; i++) {
      strategy.withFallbackPosition(
        { originX: positions[i].originX, originY: positions[i].originY },
        { overlayX: positions[i].overlayX, overlayY: positions[i].overlayY }
      );
    }

    if (positionChange) {
      this._positionSubscription =
        strategy.onPositionChange.subscribe(pos => positionChange.emit(pos));
    }
  }

  // Return if the floater is initialized by dynamic Component
  private _isCreatedByComponent() {
    return this._contentPortal instanceof ComponentPortal;
  }

  // Other works after creating component
  private _handleAttachedComponent(componentRef: ComponentRef<T>) {
    const instance = componentRef.instance, afterComponentCreated = this._props.afterComponentCreated;

    if (afterComponentCreated) {
      afterComponentCreated(instance);
    }
  }

  // Sets the event listener that closes the overlay when pressing Escape
  private _initEscapeListener() {
    const listener = (event: KeyboardEvent) => {
      if (event.keyCode === ESCAPE) {
        this._detachOverlay();
      }
    };

    if (this._renderer instanceof Renderer2) {
      this._escapeListener = this._renderer.listen('document', 'keydown', listener);
    } else if (this._renderer instanceof Document) {
      // console.log('[Floater/_initEscapeListener]use document', this._renderer);
      this._renderer.addEventListener('keydown', listener);
      this._escapeListener = () => {
        (<Document>this._renderer).removeEventListener('keydown', listener);
      };
    }
  }

}
