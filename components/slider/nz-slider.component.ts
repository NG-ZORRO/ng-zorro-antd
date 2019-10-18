/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
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

import {
  arraysEqual,
  ensureNumberInRange,
  getElementOffset,
  getPercent,
  getPrecision,
  shallowCopyArray,
  silentEvent,
  InputBoolean,
  MouseTouchObserverConfig
} from 'ng-zorro-antd/core';

import {
  isValueARange,
  ExtendedMark,
  NzMarks,
  SliderHandler,
  SliderShowTooltip,
  SliderValue
} from './nz-slider-definitions';
import { getValueTypeNotMatchError } from './nz-slider-error';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider',
  exportAs: 'nzSlider',
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSliderComponent),
      multi: true
    }
  ],
  templateUrl: './nz-slider.component.html'
})
export class NzSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @ViewChild('slider', { static: true }) slider: ElementRef<HTMLDivElement>;

  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzDots: boolean = false;
  @Input() @InputBoolean() nzIncluded: boolean = true;
  @Input() @InputBoolean() nzRange: boolean = false;
  @Input() @InputBoolean() nzVertical: boolean = false;
  @Input() nzDefaultValue: SliderValue | null = null;
  @Input() nzMarks: NzMarks | null = null;
  @Input() nzMax = 100;
  @Input() nzMin = 0;
  @Input() nzStep = 1;
  @Input() nzTooltipVisible: SliderShowTooltip = 'default';
  @Input() nzTooltipPlacement: string = 'top';
  @Input() nzTipFormatter: (value: number) => string;

  @Output() readonly nzOnAfterChange = new EventEmitter<SliderValue>();

  value: SliderValue | null = null;
  sliderDOM: HTMLDivElement;
  cacheSliderStart: number | null = null;
  cacheSliderLength: number | null = null;
  activeValueIndex: number | undefined = undefined; // Current activated handle's index ONLY for range=true
  track: { offset: null | number; length: null | number } = { offset: null, length: null }; // Track's offset and length
  handles: SliderHandler[]; // Handles' offset
  marksArray: ExtendedMark[] | null; // "steps" in array type with more data & FILTER out the invalid mark
  bounds: { lower: SliderValue | null; upper: SliderValue | null } = { lower: null, upper: null }; // now for nz-slider-step
  isDragging = false; // Current dragging state

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;

  constructor(private cdr: ChangeDetectorRef, private platform: Platform) {}

  ngOnInit(): void {
    this.handles = this.generateHandles(this.nzRange ? 2 : 1);
    this.sliderDOM = this.slider.nativeElement;
    this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
    if (this.platform.isBrowser) {
      this.createDraggingObservables();
    }
    this.toggleDragDisabled(this.nzDisabled);
    if (this.getValue() === null) {
      this.setValue(this.formatValue(null));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzMarks, nzRange } = changes;

    if (nzDisabled && !nzDisabled.firstChange) {
      this.toggleDragDisabled(nzDisabled.currentValue);
    } else if (nzMarks && !nzMarks.firstChange) {
      this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
    } else if (nzRange && !nzRange.firstChange) {
      this.setValue(this.formatValue(null));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }

  writeValue(val: SliderValue | null): void {
    this.setValue(val, true);
  }

  onValueChange(_value: SliderValue): void {}

  onTouched(): void {}

  registerOnChange(fn: (value: SliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.toggleDragDisabled(isDisabled);
  }

  private setValue(value: SliderValue | null, isWriteValue: boolean = false): void {
    if (isWriteValue) {
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value!, value!)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    }
  }

  private getValue(cloneAndSort: boolean = false): SliderValue {
    if (cloneAndSort && this.value && isValueARange(this.value)) {
      return shallowCopyArray(this.value).sort((a, b) => a - b);
    }
    return this.value!;
  }

  /**
   * Clone & sort current value and convert them to offsets, then return the new one.
   */
  private getValueToOffset(value?: SliderValue): SliderValue {
    let normalizedValue = value;

    if (typeof normalizedValue === 'undefined') {
      normalizedValue = this.getValue(true);
    }

    return isValueARange(normalizedValue)
      ? normalizedValue.map(val => this.valueToOffset(val))
      : this.valueToOffset(normalizedValue);
  }

  /**
   * Find the closest value to be activated (only for range = true).
   */
  private setActiveValueIndex(pointerValue: number): void {
    const value = this.getValue();
    if (isValueARange(value)) {
      let minimal: number | null = null;
      let gap: number;
      let activeIndex = -1;
      value.forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal!) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
    }
  }

  private setActiveValue(pointerValue: number): void {
    if (isValueARange(this.value!)) {
      const newValue = shallowCopyArray(this.value as number[]);
      newValue[this.activeValueIndex!] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }

  /**
   * Update track and handles' position and length.
   */
  private updateTrackAndHandles(): void {
    const value = this.getValue();
    const offset = this.getValueToOffset(value);
    const valueSorted = this.getValue(true);
    const offsetSorted = this.getValueToOffset(valueSorted);
    const boundParts = isValueARange(valueSorted) ? valueSorted : [0, valueSorted];
    const trackParts = isValueARange(offsetSorted)
      ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]]
      : [0, offsetSorted];

    this.handles.forEach((handle, index) => {
      handle.offset = isValueARange(offset) ? offset[index] : offset;
      handle.value = isValueARange(value) ? value[index] : value || 0;
    });

    [this.bounds.lower, this.bounds.upper] = boundParts;
    [this.track.offset, this.track.length] = trackParts;

    this.cdr.markForCheck();
  }

  private onDragStart(value: number): void {
    this.toggleDragMoving(true);
    this.cacheSliderProperty();
    this.setActiveValueIndex(value);
    this.setActiveValue(value);
    this.showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
  }

  private onDragMove(value: number): void {
    this.setActiveValue(value);
    this.cdr.markForCheck();
  }

  private onDragEnd(): void {
    this.nzOnAfterChange.emit(this.getValue(true));
    this.toggleDragMoving(false);
    this.cacheSliderProperty(true);
    this.hideAllHandleTooltip();
    this.cdr.markForCheck();
  }

  /**
   * Create user interactions handles.
   */
  private createDraggingObservables(): void {
    const sliderDOM = this.sliderDOM;
    const orientField = this.nzVertical ? 'pageY' : 'pageX';
    const mouse: MouseTouchObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      pluckKey: [orientField]
    };
    const touch: MouseTouchObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      pluckKey: ['touches', '0', orientField],
      filter: (e: MouseEvent | TouchEvent) => e instanceof TouchEvent
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, pluckKey, filter: filterFunc = () => true } = source;

      source.startPlucked$ = fromEvent(sliderDOM, start).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );
      source.end$ = fromEvent(document, end);
      source.moveResolved$ = fromEvent(document, move).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        distinctUntilChanged(),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$!, touch.startPlucked$!);
    this.dragMove$ = merge(mouse.moveResolved$!, touch.moveResolved$!);
    this.dragEnd$ = merge(mouse.end$!, touch.end$!);
  }

  private subscribeDrag(periods: string[] = ['start', 'move', 'end']): void {
    if (periods.indexOf('start') !== -1 && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }

    if (periods.indexOf('move') !== -1 && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }

    if (periods.indexOf('end') !== -1 && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(periods: string[] = ['start', 'move', 'end']): void {
    if (periods.indexOf('start') !== -1 && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }

    if (periods.indexOf('move') !== -1 && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }

    if (periods.indexOf('end') !== -1 && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private toggleDragMoving(movable: boolean): void {
    const periods = ['move', 'end'];
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
      this.subscribeDrag(['start']);
    }
  }

  private findClosestValue(position: number): number {
    const sliderStart = this.getSliderStartPosition();
    const sliderLength = this.getSliderLength();
    const ratio = ensureNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const val = (this.nzMax - this.nzMin) * (this.nzVertical ? 1 - ratio : ratio) + this.nzMin;
    const points = this.nzMarks === null ? [] : Object.keys(this.nzMarks).map(parseFloat);
    if (this.nzStep !== null && !this.nzDots) {
      const closestOne = Math.round(val / this.nzStep) * this.nzStep;
      points.push(closestOne);
    }
    const gaps = points.map(point => Math.abs(val - point));
    const closest = points[gaps.indexOf(Math.min(...gaps))];
    return this.nzStep === null ? closest : parseFloat(closest.toFixed(getPrecision(this.nzStep)));
  }

  private valueToOffset(value: number): number {
    return getPercent(this.nzMin, this.nzMax, value);
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
    return this.nzVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  /**
   * Cache DOM layout/reflow operations for performance (may not necessary?)
   */
  private cacheSliderProperty(remove: boolean = false): void {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  private formatValue(value: SliderValue | null): SliderValue {
    let res = value;
    if (!this.assertValueValid(value!)) {
      res = this.nzDefaultValue === null ? (this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin) : this.nzDefaultValue;
    } else {
      res = isValueARange(value!)
        ? (value as number[]).map(val => ensureNumberInRange(val, this.nzMin, this.nzMax))
        : ensureNumberInRange(value as number, this.nzMin, this.nzMax);
    }

    return res;
  }

  /**
   * Check if value is valid and throw error if value-type/range not match.
   */
  private assertValueValid(value: SliderValue): boolean {
    if (!Array.isArray(value) && isNaN(typeof value !== 'number' ? parseFloat(value) : value)) {
      return false;
    }
    return this.assertValueTypeMatch(value);
  }

  /**
   * Assert that if `this.nzRange` is `true`, value is also a range, vice versa.
   */
  private assertValueTypeMatch(value: SliderValue | null): boolean {
    if (!value) {
      return true;
    } else if (isValueARange(value) !== this.nzRange) {
      throw getValueTypeNotMatchError();
    } else {
      return true;
    }
  }

  private valuesEqual(valA: SliderValue, valB: SliderValue): boolean {
    if (typeof valA !== typeof valB) {
      return false;
    }
    return isValueARange(valA) && isValueARange(valB) ? arraysEqual<number>(valA, valB) : valA === valB;
  }

  /**
   * Show one handle's tooltip and hide others'.
   */
  private showHandleTooltip(handleIndex: number = 0): void {
    this.handles.forEach((handle, index) => {
      handle.active = index === handleIndex;
    });
  }

  private hideAllHandleTooltip(): void {
    this.handles.forEach(handle => (handle.active = false));
  }

  private generateHandles(amount: number): SliderHandler[] {
    return Array(amount)
      .fill(0)
      .map(() => ({ offset: null, value: null, active: false }));
  }

  private generateMarkItems(marks: NzMarks): ExtendedMark[] | null {
    const marksArray: ExtendedMark[] = [];
    for (const key in marks) {
      const mark = marks[key];
      const val = typeof key === 'number' ? key : parseFloat(key);
      if (val >= this.nzMin && val <= this.nzMax) {
        marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
      }
    }
    return marksArray.length ? marksArray : null;
  }
}
