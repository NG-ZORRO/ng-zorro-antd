import {
  ElementRef,
  EventEmitter,
  TemplateRef,
  Type,
  ViewContainerRef,
  Injector,
  Component
} from '@angular/core';
import {
  OverlayOrigin,
  ConnectionPositionPair,
  ConnectedPositionStrategy,
  PositionStrategy,
  ConnectedOverlayPositionChange,
  ScrollStrategy
} from '../overlay/index';
import { ComponentType, Directionality } from '@angular/cdk';
import { Subscription } from 'rxjs/Subscription';

// Coerces a data-bound value (typically a string) to a boolean
function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

// Default set of positions for the overlay. Follows the behavior of a dropdown
const defaultPositionList = [
  new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'start', overlayY: 'top' }
  ),
  new ConnectionPositionPair(
    { originX: 'start', originY: 'top' },
    { overlayX: 'start', overlayY: 'bottom' }
  )
];

export type FloaterContent<T> = TemplateRef<T> | ComponentType<T>;

export type PositionStrategyType = 'connected' | 'free';

export type PositionStrategyOptions = ConnectedPositionOptions | FreePositionOptions;

export type FloaterOrigin = OverlayOrigin | ElementRef;

export interface ConnectedPositionOptions {
  // Origin for the connected overlay
  origin: FloaterOrigin;

  // Registered connected position pairs
  positions?: ConnectionPositionPair[];

  // The offset in pixels for the overlay connection point on the x-axis
  offsetX?: number;

  // The offset in pixels for the overlay connection point on the y-axis
  offsetY?: number;
}

export interface FreePositionOptions {
  [index: string]: any; // Fake
  // TODO
}

// Options for floater (NOTE: don't like ConnectedOverlayDirective's @Input, normally, these options will be only used once at the initializing time)
export class FloaterOptions<T> {
  // ---------------------------------------------------------
  // | Configurations
  // ---------------------------------------------------------

  // Current position strategy
  positionStrategyType?: PositionStrategyType = 'connected';

  // Position strategy options
  positionStrategyOptions?: PositionStrategyOptions;

  // Used for:
  // 1. The element's layout direction
  // 2. The direction of the text in the overlay panel
  dir?: Directionality;

  // The width of the overlay panel
  width?: number | string;

  // The height of the overlay panel
  height?: number | string;

  // The min width of the overlay panel
  minWidth?: number | string;

  // The min height of the overlay panel
  minHeight?: number | string;

  // The custom class to be set on the backdrop element
  backdropClass?: string;

  // The custom class to be set on the pane element
  paneClass?: string;

  // Strategy to be used when handling scroll events while the overlay is open
  scrollStrategy?: ScrollStrategy;

  // Whether or not the overlay should attach a backdrop
  hasBackdrop?: boolean;

  // Content to be floated
  content?: FloaterContent<T>;

  // View container that the content will appended to
  viewContainerRef?: ViewContainerRef;

  // [ONLY under "content"=ComponentType] Injector for dynamic creating component
  injector?: Injector;

  // [ONLY under "content"=ComponentType] Callback at the moment the component is dynamiclly created (before its ngOnInit())
  afterComponentCreated?: (instance: T) => void;

  // Whether keep overlay existing except call detach() or destroy() manually
  persist? = false;

  // ---------------------------------------------------------
  // | Emitters
  // ---------------------------------------------------------

  // Event emitted when the backdrop is clicked
  backdropClick? = new EventEmitter<void>();

  // Event emitted when the position has changed
  positionChange? = new EventEmitter<ConnectedOverlayPositionChange>();

  // Event emitted when the overlay has been attached
  attach? = new EventEmitter<void>();

  // Event emitted when the overlay has been detached
  detach? = new EventEmitter<void>();

  // ---------------------------------------------------------
  // | Event listener (against to Emitters, normally used when provide floater as service)
  // ---------------------------------------------------------
  onBackdropClick?: () => void;
  onPositionChange?: (change: ConnectedOverlayPositionChange) => void;
  onAttach?: () => void;
  onDetach?: () => void;
}

// Inner properties manager for floater
export class FloaterProps<T> extends FloaterOptions<T> {
  private _hasBackdrop = false;
  private _position: PositionStrategy;
  private _emitterSubscriptions: Subscription[] = [];

  get hasBackdrop() {
    return this._hasBackdrop;
  }
  set hasBackdrop(value: any) {
    this._hasBackdrop = coerceBooleanProperty(value);
  }

  // Options validator
  constructor(options: FloaterOptions<T>) {
    super();

    // Validating
    this._validateOptions(options);

    // Merge options
    Object.assign(this, options);

    // Default values
    this._initDefaultOptions();

    // Event listeners
    this._initEventListeners();
  }

  private _validateOptions(options: FloaterOptions<T>) {
    if (!options.content) {
      throw new Error('[FloaterOptions] "content" is required.');
    }
    if (options.content instanceof TemplateRef && !options.viewContainerRef) {
      throw new Error('[FloaterOptions] "viewContainerRef" is required for "content" of TemplateRef.');
    }
    if (options.positionStrategyType === 'connected' && !options.positionStrategyOptions) {
      throw new Error('[FloaterOptions] "positionStrategyOptions" can\'t be empty when position strategy type is "connected".');
    }
  }

  private _initDefaultOptions() {
    const strategyOptions = this.positionStrategyOptions as ConnectedPositionOptions;
    if (this.positionStrategyType === 'connected') {
      if (!strategyOptions.positions || !strategyOptions.positions.length) {
        strategyOptions.positions = defaultPositionList;
      }
    }
  }

  private _initEventListeners() {
    const subscriptions = this._emitterSubscriptions;
    if (this.onBackdropClick) {
      subscriptions.push(this.backdropClick.subscribe(this.onBackdropClick));
    }
    if (this.onPositionChange) {
      subscriptions.push(this.positionChange.subscribe(this.onPositionChange));
    }
    if (this.onAttach) {
      subscriptions.push(this.attach.subscribe(this.onAttach));
    }
    if (this.onDetach) {
      subscriptions.push(this.detach.subscribe(this.onDetach));
    }
  }

  // ---------------------------------------------------------
  // | Public methods
  // ---------------------------------------------------------

  // Set current position strategy
  setPositionStrategy(position: PositionStrategy) {
    this._position = position;
  }
  getPositionStrategy(): PositionStrategy {
    return this._position;
  }

  // Destory all resources
  destroy() {
    this._emitterSubscriptions.forEach(subscription => subscription.unsubscribe());
    this._emitterSubscriptions = null;
  }
}
