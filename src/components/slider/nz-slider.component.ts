/* tslint:disable:variable-name */
import {
  forwardRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { pluck } from 'rxjs/operators/pluck';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { tap } from 'rxjs/operators/tap';
import { toBoolean } from '../util/convert';
import { Marks, MarksArray } from './nz-slider-marks.component';
import { NzSliderService } from './nz-slider.service';

export type SliderValue = number[] | number;

export class SliderHandle {
  offset: number;
  value: number;
  active: boolean;
}

@Component({
  selector     : 'nz-slider',
  encapsulation: ViewEncapsulation.None,
  providers    : [ {
    provide    : NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NzSliderComponent),
    multi      : true
  } ],
  template     : `
    <div #slider [ngClass]="classMap">
      <div class="ant-slider-rail"></div>
      <nz-slider-track
        nzClassName="{{prefixCls}}-track"
        [nzVertical]="nzVertical"
        [nzIncluded]="nzIncluded"
        [nzOffset]="track.offset"
        [nzLength]="track.length"
      ></nz-slider-track>
      <nz-slider-step *ngIf="marksArray"
        nzPrefixCls="{{prefixCls}}"
        [nzVertical]="nzVertical"
        [nzLowerBound]="bounds.lower"
        [nzUpperBound]="bounds.upper"
        [nzMarksArray]="marksArray"
        [nzIncluded]="nzIncluded"
      ></nz-slider-step>
      <nz-slider-handle
        *ngFor="let handle of handles;"
        nzClassName="{{prefixCls}}-handle"
        [nzVertical]="nzVertical"
        [nzOffset]="handle.offset"
        [nzValue]="handle.value"
        [nzActive]="handle.active"
        [nzTipFormatter]="nzTipFormatter"
      ></nz-slider-handle>
      <nz-slider-marks *ngIf="marksArray"
        nzClassName="{{prefixCls}}-mark"
        [nzVertical]="nzVertical"
        [nzMin]="nzMin"
        [nzMax]="nzMax"
        [nzLowerBound]="bounds.lower"
        [nzUpperBound]="bounds.upper"
        [nzMarksArray]="marksArray"
        [nzIncluded]="nzIncluded"
      ></nz-slider-marks>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {

  // Debugging
  @Input() nzDebugId: number | string = null; // set this id will print debug informations to console

  // Dynamic property settings
  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  // Static configurations (properties that can only specify once)
  @Input() nzStep = 1;
  @Input() nzMarks: Marks = null;
  @Input() nzMin = 0;
  @Input() nzMax = 100;
  @Input() nzDefaultValue: SliderValue = null;
  @Input() nzTipFormatter: (value: number) => string;
  @Output() nzOnAfterChange = new EventEmitter<SliderValue>();

  @Input()
  set nzVertical(value: boolean) {
    this._vertical = toBoolean(value);
  }

  get nzVertical(): boolean {
    return this._vertical;
  }

  @Input()
  set nzRange(value: boolean) {
    this._range = toBoolean(value);
  }

  get nzRange(): boolean {
    return this._range;
  }

  @Input()
  set nzDots(value: boolean) {
    this._dots = toBoolean(value);
  }

  get nzDots(): boolean {
    return this._dots;
  }

  @Input()
  set nzIncluded(value: boolean) {
    this._included = toBoolean(value);
  }

  get nzIncluded(): boolean {
    return this._included;
  }

  // Inside properties
  private _disabled = false;
  private _dots = false;
  private _included = true;
  private _range = false;
  private _vertical = false;

  value: SliderValue = null; // CORE value state
  @ViewChild('slider') slider: ElementRef;
  sliderDOM: HTMLDivElement;
  cacheSliderStart: number = null;
  cacheSliderLength: number = null;
  prefixCls = 'ant-slider';
  classMap: object;
  activeValueIndex: number = null; // Current activated handle's index ONLY for range=true
  track = { offset: null, length: null }; // Track's offset and length
  handles: SliderHandle[]; // Handles' offset
  marksArray: Marks[]; // "marks" in array type with more data & FILTER out the invalid mark
  bounds = { lower: null, upper: null }; // now for nz-slider-step
  onValueChange: (value: SliderValue) => void; // Used by ngModel. BUG: onValueChange() will not success to effect the "value" variable ( [(ngModel)]="value" ) when the first initializing, except using "nextTick" functionality (MAY angular2's problem ?)
  isDragging = false; // Current dragging state

  // Events observables & subscriptions
  dragstart$: Observable<number>;
  dragmove$: Observable<number>;
  dragend$: Observable<number>;
  dragstart_: Subscription;
  dragmove_: Subscription;
  dragend_: Subscription;

  // |--------------------------------------------------------------------------------------------
  // | value accessors & ngModel accessors
  // |--------------------------------------------------------------------------------------------

  setValue(val: SliderValue, isWriteValue: boolean = false): void {
    if (isWriteValue) { // [ngModel-writeValue]: Formatting before setting value, always update current value, but trigger onValueChange ONLY when the "formatted value" not equals "input value"
      this.value = this.formatValue(val);
      this.log(`[ngModel:setValue/writeValue]Update track & handles`);
      this.updateTrackAndHandles();
      // if (!this.isValueEqual(this.value, val)) {
      //   this.log(`[ngModel:setValue/writeValue]onValueChange`, val);
      //   if (this.onValueChange) { // NOTE: onValueChange will be unavailable when writeValue() called at the first time
      //     this.onValueChange(this.value);
      //   }
      // }
    } else { // [Normal]: setting value, ONLY check changed, then update and trigger onValueChange
      if (!this.isValueEqual(this.value, val)) {
        this.value = val;
        this.log(`[Normal:setValue]Update track & handles`);
        this.updateTrackAndHandles();
        this.log(`[Normal:setValue]onValueChange`, val);
        if (this.onValueChange) { // NOTE: onValueChange will be unavailable when writeValue() called at the first time
          this.onValueChange(this.value);
        }
      }
    }
  }

  getValue(cloneAndSort: boolean = false): SliderValue {
    // TODO: using type guard, remove type cast
    if (cloneAndSort && this.nzRange) { // clone & sort range values
      return this.utils.cloneArray(this.value as number[]).sort((a, b) => a - b);
    }
    return this.value;
  }

  // clone & sort current value and convert them to offsets, then return the new one
  getValueToOffset(value?: SliderValue): SliderValue {
    let normalizedValue = value;
    if (typeof normalizedValue === 'undefined') {
      normalizedValue = this.getValue(true);
    }
    // TODO: using type guard, remove type cast
    return this.nzRange ?
      (normalizedValue as number[]).map(val => this.valueToOffset(val)) :
      this.valueToOffset(normalizedValue as number);
  }

  writeValue(val: SliderValue): void { // NOTE: writeValue will be called twice when initialized (may BUG? see: https://github.com/angular/angular/issues/14988), here we just ignore the first inited(the first the onValueChange will not registered)
    if (typeof this.onValueChange !== 'function') {
      return;
    } // ignore the first initial call
    this.log(`[ngModel/writeValue]current writing value = `, val);
    this.setValue(val, true);
  }

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void { }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.toggleDragDisabled(isDisabled);
    this.setClassMap();
  }

  // |--------------------------------------------------------------------------------------------
  // | Lifecycle hooks
  // |--------------------------------------------------------------------------------------------

  constructor(private utils: NzSliderService) {
  }

  // initialize event binding, class init, etc. (called only once)
  ngOnInit(): void {
    // initial checking
    this.checkValidValue(this.nzDefaultValue); // check nzDefaultValue
    // default handles
    this.handles = this._generateHandles(this.nzRange ? 2 : 1);
    // initialize
    this.sliderDOM = this.slider.nativeElement;
    if (this.getValue() === null) {
      this.setValue(this.formatValue(null));
    } // init with default value
    this.marksArray = this.nzMarks === null ? null : this.toMarksArray(this.nzMarks);
    // event bindings
    this.createDrag();
    // initialize drag's disabled status
    this.toggleDragDisabled(this.nzDisabled);
    // the first time to init classes
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzMarks } = changes;
    if (nzDisabled && !nzDisabled.firstChange) {
      this.toggleDragDisabled(nzDisabled.currentValue);
      this.setClassMap();
    } else if (nzMarks && !nzMarks.firstChange) {
      this.marksArray = this.nzMarks ? this.toMarksArray(this.nzMarks) : null;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }

  // |--------------------------------------------------------------------------------------------
  // | Basic flow functions
  // |--------------------------------------------------------------------------------------------

  setClassMap(): void {
    this.classMap = {
      [this.prefixCls]                : true,
      [`${this.prefixCls}-disabled`]  : this.nzDisabled,
      [`${this.prefixCls}-vertical`]  : this.nzVertical,
      [`${this.prefixCls}-with-marks`]: this.marksArray ? this.marksArray.length : 0
    };
  }

  // find the cloest value to be activated (only for range = true)
  setActiveValueIndex(pointerValue: number): void {
    if (this.nzRange) {
      let minimal = null;
      let gap;
      let activeIndex;
      // TODO: using type guard, remove type cast
      (this.getValue() as number[]).forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
    }
  }

  setActiveValue(pointerValue: number): void {
    if (this.nzRange) {
      // TODO: using type guard, remove type cast
      const newValue = this.utils.cloneArray(this.value as number[]);
      newValue[ this.activeValueIndex ] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }

  updateTrackAndHandles(): void {
    const value = this.getValue();
    const offset = this.getValueToOffset(value);
    const valueSorted = this.getValue(true);
    const offsetSorted = this.getValueToOffset(valueSorted);
    const boundParts = this.nzRange ? valueSorted as number[] : [ 0, valueSorted ];
    const trackParts = this.nzRange ? [ offsetSorted[ 0 ], offsetSorted[ 1 ] - offsetSorted[ 0 ] ] : [ 0, offsetSorted ];

    this.handles.forEach((handle, index) => {
      handle.offset = this.nzRange ? offset[ index ] : offset;
      handle.value = this.nzRange ? value[ index ] : value;
    });
    [ this.bounds.lower, this.bounds.upper ] = boundParts;
    [ this.track.offset, this.track.length ] = trackParts;
  }

  toMarksArray(marks: Marks): Marks[] {
    const marksArray = [];
    for (const key in marks) {
      const mark = marks[ key ];
      const val = typeof key === 'number' ? key : parseFloat(key);
      if (val < this.nzMin || val > this.nzMax) {
        continue;
      }
      marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
    }
    return marksArray;
  }

  // |--------------------------------------------------------------------------------------------
  // | Event listeners & bindings
  // |--------------------------------------------------------------------------------------------

  onDragStart(value: number): void {
    this.log('[onDragStart]dragging value = ', value);
    this.toggleDragMoving(true);
    // cache DOM layout/reflow operations
    this.cacheSliderProperty();
    // trigger drag start
    this.setActiveValueIndex(value);
    this.setActiveValue(value);
    // Tooltip visibility of handles
    this._showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
  }

  onDragMove(value: number): void {
    this.log('[onDragMove]dragging value = ', value);
    // trigger drag moving
    this.setActiveValue(value);
  }

  onDragEnd(): void {
    this.log('[onDragEnd]');
    this.toggleDragMoving(false);
    this.nzOnAfterChange.emit(this.getValue(true));
    // remove cache DOM layout/reflow operations
    this.cacheSliderProperty(true);
    // Hide all tooltip
    this._hideAllHandleTooltip();
  }

  createDrag(): void {
    const sliderDOM   = this.sliderDOM;
    const orientField = this.nzVertical ? 'pageY' : 'pageX';
    // TODO: using named interface
    const mouse  = {
      start: 'mousedown', move: 'mousemove', end: 'mouseup',
      pluckKey                                  : [ orientField ]
    } as { start: string, move: string, end: string, pluckKey: string[], filter(e: Event): boolean, startPlucked$: Observable<number>, end$: Observable<number>, moveResolved$: Observable<number> } ;
    const touch = {
      start: 'touchstart', move: 'touchmove', end: 'touchend',
      pluckKey                                   : [ 'touches', '0', orientField ],
      filter                                     : (e: MouseEvent | TouchEvent) => !this.utils.isNotTouchEvent(e as TouchEvent)
    } as { start: string, move: string, end: string, pluckKey: string[], filter(e: Event): boolean, startPlucked$: Observable<number>, end$: Observable<number>, moveResolved$: Observable<number> } ;
    // make observables
    [ mouse, touch ].forEach(source => {
      // TODO: remove any
      // TODO: filterFunc doesn't match filter in touch, should be checked
      /* tslint:disable-next-line:no-any */
      const { start, move, end, pluckKey, filterFunc = (() => true) } = source as any;
      // start
      source.startPlucked$ = fromEvent(sliderDOM, start).pipe(
        filter(filterFunc),
        tap(this.utils.pauseEvent),
        pluck(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );
      // end
      source.end$ = fromEvent(document, end);
      // resolve move
      source.moveResolved$ = fromEvent(document, move).pipe(
        filter(filterFunc),
        tap(this.utils.pauseEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        distinctUntilChanged(),
        takeUntil(source.end$),
      );
      // merge to become moving
      // source.move$ = source.startPlucked$.mergeMapTo(source.moveResolved$);
    });
    // merge mouse and touch observables
    this.dragstart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    // this.dragmove$ = Observable.merge(mouse.move$, touch.move$);
    this.dragmove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragend$ = merge(mouse.end$, touch.end$);
  }

  subscribeDrag(periods: string[] = [ 'start', 'move', 'end' ]): void {
    this.log('[subscribeDrag]this.dragstart$ = ', this.dragstart$);
    if (periods.indexOf('start') !== -1 && this.dragstart$ && !this.dragstart_) {
      this.dragstart_ = this.dragstart$.subscribe(this.onDragStart.bind(this));
    }

    if (periods.indexOf('move') !== -1 && this.dragmove$ && !this.dragmove_) {
      this.dragmove_ = this.dragmove$.subscribe(this.onDragMove.bind(this));
    }

    if (periods.indexOf('end') !== -1 && this.dragend$ && !this.dragend_) {
      this.dragend_ = this.dragend$.subscribe(this.onDragEnd.bind(this));
    }
  }

  unsubscribeDrag(periods: string[] = [ 'start', 'move', 'end' ]): void {
    this.log('[unsubscribeDrag]this.dragstart_ = ', this.dragstart_);
    if (periods.indexOf('start') !== -1 && this.dragstart_) {
      this.dragstart_.unsubscribe();
      this.dragstart_ = null;
    }

    if (periods.indexOf('move') !== -1 && this.dragmove_) {
      this.dragmove_.unsubscribe();
      this.dragmove_ = null;
    }

    if (periods.indexOf('end') !== -1 && this.dragend_) {
      this.dragend_.unsubscribe();
      this.dragend_ = null;
    }
  }

  toggleDragMoving(movable: boolean): void {
    const periods = [ 'move', 'end' ];
    if (movable) {
      this.isDragging = true;
      this.subscribeDrag(periods);
    } else {
      this.isDragging = false;
      this.unsubscribeDrag(periods);
    }
  }

  toggleDragDisabled(disabled: boolean): void {
    if (disabled) {
      this.unsubscribeDrag();
    } else {
      this.subscribeDrag([ 'start' ]);
    }
  }

  // |--------------------------------------------------------------------------------------------
  // | Util functions (tools)
  // |--------------------------------------------------------------------------------------------

  // find the closest value depend on pointer's position
  findClosestValue(position: number): number {
    const sliderStart = this.getSliderStartPosition();
    const sliderLength = this.getSliderLength();
    const ratio  = this.utils.correctNumLimit((position - sliderStart) / sliderLength, 0, 1);
    const val = (this.nzMax - this.nzMin) * (this.nzVertical ? 1 - ratio : ratio) + this.nzMin;
    const points = (this.nzMarks === null ? [] : Object.keys(this.nzMarks).map(parseFloat));
    // push closest step
    if (this.nzStep !== null && !this.nzDots) {
      const closestOne = Math.round(val / this.nzStep) * this.nzStep;
      points.push(closestOne);
    }
    // calculate gaps
    const gaps = points.map(point => Math.abs(val - point));
    const closest = points[ gaps.indexOf(Math.min(...gaps)) ];
    // return the fixed
    return this.nzStep === null ? closest :
      parseFloat(closest.toFixed(this.utils.getPrecision(this.nzStep)));
  }

  valueToOffset(value: number): number {
    return this.utils.valueToOffset(this.nzMin, this.nzMax, value);
  }

  getSliderStartPosition(): number {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = this.utils.getElementOffset(this.sliderDOM);
    return this.nzVertical ? offset.top : offset.left;
  }

  getSliderLength(): number {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.sliderDOM;
    return this.nzVertical ?
      sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  // cache DOM layout/reflow operations for performance (may not necessary?)
  cacheSliderProperty(remove: boolean = false): void {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  formatValue(value: SliderValue): SliderValue { // NOTE: will return new value
    let res = value;
    if (!this.checkValidValue(value)) { // if empty, use default value
      res = this.nzDefaultValue === null ?
        (this.nzRange ? [ this.nzMin, this.nzMax ] : this.nzMin) : this.nzDefaultValue;
    } else { // format
      // TODO: using type guard, remove type cast
      res = this.nzRange ?
        (value as number[]).map(val => this.utils.correctNumLimit(val, this.nzMin, this.nzMax)) :
        this.utils.correctNumLimit(value as number, this.nzMin, this.nzMax);
    }
    return res;
  }

  // check if value is valid and throw error if value-type/range not match
  checkValidValue(value: SliderValue): boolean {
    const range = this.nzRange;
    if (value === null || value === undefined) {
      return false;
    } // it's an invalid value, just return
    const isArray = Array.isArray(value);
    if (!Array.isArray(value)) {
      let parsedValue: number =  value;
      if (typeof value !== 'number') {
        parsedValue = parseFloat(value);
      }
      if (isNaN(parsedValue)) {
        return false;
      } // it's an invalid value, just return
    }
    if (isArray !== !!range) { // value type not match
      throw new Error(`The "nzRange" can't match the "nzValue"'s type, please check these properties: "nzRange", "nzValue", "nzDefaultValue".`);
    }
    return true;
  }

  isValueEqual(value: SliderValue, val: SliderValue): boolean {
    if (typeof value !== typeof val) {
      return false;
    }
    if (Array.isArray(value)) {
      const len = value.length;
      for (let i = 0; i < len; i++) {
        if (value[ i ] !== val[ i ]) {
          return false;
        }
      }
      return true;
    } else {
      return value === val;
    }
  }

  // print debug info
  // TODO: should not kept in component
  /* tslint:disable-next-line:no-any */
  log(...messages: any[]): void {
    if (this.nzDebugId !== null) {
      const args = [ `[nz-slider][#${this.nzDebugId}] ` ].concat(Array.prototype.slice.call(arguments));
      console.log.apply(null, args);
    }
  }

  // Show one handle's tooltip and hide others'
  private _showHandleTooltip(handleIndex: number = 0): void {
    this.handles.forEach((handle, index) => {
      this.handles[ index ].active = index === handleIndex;
    });
  }

  private _hideAllHandleTooltip(): void {
    this.handles.forEach(handle => handle.active = false);
  }

  private _generateHandles(amount: number): SliderHandle[] {
    const handles: SliderHandle[] = [];
    for (let i = 0; i < amount; i++) {
      handles.push({ offset: null, value: null, active: false });
    }
    return handles;
  }

}
