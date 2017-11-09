import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { pluck } from 'rxjs/operators/pluck';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { NzSliderService } from './nz-slider.service';
import { Marks, MarksArray } from './nz-slider-marks.component';

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
  @Input() nzDisabled = false;

  // Static configurations (properties that can only specify once)
  @Input() nzStep = 1;
  @Input() nzMarks: Marks = null;
  @Input() nzDots = false;
  @Input() nzMin = 0;
  @Input() nzMax = 100;
  @Input() nzIncluded = true;
  @Input() nzDefaultValue: SliderValue = null;
  @Input() nzTipFormatter: Function;
  @Output() nzOnAfterChange = new EventEmitter<SliderValue>();

  @Input()
  set nzVertical(value: boolean | string) {
    if (value === '') {
      this._vertical = true;
    } else {
      this._vertical = value as boolean;
    }
  }

  get nzVertical() {
    return this._vertical;
  }

  @Input()
  set nzRange(value: boolean | string) {
    if (value === '') {
      this._range = true;
    } else {
      this._range = value as boolean;
    }
  }

  get nzRange() {
    return this._range;
  }

  // Inside properties
  _range = false;
  _vertical = false;
  value: SliderValue = null; // CORE value state
  @ViewChild('slider') private slider: ElementRef;
  sliderDOM: any;
  cacheSliderStart: number = null;
  cacheSliderLength: number = null;
  prefixCls = 'ant-slider';
  classMap: Object;
  activeValueIndex: number = null; // Current activated handle's index ONLY for range=true
  track = { offset: null, length: null }; // Track's offset and length
  handles: SliderHandle[]; // Handles' offset
  marksArray: MarksArray; // "marks" in array type with more data & FILTER out the invalid mark
  bounds = { lower: null, upper: null }; // now for nz-slider-step
  onValueChange: Function; // Used by ngModel. BUG: onValueChange() will not success to effect the "value" variable ( [(ngModel)]="value" ) when the first initializing, except using "nextTick" functionality (MAY angular2's problem ?)
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

  setValue(val: SliderValue, isWriteValue: boolean = false) {
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

  getValue(cloneAndSort = false): SliderValue {
    if (cloneAndSort && this.nzRange) { // clone & sort range values
      return this.utils.cloneArray(<number[]>this.value).sort((a, b) => a - b);
    }
    return this.value;
  }

  // clone & sort current value and convert them to offsets, then return the new one
  getValueToOffset(value?: SliderValue) {
    if (typeof value === 'undefined') {
      value = this.getValue(true);
    }
    return this.nzRange ?
      (<number[]>value).map(val => this.valueToOffset(val)) :
      this.valueToOffset(value);
  }

  writeValue(val: SliderValue) { // NOTE: writeValue will be called twice when initialized (may BUG? see: https://github.com/angular/angular/issues/14988), here we just ignore the first inited(the first the onValueChange will not registered)
    if (typeof this.onValueChange !== 'function') {
      return;
    } // ignore the first initial call
    this.log(`[ngModel/writeValue]current writing value = `, val);
    this.setValue(val, true);
  }

  registerOnChange(fn: Function) {
    this.onValueChange = fn;
  }

  registerOnTouched(fn) {
  }

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
  ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges) {
    const { nzDisabled } = changes;
    if (nzDisabled && !nzDisabled.firstChange) {
      this.toggleDragDisabled(nzDisabled.currentValue);
      this.setClassMap();
    }
  }

  ngOnDestroy() {
    this.unsubscribeDrag();
  }

  // |--------------------------------------------------------------------------------------------
  // | Basic flow functions
  // |--------------------------------------------------------------------------------------------

  setClassMap() {
    const { prefixCls, nzDisabled, nzVertical, marksArray } = this;
    this.classMap = {
      [prefixCls]                : true,
      [`${prefixCls}-disabled`]  : nzDisabled,
      [`${prefixCls}-vertical`]  : nzVertical,
      [`${prefixCls}-with-marks`]: marksArray ? marksArray.length : 0
    };
  }

  // find the cloest value to be activated (only for range = true)
  setActiveValueIndex(pointerValue: number): void {
    if (this.nzRange) {
      let minimal = null, gap, activeIndex;
      (<number[]>this.getValue()).forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
    }
  }

  setActiveValue(pointerValue: number) {
    if (this.nzRange) {
      const newValue = this.utils.cloneArray(<number[]>this.value);
      newValue[ this.activeValueIndex ] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }

  updateTrackAndHandles() {
    const value = this.getValue();
    const offset = this.getValueToOffset(value);
    const valueSorted = this.getValue(true);
    const offsetSorted = this.getValueToOffset(valueSorted);
    const boundParts = this.nzRange ? <number[]>valueSorted : [ 0, valueSorted ];
    const trackParts = this.nzRange ? [ offsetSorted[ 0 ], offsetSorted[ 1 ] - offsetSorted[ 0 ] ] : [ 0, offsetSorted ];

    this.handles.forEach((handle, index) => {
      handle.offset = this.nzRange ? offset[ index ] : offset;
      handle.value = this.nzRange ? value[ index ] : value;
    });
    [ this.bounds.lower, this.bounds.upper ] = boundParts;
    [ this.track.offset, this.track.length ] = trackParts;
  }

  toMarksArray(marks) {
    const { nzMin, nzMax } = this;
    const marksArray = [];
    for (const key in marks) {
      const mark = marks[ key ];
      const val = typeof key === 'number' ? key : parseFloat(key);
      if (val < nzMin || val > nzMax) {
        continue;
      }
      marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
    }
    return marksArray;
  }

  // |--------------------------------------------------------------------------------------------
  // | Event listeners & bindings
  // |--------------------------------------------------------------------------------------------

  onDragStart(value: number) {
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

  onDragMove(value: number) {
    this.log('[onDragMove]dragging value = ', value);
    // trigger drag moving
    this.setActiveValue(value);
  }

  onDragEnd() {
    this.log('[onDragEnd]');
    this.toggleDragMoving(false);
    this.nzOnAfterChange.emit(this.getValue(true));
    // remove cache DOM layout/reflow operations
    this.cacheSliderProperty(true);
    // Hide all tooltip
    this._hideAllHandleTooltip();
  }

  createDrag() {
    const
      sliderDOM   = this.sliderDOM,
      orientField = this.nzVertical ? 'pageY' : 'pageX',
      mouse: any  = {
        start: 'mousedown', move: 'mousemove', end: 'mouseup',
        pluckKey                                  : [ orientField ]
      },
      touch: any  = {
        start: 'touchstart', move: 'touchmove', end: 'touchend',
        pluckKey                                   : [ 'touches', '0', orientField ],
        filter                                     : (e: MouseEvent | TouchEvent) => !this.utils.isNotTouchEvent(<TouchEvent>e)
      };
    // make observables
    [ mouse, touch ].forEach(source => {
      const { start, move, end, pluckKey, filterFunc = ((value: any, index: number) => true) as any } = source;
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

  subscribeDrag(periods = [ 'start', 'move', 'end' ]) {
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

  unsubscribeDrag(periods = [ 'start', 'move', 'end' ]) {
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

  toggleDragMoving(movable: boolean) {
    const periods = [ 'move', 'end' ];
    if (movable) {
      this.isDragging = true;
      this.subscribeDrag(periods);
    } else {
      this.isDragging = false;
      this.unsubscribeDrag(periods);
    }
  }

  toggleDragDisabled(disabled: boolean) {
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
    const
      { nzVertical, nzStep, nzMin, nzMax, nzMarks, nzDots, utils } = this,
      sliderStart                                                  = this.getSliderStartPosition(),
      sliderLength                                                 = this.getSliderLength();
    const
      ratio  = utils.correctNumLimit((position - sliderStart) / sliderLength, 0, 1),
      val    = (nzMax - nzMin) * (nzVertical ? 1 - ratio : ratio) + nzMin,
      points = (nzMarks === null ? [] : Object.keys(nzMarks).map(parseFloat)) as Array<any>;
    // push closest step
    if (nzStep !== null && !nzDots) {
      const closestOne = Math.round(val / nzStep) * nzStep;
      points.push(closestOne);
    }
    // calculate gaps
    const gaps = points.map(point => Math.abs(val - point));
    const closest = points[ gaps.indexOf(Math.min(...gaps)) ];
    // return the fixed
    return nzStep === null ? closest :
      parseFloat(closest.toFixed(utils.getPrecision(nzStep)));
  }

  valueToOffset(value) {
    return this.utils.valueToOffset(this.nzMin, this.nzMax, value);
  }

  getSliderStartPosition() {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = this.utils.getElementOffset(this.sliderDOM);
    return this.nzVertical ? offset.top : offset.left;
  }

  getSliderLength() {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.sliderDOM;
    return this.nzVertical ?
      sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  // cache DOM layout/reflow operations for performance (may not necessary?)
  cacheSliderProperty(remove: boolean = false) {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  formatValue(value: SliderValue): SliderValue { // NOTE: will return new value
    if (!this.checkValidValue(value)) { // if empty, use default value
      value = this.nzDefaultValue === null ?
        (this.nzRange ? [ this.nzMin, this.nzMax ] : this.nzMin) : this.nzDefaultValue;
    } else { // format
      value = this.nzRange ?
        (<number[]>value).map(val => this.utils.correctNumLimit(val, this.nzMin, this.nzMax)) :
        this.utils.correctNumLimit(value, this.nzMin, this.nzMax);
    }
    return value;
  }

  // check if value is valid and throw error if value-type/range not match
  checkValidValue(value) {
    const range = this.nzRange;
    if (value === null || value === undefined) {
      return false;
    } // it's an invalid value, just return
    const isArray = Array.isArray(value);
    if (!isArray) {
      if (typeof value !== 'number') {
        value = parseFloat(value);
      }
      if (isNaN(value)) {
        return false;
      } // it's an invalid value, just return
    }
    if (isArray !== !!range) { // value type not match
      throw new Error(`The "nzRange" can't match the "nzValue"'s type, please check these properties: "nzRange", "nzValue", "nzDefaultValue".`);
    }
    return true;
  }

  isValueEqual(value: SliderValue, val: SliderValue) {
    if (typeof value !== typeof val) {
      return false;
    }
    if (Array.isArray(value)) {
      const len = (<number[]>value).length;
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
  log(...messages: Array<any>) {
    if (this.nzDebugId !== null) {
      const args = [ `[nz-slider][#${this.nzDebugId}] ` ].concat(Array.prototype.slice.call(arguments));
      console.log.apply(null, args);
    }
  }

  // Show one handle's tooltip and hide others'
  private _showHandleTooltip(handleIndex = 0) {
    this.handles.forEach((handle, index) => {
      this.handles[ index ].active = index === handleIndex;
    });
  }

  private _hideAllHandleTooltip() {
    this.handles.forEach(handle => handle.active = false);
  }

  private _generateHandles(amount: number) {
    const handles: SliderHandle[] = [];
    for (let i = 0; i < amount; i++) {
      handles.push({ offset: null, value: null, active: false });
    }
    return handles;
  }

}
