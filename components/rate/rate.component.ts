/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NgClassType, NumberInput } from 'ng-zorro-antd/core/types';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'rate';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-rate',
  exportAs: 'nzRate',
  preserveWhitespaces: false,
  template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [class.ant-rate-rtl]="dir === 'rtl'"
      [ngClass]="classMap"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      <li
        *ngFor="let star of starArray; let i = index"
        class="ant-rate-star"
        [ngClass]="starStyleArray[i] || ''"
        nz-tooltip
        [nzTooltipTitle]="nzTooltips[i]"
      >
        <div
          nz-rate-item
          [allowHalf]="nzAllowHalf"
          [character]="nzCharacter"
          [index]="i"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
  providers: [
    NzDestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRateComponent),
      multi: true
    }
  ]
})
export class NzRateComponent implements OnInit, ControlValueAccessor, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAllowHalf: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzCount: NumberInput;

  @ViewChild('ulElement', { static: true }) ulElement!: ElementRef<HTMLUListElement>;

  @Input() @WithConfig() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzAllowHalf: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() nzCharacter!: TemplateRef<void>;
  @Input() @InputNumber() nzCount: number = 5;
  @Input() nzTooltips: string[] = [];
  @Output() readonly nzOnBlur = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnFocus = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnHoverChange = new EventEmitter<number>();
  @Output() readonly nzOnKeyDown = new EventEmitter<KeyboardEvent>();

  classMap: NgClassType = {};
  starArray: number[] = [];
  starStyleArray: NgClassType[] = [];
  dir: Direction = 'ltr';

  private hasHalf = false;
  private hoverValue = 0;
  private isFocused = false;
  private _value = 0;
  private isNzDisableFirstChange: boolean = true;

  get nzValue(): number {
    return this._value;
  }

  set nzValue(input: number) {
    if (this._value === input) {
      return;
    }

    this._value = input;
    this.hasHalf = !Number.isInteger(input);
    this.hoverValue = Math.ceil(input);
  }

  constructor(
    public nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    private destroy$: NzDestroyService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzAutoFocus, nzCount, nzValue } = changes;

    if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
      const el = this.ulElement.nativeElement;
      if (this.nzAutoFocus && !this.nzDisabled) {
        this.renderer.setAttribute(el, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(el, 'autofocus');
      }
    }

    if (nzCount) {
      this.updateStarArray();
    }

    if (nzValue) {
      this.updateStarStyle();
    }
  }

  ngOnInit(): void {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());

    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    this.ngZone.runOutsideAngular(() => {
      fromEvent<FocusEvent>(this.ulElement.nativeElement, 'focus')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          this.isFocused = true;
          if (this.nzOnFocus.observers.length) {
            this.ngZone.run(() => this.nzOnFocus.emit(event));
          }
        });

      fromEvent<FocusEvent>(this.ulElement.nativeElement, 'blur')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          this.isFocused = false;
          if (this.nzOnBlur.observers.length) {
            this.ngZone.run(() => this.nzOnBlur.emit(event));
          }
        });
    });
  }

  onItemClick(index: number, isHalf: boolean): void {
    if (this.nzDisabled) {
      return;
    }

    this.hoverValue = index + 1;

    const actualValue = isHalf ? index + 0.5 : index + 1;

    if (this.nzValue === actualValue) {
      if (this.nzAllowClear) {
        this.nzValue = 0;
        this.onChange(this.nzValue);
      }
    } else {
      this.nzValue = actualValue;
      this.onChange(this.nzValue);
    }

    this.updateStarStyle();
  }

  onItemHover(index: number, isHalf: boolean): void {
    if (this.nzDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
      return;
    }

    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    this.nzOnHoverChange.emit(this.hoverValue);

    this.updateStarStyle();
  }

  onRateLeave(): void {
    this.hasHalf = !Number.isInteger(this.nzValue);
    this.hoverValue = Math.ceil(this.nzValue);

    this.updateStarStyle();
  }

  focus(): void {
    this.ulElement.nativeElement.focus();
  }

  blur(): void {
    this.ulElement.nativeElement.blur();
  }

  onKeyDown(e: KeyboardEvent): void {
    const oldVal = this.nzValue;

    if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
      this.nzValue += this.nzAllowHalf ? 0.5 : 1;
    } else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
      this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
    }

    if (oldVal !== this.nzValue) {
      this.onChange(this.nzValue);
      this.nzOnKeyDown.emit(e);
      this.updateStarStyle();
      this.cdr.markForCheck();
    }
  }

  private updateStarArray(): void {
    this.starArray = Array(this.nzCount)
      .fill(0)
      .map((_, i) => i);

    this.updateStarStyle();
  }

  private updateStarStyle(): void {
    this.starStyleArray = this.starArray.map(i => {
      const prefix = 'ant-rate-star';
      const value = i + 1;
      return {
        [`${prefix}-full`]: value < this.hoverValue || (!this.hasHalf && value === this.hoverValue),
        [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
        [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
        [`${prefix}-zero`]: value > this.hoverValue,
        [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
      };
    });
  }

  writeValue(value: number | null): void {
    this.nzValue = value || 0;
    this.updateStarArray();
    this.cdr.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || isDisabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
}
