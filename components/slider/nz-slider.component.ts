import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/operators';

import { arrayEquals, shallowClone } from '../core/util/array';
import { InputBoolean } from '../core/util/convert';
import { getElementOffset, silentEvent } from '../core/util/dom';
import { enusreNumberInRange, getPercent, getPrecision } from '../core/util/number';

import {
  isValueARange,
  Marks,
  MouseTouchObserverConfig,
  NzSliderShowTooltip,
  NzSliderValue,
  SliderHandle
} from './nz-slider-definition';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider',
  preserveWhitespaces: false,
  providers          : [ {
    provide    : NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NzSliderComponent),
    multi      : true
  } ],
  templateUrl        : './nz-slider.component.html'
})
export class NzSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @ViewChild('slider') slider: ElementRef;

  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzDots = false;
  @Input() @InputBoolean() nzIncluded = true;
  @Input() @InputBoolean() nzRange = false;
  @Input() @InputBoolean() nzVertical = false;
  @Input() nzDefaultValue: NzSliderValue = null;
  @Input() nzMarks: Marks = null;
  @Input() nzMax = 100;
  @Input() nzMin = 0;
  @Input() nzStep = 1;
  @Input() nzTipFormatter: (value: number) => string;
  @Input() nzShowTooltip: NzSliderShowTooltip = 'default';

  @Output() readonly nzOnAfterChange = new EventEmitter<NzSliderValue>();

  value: NzSliderValue = null; // CORE value state
  sliderDOM: HTMLDivElement;
  cacheSliderStart: number = null;
  cacheSliderLength: number = null;
  activeValueIndex: number = null; // Current activated handle's index ONLY for range=true
  track = { offset: null, length: null }; // Track's offset and length
  handles: SliderHandle[]; // Handles' offset
  marksArray: Marks[]; // "marks" in array type with more data & FILTER out the invalid mark
  bounds = { lower: null, upper: null }; // now for nz-slider-step
  onValueChange: (value: NzSliderValue) => void; // Used by ngModel. BUG: onValueChange() will not success to effect the "value" variable ( [(ngModel)]="value" ) when the first initializing, except using "nextTick" functionality (MAY angular2's problem ?)
  onTouched: () => void = () => {
  } // onTouch function registered via registerOnTouch (ControlValueAccessor).
  isDragging = false; // Current dragging state

  private dragstart$: Observable<number>;
  private dragmove$: Observable<number>;
  private dragend$: Observable<Event>;
  private dragstart_: Subscription;
  private dragmove_: Subscription;
  private dragend_: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzMarks, nzRange } = changes;
    if (nzDisabled && !nzDisabled.firstChange) {
      this.toggleDragDisabled(nzDisabled.currentValue);
    } else if (nzMarks && !nzMarks.firstChange) {
      this.marksArray = this.nzMarks ? this.toMarksArray(this.nzMarks) : null;
    } else if (nzRange && !nzRange.firstChange) {
      this.setValue(this.formatValue(null)); // Change to default value when nzRange changed
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }

  writeValue(val: NzSliderValue): void {
    this.setValue(val, true);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: NzSliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.toggleDragDisabled(isDisabled);
  }

  /**
   * Write value to `value` property, from inside or from outside.
   * @param val
   * @param isWriteValue `true` means from outside
   */
  private setValue(val: NzSliderValue, isWriteValue: boolean = false): void {
    if (isWriteValue) {
      this.value = this.formatValue(val);
      this.updateTrackAndHandles();
    } else {
      if (!this.isValueEqual(this.value, val)) {
        this.value = val;
        this.updateTrackAndHandles();
        if (this.onValueChange) {
          this.onValueChange(this.getValue(true));
        }
      }
    }
  }

  /**
   * Return a sorted copy of `this.value`.
   */
  private getValue(cloneAndSort: boolean = false): NzSliderValue {
    if (cloneAndSort && isValueARange(this.value)) {
      return shallowClone(this.value).sort((a, b) => a - b);
    }
    return this.value;
  }

  private getValueToOffset(value?: NzSliderValue): NzSliderValue {
    let normalizedValue = value;
    if (typeof normalizedValue === 'undefined') {
      normalizedValue = this.getValue(true);
    }
    return isValueARange(normalizedValue) ?
      normalizedValue.map(val => this.valueToOffset(val)) :
      this.valueToOffset(normalizedValue as number);
  }

  /**
   * Find the closest value to be activated (only for range = true).
   */
  private setActiveValueIndex(pointerValue: number): void {
    const value = this.getValue();
    if (isValueARange(value)) {
      let minimal = null;
      let gap;
      let activeIndex;
      value.forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
    }
  }

  private setActiveValue(pointerValue: number): void {
    if (isValueARange(this.value)) {
      const newValue = shallowClone(this.value);
      newValue[ this.activeValueIndex ] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }

  private updateTrackAndHandles(): void {
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

  private toMarksArray(marks: Marks): Marks[] {
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

  private onDragStart(value: number): void {
    this.toggleDragMoving(true);
    // cache DOM layout/reflow operations
    this.cacheSliderProperty();
    // trigger drag start
    this.setActiveValueIndex(value);
    this.setActiveValue(value);
    // Tooltip visibility of handles
    this._showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
  }

  private onDragMove(value: number): void {
    // trigger drag moving
    this.setActiveValue(value);
    this.cdr.markForCheck();
  }

  private onDragEnd(): void {
    this.toggleDragMoving(false);
    this.nzOnAfterChange.emit(this.getValue(true));
    // remove cache DOM layout/reflow operations
    this.cacheSliderProperty(true);
    // Hide all tooltip
    this._hideAllHandleTooltip();

    this.cdr.markForCheck();
  }

  private createDrag(): void {
    const sliderDOM = this.sliderDOM;
    const orientField = this.nzVertical ? 'pageY' : 'pageX';
    const mouse: MouseTouchObserverConfig = {
      start   : 'mousedown', move: 'mousemove', end: 'mouseup',
      pluckKey: [ orientField ]
    };
    const touch: MouseTouchObserverConfig = {
      start   : 'touchstart', move: 'touchmove', end: 'touchend',
      pluckKey: [ 'touches', '0', orientField ],
      filter  : (e: MouseEvent | TouchEvent) => e instanceof TouchEvent
    };
    // make observables
    [ mouse, touch ].forEach(source => {
      const { start, move, end, pluckKey, filter: filterFunc = (() => true) } = source;
      // start
      source.startPlucked$ = fromEvent(sliderDOM, start).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );
      // end
      source.end$ = fromEvent(document, end);
      // resolve move
      source.moveResolved$ = fromEvent(document, move).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        distinctUntilChanged(),
        takeUntil(source.end$)
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

  private subscribeDrag(periods: string[] = [ 'start', 'move', 'end' ]): void {
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

  private unsubscribeDrag(periods: string[] = [ 'start', 'move', 'end' ]): void {
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

  private toggleDragMoving(movable: boolean): void {
    const periods = [ 'move', 'end' ];
    if (movable) {
      this.isDragging = true;
      this.subscribeDrag(periods);
    } else {
      this.isDragging = false;
      this.unsubscribeDrag(periods);
    }
  }

  private toggleDragDisabled(disabled: boolean): void {
    if (disabled) {
      this.unsubscribeDrag();
    } else {
      this.subscribeDrag([ 'start' ]);
    }
  }

  /**
   * Find the closest value depend on pointer's position.
   * @param position
   */
  private findClosestValue(position: number): number {
    const sliderStart = this.getSliderStartPosition();
    const sliderLength = this.getSliderLength();
    const ratio = enusreNumberInRange((position - sliderStart) / sliderLength, 0, 1);
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
      parseFloat(closest.toFixed(getPrecision(this.nzStep)));
  }

  private valueToOffset(value: number): number {
    return getPercent(value, this.nzMin, this.nzMax);
  }

  private getSliderStartPosition(): number {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = getElementOffset(this.sliderDOM);
    return this.nzVertical ? offset.top : offset.left;
  }

  private getSliderLength(): number {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.sliderDOM;
    return this.nzVertical ?
      sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  // cache DOM layout/reflow operations for performance (may not necessary?)
  private cacheSliderProperty(remove: boolean = false): void {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  private formatValue(value: NzSliderValue): NzSliderValue { // NOTE: will return new value
    let res = value;
    if (!this.checkValidValue(value)) { // if empty, use default value
      res = this.nzDefaultValue === null ?
        (this.nzRange ? [ this.nzMin, this.nzMax ] : this.nzMin) : this.nzDefaultValue;
    } else { // format
      res = isValueARange(value) ?
        value.map(val => enusreNumberInRange(val, this.nzMin, this.nzMax)) :
        enusreNumberInRange(value as number, this.nzMin, this.nzMax);
    }
    return res;
  }

  // check if value is valid and throw error if value-type/range not match
  private checkValidValue(value: NzSliderValue): boolean {
    const range = this.nzRange;
    if (value === null || value === undefined) {
      return false;
    } // it's an invalid value, just return
    const isArray = Array.isArray(value);
    if (!Array.isArray(value)) {
      let parsedValue: number = value;
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

  private isValueEqual(value: NzSliderValue, val: NzSliderValue): boolean {
    if (typeof value !== typeof val) {
      return false;
    }
    if (Array.isArray(value) && Array.isArray(val)) {
      return arrayEquals(value, val);
    } else {
      return value === val;
    }
  }

  /**
   * Show one handle's tooltip and hide others.
   * @param handleIndex
   * @private
   */
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
