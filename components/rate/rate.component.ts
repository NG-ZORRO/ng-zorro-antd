/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
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
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NgClassType } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_COMPONENT_NAME = 'rate';

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
      [ngClass]="classMap"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
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
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRateComponent),
      multi: true
    }
  ]
})
export class NzRateComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAllowHalf: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzCount: BooleanInput;

  @ViewChild('ulElement', { static: false }) private ulElement?: ElementRef;

  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzAllowClear: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzAllowHalf: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() nzCharacter?: TemplateRef<void>;
  @Input() @InputNumber() nzCount: number = 5;
  @Input() nzTooltips: string[] = [];
  @Output() readonly nzOnBlur = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnFocus = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnHoverChange = new EventEmitter<number>();
  @Output() readonly nzOnKeyDown = new EventEmitter<KeyboardEvent>();

  classMap: NgClassType = {};
  starArray: number[] = [];
  starStyleArray: NgClassType[] = [];

  private readonly destroy$ = new Subject<void>();
  private hasHalf = false;
  private hoverValue = 0;
  private isFocused = false;
  private _value = 0;

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

  constructor(public nzConfigService: NzConfigService, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzAutoFocus, nzCount, nzValue } = changes;

    if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
      const el = this.ulElement!.nativeElement;
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
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  onFocus(e: FocusEvent): void {
    this.isFocused = true;
    this.nzOnFocus.emit(e);
  }

  onBlur(e: FocusEvent): void {
    this.isFocused = false;
    this.nzOnBlur.emit(e);
  }

  focus(): void {
    this.ulElement!.nativeElement.focus();
  }

  blur(): void {
    this.ulElement!.nativeElement.blur();
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
    this.nzDisabled = isDisabled;
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
