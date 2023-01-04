/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/operators';

import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';
import {
  arraysEqual,
  ensureNumberInRange,
  getElementOffset,
  getPercent,
  getPrecision,
  InputBoolean,
  InputNumber,
  isNil,
  MouseTouchObserverConfig,
  silentEvent
} from 'ng-zorro-antd/core/util';

import { NzSliderHandleComponent } from './handle.component';
import { NzSliderService } from './slider.service';
import { NzExtendedMark, NzMarks, NzSliderHandler, NzSliderShowTooltip, NzSliderValue } from './typings';

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
    },
    NzSliderService
  ],
  host: {
    '(keydown)': 'onKeyDown($event)'
  },
  template: `
    <div
      #slider
      class="ant-slider"
      [class.ant-slider-rtl]="dir === 'rtl'"
      [class.ant-slider-disabled]="nzDisabled"
      [class.ant-slider-vertical]="nzVertical"
      [class.ant-slider-with-marks]="marksArray"
    >
      <div class="ant-slider-rail"></div>
      <nz-slider-track
        [vertical]="nzVertical"
        [included]="nzIncluded"
        [offset]="track.offset!"
        [length]="track.length!"
        [reverse]="nzReverse"
        [dir]="dir"
      ></nz-slider-track>
      <nz-slider-step
        *ngIf="marksArray"
        [vertical]="nzVertical"
        [min]="nzMin"
        [max]="nzMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
        [reverse]="nzReverse"
      ></nz-slider-step>
      <nz-slider-handle
        *ngFor="let handle of handles; index as handleIndex"
        [vertical]="nzVertical"
        [reverse]="nzReverse"
        [offset]="handle.offset!"
        [value]="handle.value!"
        [active]="handle.active"
        [tooltipFormatter]="nzTipFormatter"
        [tooltipVisible]="nzTooltipVisible"
        [tooltipPlacement]="nzTooltipPlacement"
        [dir]="dir"
        (focusin)="onHandleFocusIn(handleIndex)"
      ></nz-slider-handle>
      <nz-slider-marks
        *ngIf="marksArray"
        [vertical]="nzVertical"
        [min]="nzMin"
        [max]="nzMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
        [reverse]="nzReverse"
      ></nz-slider-marks>
    </div>
  `
})
export class NzSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzDots: BooleanInput;
  static ngAcceptInputType_nzIncluded: BooleanInput;
  static ngAcceptInputType_nzRange: BooleanInput;
  static ngAcceptInputType_nzVertical: BooleanInput;
  static ngAcceptInputType_nzMax: NumberInput;
  static ngAcceptInputType_nzMin: NumberInput;
  static ngAcceptInputType_nzStep: NumberInput;
  static ngAcceptInputType_nzReverse: BooleanInput;

  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChildren(NzSliderHandleComponent) handlerComponents!: QueryList<NzSliderHandleComponent>;

  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzDots: boolean = false;
  @Input() @InputBoolean() nzIncluded: boolean = true;
  @Input() @InputBoolean() nzRange: boolean = false;
  @Input() @InputBoolean() nzVertical: boolean = false;
  @Input() @InputBoolean() nzReverse: boolean = false;
  @Input() nzDefaultValue?: NzSliderValue;
  @Input() nzMarks: NzMarks | null = null;
  @Input() @InputNumber() nzMax = 100;
  @Input() @InputNumber() nzMin = 0;
  @Input() @InputNumber() nzStep = 1;
  @Input() nzTooltipVisible: NzSliderShowTooltip = 'default';
  @Input() nzTooltipPlacement: string = 'top';
  @Input() nzTipFormatter?: null | ((value: number) => string);

  @Output() readonly nzOnAfterChange = new EventEmitter<NzSliderValue>();

  value: NzSliderValue | null = null;
  cacheSliderStart: number | null = null;
  cacheSliderLength: number | null = null;
  activeValueIndex: number | undefined = undefined; // Current activated handle's index ONLY for range=true
  track: { offset: null | number; length: null | number } = { offset: null, length: null }; // Track's offset and length
  handles: NzSliderHandler[] = []; // Handles' offset
  marksArray: NzExtendedMark[] | null = null; // "steps" in array type with more data & FILTER out the invalid mark
  bounds: { lower: NzSliderValue | null; upper: NzSliderValue | null } = { lower: null, upper: null }; // now for nz-slider-step
  dir: Direction = 'ltr';

  private dragStart$?: Observable<number>;
  private dragMove$?: Observable<number>;
  private dragEnd$?: Observable<Event>;
  private dragStart_?: Subscription | null;
  private dragMove_?: Subscription | null;
  private dragEnd_?: Subscription | null;
  private destroy$ = new Subject();
  private isNzDisableFirstChange = true;

  constructor(
    private sliderService: NzSliderService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    });

    this.handles = generateHandlers(this.nzRange ? 2 : 1);
    this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
    this.bindDraggingHandlers();
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
      this.handles = generateHandlers(nzRange.currentValue ? 2 : 1);
      this.setValue(this.formatValue(null));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(val: NzSliderValue | null): void {
    this.setValue(val, true);
  }

  onValueChange(_value: NzSliderValue): void {}

  onTouched(): void {}

  registerOnChange(fn: (value: NzSliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.toggleDragDisabled(isDisabled);
    this.cdr.markForCheck();
  }

  /**
   * Event handler is only triggered when a slider handler is focused.
   */
  onKeyDown(e: KeyboardEvent): void {
    if (this.nzDisabled) {
      return;
    }

    const code = e.keyCode;
    const isIncrease = code === RIGHT_ARROW || code === UP_ARROW;
    const isDecrease = code === LEFT_ARROW || code === DOWN_ARROW;

    if (!(isIncrease || isDecrease)) {
      return;
    }

    e.preventDefault();

    let step = (isDecrease ? -this.nzStep : this.nzStep) * (this.nzReverse ? -1 : 1);
    step = this.dir === 'rtl' ? step * -1 : step;
    const newVal = this.nzRange
      ? (this.value as number[])[this.activeValueIndex!] + step
      : (this.value as number) + step;
    this.setActiveValue(ensureNumberInRange(newVal, this.nzMin, this.nzMax));
    this.nzOnAfterChange.emit(this.getValue(true));
  }

  onHandleFocusIn(index: number): void {
    this.activeValueIndex = index;
  }

  private setValue(value: NzSliderValue | null, isWriteValue: boolean = false): void {
    if (isWriteValue) {
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!valuesEqual(this.value!, value!)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    }
  }

  private getValue(cloneAndSort: boolean = false): NzSliderValue {
    if (cloneAndSort && this.value && isValueRange(this.value)) {
      return [...this.value].sort((a, b) => a - b);
    }
    return this.value!;
  }

  /**
   * Clone & sort current value and convert them to offsets, then return the new one.
   */
  private getValueToOffset(value?: NzSliderValue): NzSliderValue {
    let normalizedValue = value;

    if (typeof normalizedValue === 'undefined') {
      normalizedValue = this.getValue(true);
    }

    return isValueRange(normalizedValue)
      ? normalizedValue.map(val => this.valueToOffset(val))
      : this.valueToOffset(normalizedValue);
  }

  /**
   * Find the closest value to be activated.
   */
  private setActiveValueIndex(pointerValue: number): void {
    const value = this.getValue();
    if (isValueRange(value)) {
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
      this.handlerComponents.toArray()[activeIndex].focus();
    } else {
      this.handlerComponents.toArray()[0].focus();
    }
  }

  private setActiveValue(pointerValue: number): void {
    if (isValueRange(this.value!)) {
      const newValue = [...(this.value as number[])];
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
    const boundParts = isValueRange(valueSorted) ? valueSorted : [0, valueSorted];
    const trackParts = isValueRange(offsetSorted)
      ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]]
      : [0, offsetSorted];

    this.handles.forEach((handle, index) => {
      handle.offset = isValueRange(offset) ? offset[index] : offset;
      handle.value = isValueRange(value) ? value[index] : value || 0;
    });

    [this.bounds.lower, this.bounds.upper] = boundParts;
    [this.track.offset, this.track.length] = trackParts;

    this.cdr.markForCheck();
  }

  private onDragStart(value: number): void {
    this.toggleDragMoving(true);
    this.cacheSliderProperty();
    this.setActiveValueIndex(this.getLogicalValue(value));
    this.setActiveValue(this.getLogicalValue(value));
    this.showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
  }

  private onDragMove(value: number): void {
    this.setActiveValue(this.getLogicalValue(value));
    this.cdr.markForCheck();
  }

  private getLogicalValue(value: number): number {
    if (this.nzReverse) {
      if (!this.nzVertical && this.dir === 'rtl') {
        return value;
      }
      return this.nzMax - value + this.nzMin;
    }
    if (!this.nzVertical && this.dir === 'rtl') {
      return this.nzMax - value + this.nzMin;
    }

    return value;
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
  private bindDraggingHandlers(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const sliderDOM = this.slider.nativeElement;
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
      this.sliderService.isDragging = true;
      this.subscribeDrag(periods);
    } else {
      this.sliderService.isDragging = false;
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
    const points =
      this.nzMarks === null
        ? []
        : Object.keys(this.nzMarks)
            .map(parseFloat)
            .sort((a, b) => a - b);

    if (this.nzStep !== 0 && !this.nzDots) {
      const closestOne = Math.round(val / this.nzStep) * this.nzStep;
      points.push(closestOne);
    }

    const gaps = points.map(point => Math.abs(val - point));
    const closest = points[gaps.indexOf(Math.min(...gaps))];

    // return parseFloat(closest.toFixed(getPrecision(this.nzStep)));
    return this.nzStep === 0 ? closest : parseFloat(closest.toFixed(getPrecision(this.nzStep)));
  }

  private valueToOffset(value: number): number {
    return getPercent(this.nzMin, this.nzMax, value);
  }

  private getSliderStartPosition(): number {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = getElementOffset(this.slider.nativeElement);
    return this.nzVertical ? offset.top : offset.left;
  }

  private getSliderLength(): number {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.slider.nativeElement;
    return this.nzVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  /**
   * Cache DOM layout/reflow operations for performance (may not necessary?)
   */
  private cacheSliderProperty(remove: boolean = false): void {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  private formatValue(value: NzSliderValue | null): NzSliderValue {
    if (isNil(value)) {
      return this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
    } else if (assertValueValid(value, this.nzRange)) {
      return isValueRange(value)
        ? value.map(val => ensureNumberInRange(val, this.nzMin, this.nzMax))
        : ensureNumberInRange(value, this.nzMin, this.nzMax);
    } else {
      return this.nzDefaultValue ? this.nzDefaultValue : this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
    }
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

  private generateMarkItems(marks: NzMarks): NzExtendedMark[] | null {
    const marksArray: NzExtendedMark[] = [];
    for (const key in marks) {
      if (marks.hasOwnProperty(key)) {
        const mark = marks[key];
        const val = typeof key === 'number' ? key : parseFloat(key);
        if (val >= this.nzMin && val <= this.nzMax) {
          marksArray.push({ value: val, offset: this.valueToOffset(val), config: mark });
        }
      }
    }
    return marksArray.length ? marksArray : null;
  }
}

function getValueTypeNotMatchError(): Error {
  return new Error(
    `The "nzRange" can't match the "ngModel"'s type, please check these properties: "nzRange", "ngModel", "nzDefaultValue".`
  );
}

function isValueRange(value: NzSliderValue): value is number[] {
  if (value instanceof Array) {
    return value.length === 2;
  } else {
    return false;
  }
}

function generateHandlers(amount: number): NzSliderHandler[] {
  return Array(amount)
    .fill(0)
    .map(() => ({ offset: null, value: null, active: false }));
}

/**
 * Check if value is valid and throw error if value-type/range not match.
 */
function assertValueValid(value: NzSliderValue, isRange?: boolean): boolean {
  if ((!isValueRange(value) && isNaN(value)) || (isValueRange(value) && value.some(v => isNaN(v)))) {
    return false;
  }
  return assertValueTypeMatch(value, isRange);
}

/**
 * Assert that if `this.nzRange` is `true`, value is also a range, vice versa.
 */
function assertValueTypeMatch(value: NzSliderValue, isRange: boolean = false): boolean {
  if (isValueRange(value) !== isRange) {
    throw getValueTypeNotMatchError();
  }
  return true;
}

function valuesEqual(valA: NzSliderValue, valB: NzSliderValue): boolean {
  if (typeof valA !== typeof valB) {
    return false;
  }
  return isValueRange(valA) && isValueRange(valB) ? arraysEqual<number>(valA, valB) : valA === valB;
}
