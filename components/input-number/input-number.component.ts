/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NzFormItemFeedbackIconComponent,
  NzFormStatusService
} from 'ng-zorro-antd/core/form';
import {
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  NzVariant,
  OnChangeType,
  OnTouchedType
} from 'ng-zorro-antd/core/types';
import {
  getStatusClassNames,
  getVariantClassNames,
  InputFocusOptions,
  isNil,
  isNotNil,
  triggerFocus
} from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzInputAddonAfterDirective,
  NzInputAddonBeforeDirective,
  NzInputPrefixDirective,
  NzInputSuffixDirective
} from 'ng-zorro-antd/input';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

import { getMiniDecimal, MiniDecimal, toFixed, type NzInputNumberValueType } from './mini-decimal';

export type { NzInputNumberValueType } from './mini-decimal';

export type NzInputNumberStepEmitter = 'wheel' | 'handler' | 'keyboard';
export interface NzInputNumberStepEvent {
  value: NzInputNumberValueType;
  offset: number;
  type: 'up' | 'down';
  emitter: NzInputNumberStepEmitter;
}

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
        @if (hasAddonBefore()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonBefore]">{{ nzAddonBefore() }}</ng-content>
          </div>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputNumberWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="inputNumber" />
        }

        @if (hasAddonAfter()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonAfter]">{{ nzAddonAfter() }}</ng-content>
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
      @if (hasPrefix()) {
        <span class="ant-input-number-prefix">
          <ng-content select="[nzInputPrefix]">{{ nzPrefix() }}</ng-content>
        </span>
      }
      <ng-template [ngTemplateOutlet]="inputNumber" />
      @if (hasSuffix()) {
        <span class="ant-input-number-suffix">
          <ng-content select="[nzInputSuffix]">{{ nzSuffix() }}</ng-content>
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
          [attr.step]="nzStep()"
          [attr.value]="displayValue()"
          [value]="displayValue()"
          [placeholder]="nzPlaceHolder() ?? ''"
          [disabled]="finalDisabled()"
          [readOnly]="nzReadOnly()"
          (input)="onInput(input.value)"
          (wheel)="onWheel($event)"
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
  readonly nzStringMode = input<boolean>(false, { transform: booleanAttribute });
  readonly nzVariant = input<NzVariant>();
  readonly nzStep = input(1, { transform: numberAttribute });
  readonly nzMin = input(Number.MIN_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzMax = input(Number.MAX_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzPrecision = input<number | null>(null);
  readonly nzParser = input<((value: string) => number) | null>();
  readonly nzFormatter = input<((value: number) => string) | null>();
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly nzReadOnly = input(false, { transform: booleanAttribute });
  readonly nzAutoFocus = input(false, { transform: booleanAttribute });
  readonly nzKeyboard = input(true, { transform: booleanAttribute });
  readonly nzControls = input(true, { transform: booleanAttribute });
  readonly nzChangeOnWheel = input(true, { transform: booleanAttribute });
  readonly nzPrefix = input<string>();
  readonly nzSuffix = input<string>();
  readonly nzAddonBefore = input<string>();
  readonly nzAddonAfter = input<string>();

  readonly nzBlur = output<void>();
  readonly nzFocus = output<void>();

  readonly nzOnStep = output<NzInputNumberStepEvent>();

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
  private defaultFormatter = (decimal: MiniDecimal): string => {
    const precision = this.nzPrecision();
    if (isNotNil(precision)) {
      return toFixed(decimal.toString(), precision);
    }
    return decimal.toString();
  };

  protected readonly value = signal<NzInputNumberValueType | null>(null);
  protected readonly displayValue = signal('');

  private readonly formSize = inject(NZ_FORM_SIZE, { optional: true });
  private readonly formVariant = inject(NZ_FORM_VARIANT, { optional: true });

  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly focused = signal(false);
  protected readonly hasFeedback = signal(false);
  protected readonly finalStatus = linkedSignal<NzValidateStatus>(() => this.nzStatus());
  protected readonly finalDisabled = linkedSignal(() => this.nzDisabled());

  protected readonly prefix = contentChild(NzInputPrefixDirective);
  protected readonly suffix = contentChild(NzInputSuffixDirective);
  protected readonly addonBefore = contentChild(NzInputAddonBeforeDirective);
  protected readonly addonAfter = contentChild(NzInputAddonAfterDirective);

  protected readonly hasPrefix = computed(() => !!this.nzPrefix() || !!this.prefix());
  protected readonly hasSuffix = computed(() => !!this.nzSuffix() || !!this.suffix() || this.hasFeedback());
  protected readonly hasAffix = computed(() => this.hasPrefix() || this.hasSuffix());
  protected readonly hasAddonBefore = computed(() => !!this.nzAddonBefore() || !!this.addonBefore());
  protected readonly hasAddonAfter = computed(() => !!this.nzAddonAfter() || !!this.addonAfter());
  protected readonly hasAddon = computed(() => this.hasAddonBefore() || this.hasAddonAfter());

  protected readonly class = computed(() => {
    if (this.hasAddon()) {
      return this.groupWrapperClass();
    }
    if (this.hasAffix()) {
      return this.affixWrapperClass();
    }
    return this.inputNumberClass();
  });
  protected readonly inputNumberClass = computed(() => {
    return {
      'ant-input-number': true,
      'ant-input-number-lg': this.finalSize() === 'large',
      'ant-input-number-sm': this.finalSize() === 'small',
      'ant-input-number-disabled': this.finalDisabled(),
      'ant-input-number-readonly': this.nzReadOnly(),
      'ant-input-number-focused': this.focused(),
      'ant-input-number-rtl': this.dir() === 'rtl',
      'ant-input-number-in-form-item': !!this.nzFormStatusService,
      'ant-input-number-out-of-range': this.value() !== null && !this.isInRange(getMiniDecimal(this.value())),
      ...getVariantClassNames('ant-input-number', this.finalVariant()),
      ...getStatusClassNames('ant-input-number', this.finalStatus(), this.hasFeedback())
    };
  });
  protected readonly affixWrapperClass = computed(() => {
    return {
      'ant-input-number-affix-wrapper': true,
      'ant-input-number-affix-wrapper-disabled': this.finalDisabled(),
      'ant-input-number-affix-wrapper-readonly': this.nzReadOnly(),
      'ant-input-number-affix-wrapper-focused': this.focused(),
      'ant-input-number-affix-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-number-affix-wrapper', this.finalStatus(), this.hasFeedback()),
      ...getVariantClassNames('ant-input-number-affix-wrapper', this.finalVariant())
    };
  });
  protected readonly groupWrapperClass = computed(() => {
    return {
      'ant-input-number-group-wrapper': true,
      'ant-input-number-group-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-number-group-wrapper', this.finalStatus(), this.hasFeedback()),
      ...getVariantClassNames('ant-input-number-group-wrapper', this.finalVariant())
    };
  });

  protected readonly finalSize = computed(() => {
    if (this.formSize?.()) {
      return this.formSize();
    }
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.nzSize();
  });

  protected readonly finalVariant = computed(() => this.nzVariant() || this.formVariant?.() || 'outlined');

  protected readonly upDisabled = computed(() => {
    return !isNil(this.value()) && getMiniDecimal(this.nzMax()).lessEquals(getMiniDecimal(this.value()));
  });
  protected readonly downDisabled = computed(() => {
    return !isNil(this.value()) && getMiniDecimal(this.value()).lessEquals(getMiniDecimal(this.nzMin()));
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
          untracked(() => {
            this.focused.set(!!origin);

            if (origin) {
              this.nzFocus.emit();
            } else {
              this.fixValue();
              this.onTouched();
              this.nzBlur.emit();
            }
          });
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

  writeValue(value: NzInputNumberValueType | null | undefined): void {
    if (isNil(value)) value = null;
    untracked(() => {
      this.value.set(value);
      this.setValue(value);
    });
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    untracked(() => {
      this.finalDisabled.set((this.isDisabledFirstChange && this.nzDisabled()) || disabled);
    });
    this.isDisabledFirstChange = false;
  }

  focus(options?: InputFocusOptions): void {
    triggerFocus(this.inputRef().nativeElement, options);
  }

  blur(): void {
    this.inputRef().nativeElement.blur();
  }

  private step(event: MouseEvent | KeyboardEvent, up: boolean, emitter: NzInputNumberStepEmitter): void {
    // Ignore step since field is readonly
    if (this.nzReadOnly()) {
      return;
    }

    // Ignore step since out of range
    if ((up && this.upDisabled()) || (!up && this.downDisabled())) {
      return;
    }

    // When hold the shift key, the step is 10 times
    const rawStep = event.shiftKey ? getMiniDecimal(this.nzStep()).multi(10).toString() : this.nzStep();
    let stepDecimal = getMiniDecimal(rawStep);
    if (!up) {
      stepDecimal = stepDecimal.negate();
    }

    const target = getMiniDecimal(this.value() ?? 0).add(stepDecimal.toString());
    const nextValue = getRangeDecimal(
      target,
      getMiniDecimal(this.nzMin()),
      getMiniDecimal(this.nzMax()),
      this.nzPrecision()
    );
    this.setValue(nextValue.isEmpty() ? null : nextValue.toString());

    this.nzOnStep.emit({
      type: up ? 'up' : 'down',
      value: this.value()!,
      offset: this.nzStep(),
      emitter: emitter
    });

    this.focus();
  }

  private setValue(value: NzInputNumberValueType | null): void {
    let decimal = getMiniDecimal(value);
    const precision = this.nzPrecision();

    if (isNotNil(precision) && !decimal.isInvalidate()) {
      decimal = getMiniDecimal(toFixed(decimal.toString(), precision));
    }

    const formatter = this.nzFormatter();
    const formattedValue = decimal.isEmpty()
      ? ''
      : formatter
        ? formatter(decimal.toNumber())
        : this.defaultFormatter(decimal);
    this.displayValue.set(formattedValue);
    this.updateValue(this.getOutputValue(decimal));
  }

  private setValueByTyping(value: string): void {
    this.displayValue.set(value);

    if (value === '') {
      this.updateValue(null);
      return;
    }

    if (isNotCompleteNumber(value)) {
      return;
    }

    const decimal = this.parseTyped(value);

    if (decimal.isNaN()) {
      return;
    }

    // Formatting is called during input only if the user provided a formatter.
    // Otherwise, formatting is only called when the input blurs.
    const formatter = this.nzFormatter();
    if (formatter) {
      this.displayValue.set(formatter(decimal.toNumber()));
    }

    if (!this.isInRange(decimal)) {
      return;
    }

    this.updateValue(this.getOutputValue(decimal));
  }

  private updateValue(value: NzInputNumberValueType | null): void {
    if (this.value() !== value) {
      this.value.set(value);
      this.onChange(value);
    }
  }

  private fixValue(): void {
    const displayValue = this.displayValue();

    if (displayValue === '') {
      return;
    }

    let decimal = this.parseTyped(displayValue);

    // If parsing fails, revert to the previous value
    if (decimal.isNaN()) {
      this.setValue(this.value());
      return;
    }

    const precision = this.nzPrecision();
    if (isNotNil(precision)) {
      decimal = getMiniDecimal(toFixed(decimal.toString(), precision));
    }

    if (!this.isInRange(decimal)) {
      decimal = getRangeDecimal(decimal, getMiniDecimal(this.nzMin()), getMiniDecimal(this.nzMax()), precision);
    }

    this.setValue(decimal.isEmpty() ? null : decimal.toString());
  }

  /** Parses raw typed input, treating a value that cleans down to an empty string as invalid. */
  private parseTyped(raw: string): MiniDecimal {
    const customParser = this.nzParser();
    if (customParser) {
      return getMiniDecimal(customParser(cleanTypedValue(raw)));
    }
    const cleaned = cleanTypedValue(raw);
    return cleaned.length ? getMiniDecimal(cleaned) : getMiniDecimal(NaN);
  }

  private getOutputValue(decimal: MiniDecimal): NzInputNumberValueType | null {
    if (decimal.isEmpty() || decimal.isInvalidate()) {
      return null;
    }
    return this.nzStringMode() ? decimal.toString() : decimal.toNumber();
  }

  private isInRange(decimal: MiniDecimal): boolean {
    return isInRangeDecimal(decimal, getMiniDecimal(this.nzMin()), getMiniDecimal(this.nzMax()));
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

    this.step(event, up, 'handler');

    // Loop step for interval
    const loopStep: () => void = () => {
      this.step(event, up, 'handler');
      this.autoStepTimer = setTimeout(loopStep, STEP_INTERVAL);
    };

    // First time press will wait some time to trigger loop step update
    this.autoStepTimer = setTimeout(loopStep, STEP_DELAY);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case UP_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, true, 'keyboard');
        break;
      case DOWN_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, false, 'keyboard');
        break;
      case ENTER:
        this.fixValue();
        break;
    }
  }

  protected onInput(value: string): void {
    this.setValueByTyping(value);
  }

  protected onWheel(event: WheelEvent): void {
    if (this.finalDisabled() || this.nzReadOnly() || !this.nzChangeOnWheel()) {
      return;
    }

    event.preventDefault();
    this.step(event, event.deltaY < 0, 'wheel');
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

// `+'' === 0`, so trimming to an empty string must stay distinguishable from `0`.
function cleanTypedValue(value: string): string {
  return value.trim().replace(/,/g, '').replace(/。/g, '.');
}

function isInRangeDecimal(decimal: MiniDecimal, min: MiniDecimal, max: MiniDecimal): boolean {
  return min.lessEquals(decimal) && decimal.lessEquals(max);
}

// Smallest representable unit for a given precision, e.g. `2` => `0.01`.
function precisionUnit(precision: number): string {
  return precision > 0 ? `0.${'0'.repeat(precision - 1)}1` : '1';
}

// Smallest value >= `decimal` at `precision`. Truncating toward zero already yields this for negative numbers
function ceilPrecision(decimal: MiniDecimal, precision: number): MiniDecimal {
  const truncated = getMiniDecimal(toFixed(decimal.toString(), precision, true));
  if (truncated.equals(decimal) || decimal.toString().startsWith('-')) {
    return truncated;
  }
  return truncated.add(precisionUnit(precision));
}

//Largest value <= `decimal` at `precision`. Truncating toward zero already yields this for positive numbers.
function floorPrecision(decimal: MiniDecimal, precision: number): MiniDecimal {
  const truncated = getMiniDecimal(toFixed(decimal.toString(), precision, true));
  if (truncated.equals(decimal) || !decimal.toString().startsWith('-')) {
    return truncated;
  }
  return truncated.add(`-${precisionUnit(precision)}`);
}

/**
 * if max > 0, round down with precision. Example: input= 3.5, max= 3.5, precision=0; output= 3
 * if max < 0, round up   with precision. Example: input=-3.5, max=-3.5, precision=0; output=-4
 * if min > 0, round up   with precision. Example: input= 3.5, min= 3.5, precision=0; output= 4
 * if min < 0, round down with precision. Example: input=-3.5, min=-3.5, precision=0; output=-3
 */
function getRangeDecimal(
  decimal: MiniDecimal,
  min: MiniDecimal,
  max: MiniDecimal,
  precision: number | null
): MiniDecimal {
  if (isNil(precision)) {
    if (!min.lessEquals(decimal)) {
      return min;
    }
    if (!decimal.lessEquals(max)) {
      return max;
    }
    return decimal;
  }

  const fixedDecimal = getMiniDecimal(toFixed(decimal.toString(), precision));

  if (!min.lessEquals(fixedDecimal)) {
    return ceilPrecision(min, precision);
  }

  if (!fixedDecimal.lessEquals(max)) {
    return floorPrecision(max, precision);
  }

  return fixedDecimal;
}

function isNotCompleteNumber(value: string | number): boolean {
  return /[.。](\d*0)?$/.test(value.toString());
}
