/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  linkedSignal,
  numberAttribute,
  OnInit,
  output,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzFormItemFeedbackIconComponent, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzSizeLDSType, NzStatus, NzValidateStatus, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { getStatusClassNames, isNil } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzInputAddonAfterDirective,
  NzInputAddonBeforeDirective,
  NzInputPrefixDirective,
  NzInputSuffixDirective
} from 'ng-zorro-antd/input';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-input-number',
  exportAs: 'nzInputNumber',
  imports: [NzIconModule, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
  template: `
    @if (hasAddon()) {
      <ng-template [ngTemplateOutlet]="inputNumberWithAddonInner" />
    } @else if (hasAffix()) {
      <ng-template [ngTemplateOutlet]="inputNumberWithAffixInner" />
    } @else {
      <ng-template [ngTemplateOutlet]="inputNumberInner" />
    }

    <ng-template #inputNumberWithAddonInner>
      <div class="ant-input-number-wrapper ant-input-number-group">
        @if (addonBefore()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonBefore]"></ng-content>
          </div>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputNumberWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="inputNumber" />
        }

        @if (addonAfter()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonAfter]"></ng-content>
          </div>
        }
      </div>
    </ng-template>

    <ng-template #inputNumberWithAffix>
      <div [class]="affixWrapperClass()">
        <ng-template [ngTemplateOutlet]="inputNumberWithAffixInner" />
      </div>
    </ng-template>

    <ng-template #inputNumberWithAffixInner>
      @if (prefix()) {
        <span class="ant-input-number-prefix">
          <ng-content select="[nzInputPrefix]"></ng-content>
        </span>
      }
      <ng-template [ngTemplateOutlet]="inputNumber" />
      @if (suffix() || hasFeedback()) {
        <span class="ant-input-number-suffix">
          <ng-content select="[nzInputSuffix]"></ng-content>
          @if (hasFeedback() && finalStatus()) {
            <nz-form-item-feedback-icon [status]="finalStatus()" />
          }
        </span>
      }
    </ng-template>

    <ng-template #inputNumber>
      <div #inputNumberHost [class]="inputNumberClass()">
        <ng-template [ngTemplateOutlet]="inputNumberInner" />
      </div>
    </ng-template>

    <ng-template #inputNumberInner>
      @if (nzControls()) {
        <div #handlers class="ant-input-number-handler-wrap" (mouseup)="stopAutoStep()" (mouseleave)="stopAutoStep()">
          <span
            role="button"
            unselectable="on"
            class="ant-input-number-handler ant-input-number-handler-up"
            [class.ant-input-number-handler-up-disabled]="upDisabled()"
            [attr.aria-disabled]="upDisabled()"
            (mousedown)="onStepMouseDown($event, true)"
          >
            <ng-content select="[nzInputNumberUpIcon]">
              <nz-icon nzType="up" class="ant-input-number-handler-up-inner" />
            </ng-content>
          </span>
          <span
            role="button"
            unselectable="on"
            class="ant-input-number-handler ant-input-number-handler-down"
            [class.ant-input-number-handler-down-disabled]="downDisabled()"
            [attr.aria-disabled]="downDisabled()"
            (mousedown)="onStepMouseDown($event, false)"
          >
            <ng-content select="[nzInputNumberDownIcon]">
              <nz-icon nzType="down" class="ant-input-number-handler-down-inner" />
            </ng-content>
          </span>
        </div>
      }

      <div class="ant-input-number-input-wrap">
        <input
          #input
          autocomplete="off"
          role="spinbutton"
          class="ant-input-number-input"
          [attr.aria-valuemin]="nzMin()"
          [attr.aria-valuemax]="nzMax()"
          [attr.id]="nzId()"
          [value]="displayValue()"
          [attr.step]="nzStep()"
          [placeholder]="nzPlaceHolder() ?? ''"
          [disabled]="finalDisabled()"
          [readOnly]="nzReadOnly()"
          (input)="displayValue.set(input.value)"
          (change)="onInputChange($event)"
        />
      </div>
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputNumberComponent),
      multi: true
    },
    { provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'input-number' }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'class()',
    '(keydown)': 'onKeyDown($event)'
  },
  hostDirectives: [NzSpaceCompactItemDirective]
})
export class NzInputNumberComponent implements OnInit, ControlValueAccessor {
  readonly nzId = input<string | null>(null);
  readonly nzSize = input<NzSizeLDSType>('default');
  readonly nzPlaceHolder = input<string | null>(null);
  readonly nzStatus = input<NzStatus>('');
  readonly nzStep = input(1, { transform: numberAttribute });
  readonly nzMin = input(Number.MIN_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzMax = input(Number.MAX_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzPrecision = input<number | null>(null);
  readonly nzParser = input<(value: string) => number>(value => {
    const parsedValue = defaultParser(value);
    const precision = this.nzPrecision();
    if (!isNil(precision)) {
      return +parsedValue.toFixed(precision);
    }
    return parsedValue;
  });
  readonly nzFormatter = input<(value: number) => string>(value => {
    const precision = this.nzPrecision();
    if (!isNil(precision)) {
      return value.toFixed(precision);
    }
    return value.toString();
  });
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly nzReadOnly = input(false, { transform: booleanAttribute });
  readonly nzAutoFocus = input(false, { transform: booleanAttribute });
  readonly nzBordered = input(true, { transform: booleanAttribute });
  readonly nzKeyboard = input(true, { transform: booleanAttribute });
  readonly nzControls = input(true, { transform: booleanAttribute });

  readonly nzOnStep = output<{ value: number; offset: number; type: 'up' | 'down' }>();

  private onChange: OnChangeType = () => {};
  private onTouched: OnTouchedType = () => {};
  private isDisabledFirstChange = true;
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private hostRef = viewChild<ElementRef<HTMLDivElement>>('inputNumberHost');
  private elementRef = inject(ElementRef);
  private injector = inject(Injector);
  private focusMonitor = inject(FocusMonitor);
  private directionality = inject(Directionality);
  private nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private autoStepTimer: ReturnType<typeof setTimeout> | null = null;

  protected value = signal<number | null>(null);
  protected displayValue = signal('');

  protected dir = toSignal(this.directionality.change, { initialValue: this.directionality.value });
  protected focused = signal(false);
  protected hasFeedback = signal(false);
  protected finalStatus = linkedSignal<NzValidateStatus>(() => this.nzStatus());
  protected finalDisabled = linkedSignal(() => this.nzDisabled());

  protected prefix = contentChild(NzInputPrefixDirective);
  protected suffix = contentChild(NzInputSuffixDirective);
  protected addonBefore = contentChild(NzInputAddonBeforeDirective);
  protected addonAfter = contentChild(NzInputAddonAfterDirective);
  protected hasAffix = computed(() => !!this.prefix() || !!this.suffix() || this.hasFeedback());
  protected hasAddon = computed(() => !!this.addonBefore() || !!this.addonAfter());

  protected class = computed(() => {
    if (this.hasAddon()) {
      return this.groupWrapperClass();
    }
    if (this.hasAffix()) {
      return this.affixWrapperClass();
    }
    return this.inputNumberClass();
  });
  protected inputNumberClass = computed(() => {
    return {
      'ant-input-number': true,
      'ant-input-number-lg': this.finalSize() === 'large',
      'ant-input-number-sm': this.finalSize() === 'small',
      'ant-input-number-disabled': this.finalDisabled(),
      'ant-input-number-readonly': this.nzReadOnly(),
      'ant-input-number-borderless': !this.nzBordered(),
      'ant-input-number-focused': this.focused(),
      'ant-input-number-rtl': this.dir() === 'rtl',
      'ant-input-number-in-form-item': !!this.nzFormStatusService,
      'ant-input-number-out-of-range': this.value() !== null && !isInRange(this.value()!, this.nzMin(), this.nzMax()),
      ...getStatusClassNames('ant-input-number', this.finalStatus(), this.hasFeedback())
    };
  });
  protected affixWrapperClass = computed(() => {
    return {
      'ant-input-number-affix-wrapper': true,
      'ant-input-number-affix-wrapper-disabled': this.finalDisabled(),
      'ant-input-number-affix-wrapper-readonly': this.nzReadOnly(),
      'ant-input-number-affix-wrapper-borderless': !this.nzBordered(),
      'ant-input-number-affix-wrapper-focused': this.focused(),
      'ant-input-number-affix-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-number-affix-wrapper', this.finalStatus(), this.hasFeedback())
    };
  });
  protected groupWrapperClass = computed(() => {
    return {
      'ant-input-number-group-wrapper': true,
      'ant-input-number-group-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-number-group-wrapper', this.finalStatus(), this.hasFeedback())
    };
  });

  protected finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.nzSize();
  });

  protected upDisabled = computed(() => {
    return !isNil(this.value()) && this.value()! >= this.nzMax();
  });
  protected downDisabled = computed(() => {
    return !isNil(this.value()) && this.value()! <= this.nzMin();
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const hostRef = this.hostRef();
      const element = hostRef ? hostRef : this.elementRef;

      this.focusMonitor
        .monitor(element, true)
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe(origin => {
          this.focused.set(!!origin);

          if (!origin) {
            this.onTouched();
          }
        });

      destroyRef.onDestroy(() => {
        this.focusMonitor.stopMonitoring(element);
      });
    });

    this.nzFormStatusService?.formStatusChanges.pipe(takeUntilDestroyed()).subscribe(({ status, hasFeedback }) => {
      this.finalStatus.set(status);
      this.hasFeedback.set(hasFeedback);
    });
  }

  ngOnInit(): void {
    if (this.nzAutoFocus()) {
      afterNextRender(() => this.focus(), { injector: this.injector });
    }
  }

  writeValue(value: number | null): void {
    untracked(() => this.setValue(value));
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.finalDisabled.set((this.isDisabledFirstChange && this.nzDisabled()) || disabled);
    this.isDisabledFirstChange = false;
  }

  focus(): void {
    this.inputRef().nativeElement.focus();
  }

  blur(): void {
    this.inputRef().nativeElement.blur();
  }

  private step(event: MouseEvent | KeyboardEvent, up: boolean): void {
    // Ignore step since out of range
    if ((up && this.upDisabled()) || (!up && this.downDisabled())) {
      return;
    }

    // When hold the shift key, the step is 10 times
    let step = event.shiftKey ? this.nzStep() * 10 : this.nzStep();
    if (!up) {
      step = -step;
    }
    const places = getDecimalPlaces(step);
    const multiple = Math.pow(10, places);
    // Convert floating point numbers to integers to avoid floating point math errors
    this.setValue((Math.round((this.value() || 0) * multiple) + Math.round(step * multiple)) / multiple, true);

    this.nzOnStep.emit({
      type: up ? 'up' : 'down',
      value: this.value()!,
      offset: this.nzStep()
    });

    this.focus();
  }

  private setValue(value: number | string | null, userTyping?: boolean): void {
    let parsedValue: number | null = null;

    if (!isNil(value)) {
      parsedValue = this.nzParser()(value.toString());

      // If the user is typing, we need to make sure the value is in the range.
      // Instead, we allow values to be set out of range programmatically,
      // and display out-of-range values as errors.
      if (userTyping) {
        if (Number.isNaN(parsedValue)) {
          parsedValue = null;
        } else {
          parsedValue = getRangeValueWithPrecision(parsedValue, this.nzMin(), this.nzMax(), this.nzPrecision());
        }
      }
    }

    this.value.set(parsedValue);
    this.displayValue.set(parsedValue === null ? '' : this.nzFormatter()(parsedValue));
    this.onChange(parsedValue);
  }

  protected stopAutoStep(): void {
    if (this.autoStepTimer !== null) {
      clearTimeout(this.autoStepTimer);
      this.autoStepTimer = null;
    }
  }

  protected onStepMouseDown(event: MouseEvent | KeyboardEvent, up: boolean): void {
    event.preventDefault();
    this.stopAutoStep();

    this.step(event, up);

    // Loop step for interval
    const loopStep: () => void = () => {
      this.step(event, up);
      this.autoStepTimer = setTimeout(loopStep, STEP_INTERVAL);
    };

    // First time press will wait some time to trigger loop step update
    this.autoStepTimer = setTimeout(loopStep, STEP_DELAY);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case UP_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, true);
        break;
      case DOWN_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, false);
        break;
    }
  }

  protected onInputChange(value: Event): void {
    const target = value.target as HTMLInputElement;
    this.setValue(target.value, true);
  }
}

/**
 * When click and hold on a button - the speed of auto changing the value.
 */
const STEP_INTERVAL = 200;

/**
 * When click and hold on a button - the delay before auto changing the value.
 */
const STEP_DELAY = 600;

function defaultParser(value: string): number {
  return +value.trim().replace(/。/g, '.');
  // [Legacy] We still support auto convert `$ 123,456` to `123456`
  // .replace(/[^\w.-]+/g, '');
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

function getRangeValue(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

/**
 * if max > 0, round down with precision. Example: input= 3.5, max= 3.5, precision=0; output= 3
 * if max < 0, round up with precision.   Example: input=-3.5, max=-3.5, precision=0; output=-4
 * if min > 0, round up with precision.   Example: input= 3.5, min= 3.5, precision=0; output= 4
 * if min < 0, round down with precision. Example: input=-3.5, min=-3.5, precision=0; output=-3
 */
function getRangeValueWithPrecision(value: number, min: number, max: number, precision: number | null): number {
  if (precision === null) {
    return getRangeValue(value, min, max);
  }

  const fixedValue = +value.toFixed(precision);
  const multiple = Math.pow(10, precision);

  if (fixedValue < min) {
    return Math.ceil(min * multiple) / multiple;
  }

  if (fixedValue > max) {
    return Math.floor(max * multiple) / multiple;
  }

  return fixedValue;
}

function getDecimalPlaces(num: number): number {
  return num.toString().split('.')[1]?.length || 0;
}
