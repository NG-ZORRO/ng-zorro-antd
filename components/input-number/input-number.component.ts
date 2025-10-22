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
import {
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  NzVariant,
  OnChangeType,
  OnTouchedType
} from 'ng-zorro-antd/core/types';
import { getStatusClassNames, getVariantClassNames, isNil, isNotNil } from 'ng-zorro-antd/core/util';
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
  readonly nzVariant = input<NzVariant>('outlined');
  readonly nzStep = input(1, { transform: numberAttribute });
  readonly nzMin = input(Number.MIN_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzMax = input(Number.MAX_SAFE_INTEGER, { transform: numberAttribute });
  readonly nzPrecision = input<number | null>(null);
  readonly nzParser = input<((value: string) => number) | null>();
  readonly nzFormatter = input<((value: number) => string) | null>();
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly nzReadOnly = input(false, { transform: booleanAttribute });
  readonly nzAutoFocus = input(false, { transform: booleanAttribute });
  /**
   * @deprecated Will be removed in v21. It is recommended to use `nzVariant` instead.
   */
  readonly nzBordered = input(true, { transform: booleanAttribute });
  readonly nzKeyboard = input(true, { transform: booleanAttribute });
  readonly nzControls = input(true, { transform: booleanAttribute });
  readonly nzPrefix = input<string>();
  readonly nzSuffix = input<string>();
  readonly nzAddonBefore = input<string>();
  readonly nzAddonAfter = input<string>();

  readonly nzBlur = output<void>();
  readonly nzFocus = output<void>();

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
  private defaultFormatter = (value: number): string => {
    const precision = this.nzPrecision();
    if (isNotNil(precision)) {
      return value.toFixed(precision);
    }
    return value.toString();
  };

  protected readonly value = signal<number | null>(null);
  protected readonly displayValue = signal('');

  protected readonly dir = toSignal(this.directionality.change, { initialValue: this.directionality.value });
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
      'ant-input-number-out-of-range': this.value() !== null && !isInRange(this.value()!, this.nzMin(), this.nzMax()),
      ...getVariantClassNames('ant-input-number', this.nzVariant(), !this.nzBordered()),
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
      ...getVariantClassNames('ant-input-number-affix-wrapper', this.nzVariant(), !this.nzBordered())
    };
  });
  protected readonly groupWrapperClass = computed(() => {
    return {
      'ant-input-number-group-wrapper': true,
      'ant-input-number-group-wrapper-rtl': this.dir() === 'rtl',
      ...getStatusClassNames('ant-input-number-group-wrapper', this.finalStatus(), this.hasFeedback()),
      ...getVariantClassNames('ant-input-number-group-wrapper', this.nzVariant(), !this.nzBordered())
    };
  });

  protected readonly finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.nzSize();
  });

  protected readonly upDisabled = computed(() => {
    return !isNil(this.value()) && this.value()! >= this.nzMax();
  });
  protected readonly downDisabled = computed(() => {
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

          if (origin) {
            this.nzFocus.emit();
          } else {
            this.fixValue();
            this.onTouched();
            this.nzBlur.emit();
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

  writeValue(value: number | null | undefined): void {
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
    const multiple = 10 ** places;
    const nextValue = getRangeValue(
      // Convert floating point numbers to integers to avoid floating point math errors
      (Math.round((this.value() || 0) * multiple) + Math.round(step * multiple)) / multiple,
      this.nzMin(),
      this.nzMax(),
      this.nzPrecision()
    );
    this.setValue(nextValue);

    this.nzOnStep.emit({
      type: up ? 'up' : 'down',
      value: this.value()!,
      offset: this.nzStep()
    });

    this.focus();
  }

  private setValue(value: number | null): void {
    const formatter = this.nzFormatter() ?? this.defaultFormatter;
    const precision = this.nzPrecision();

    if (isNotNil(precision)) {
      value &&= +value.toFixed(precision);
    }

    const formatedValue = isNil(value) ? '' : formatter(value);
    this.displayValue.set(formatedValue);
    this.updateValue(value);
  }

  private setValueByTyping(value: string): void {
    this.displayValue.set(value);

    if (value === '') {
      this.updateValue(null);
      return;
    }

    const parser = this.nzParser() ?? defaultParser;
    const parsedValue = parser(value);

    if (isNotCompleteNumber(value) || Number.isNaN(parsedValue)) {
      return;
    }

    // Formatting is called during input only if the user provided a formatter.
    // Otherwise, formatting is only called when the input blurs.
    const formatter = this.nzFormatter();
    if (formatter) {
      const formattedValue = formatter(parsedValue);
      this.displayValue.set(formattedValue);
    }

    if (!isInRange(parsedValue, this.nzMin(), this.nzMax())) {
      return;
    }

    this.updateValue(parsedValue);
  }

  private updateValue(value: number | null): void {
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

    const parser = this.nzParser() ?? defaultParser;
    let fixedValue: number | null = parser(displayValue);

    // If parsing fails, revert to the previous value
    if (Number.isNaN(fixedValue)) {
      fixedValue = this.value();
    } else {
      const precision = this.nzPrecision();
      // fix precision
      if (isNotNil(precision) && getDecimalPlaces(fixedValue) !== precision) {
        fixedValue = +fixedValue.toFixed(precision);
      }

      // fix range
      if (!isInRange(fixedValue, this.nzMin(), this.nzMax())) {
        fixedValue = getRangeValue(fixedValue, this.nzMin(), this.nzMax(), precision);
      }
    }

    this.setValue(fixedValue);
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
      case ENTER:
        this.fixValue();
        break;
    }
  }

  protected onInput(value: string): void {
    this.setValueByTyping(value);
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
  const parsedValue = value.trim().replace(/,/g, '').replace(/。/g, '.');
  // `+'' === 0`, so we need to check if parsedValue is empty
  if (parsedValue.length) {
    return +parsedValue;
  }
  return NaN;
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * if max > 0, round down with precision. Example: input= 3.5, max= 3.5, precision=0; output= 3
 * if max < 0, round up   with precision. Example: input=-3.5, max=-3.5, precision=0; output=-4
 * if min > 0, round up   with precision. Example: input= 3.5, min= 3.5, precision=0; output= 4
 * if min < 0, round down with precision. Example: input=-3.5, min=-3.5, precision=0; output=-3
 */
function getRangeValue(value: number, min: number, max: number, precision: number | null = null): number {
  if (precision === null) {
    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
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

function isNotCompleteNumber(value: string | number): boolean {
  return /[.。](\d*0)?$/.test(value.toString());
}
