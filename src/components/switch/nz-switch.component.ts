import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostListener,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-switch',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span [ngClass]="_classMap" tabindex="0">
      <span [ngClass]="_innerPrefixCls">
        <ng-template [ngIf]="_checked">
          <ng-content select="[checked]"></ng-content>
        </ng-template>
        <ng-template [ngIf]="!_checked">
          <ng-content select="[unchecked]"></ng-content>
        </ng-template>
      </span>
    </span>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSwitchComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzSwitchComponent implements OnInit, ControlValueAccessor {
  private _disabled = false;
  _prefixCls = 'ant-switch';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _classMap;
  _size: string;
  _checked = false;

  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  @Input()
  set nzSize(value: string) {
    this._size = value;
    this.setClassMap();
  }

  get nzSize(): string {
    return this._size;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @HostListener('click', [ '$event' ])
  onClick(e) {
    e.preventDefault();
    if (!this._disabled) {
      this.updateValue(!this._checked);
      this.onChange(this._checked);
    }
  }

  updateValue(value: any) {
    if (this._checked === value) {
      return;
    }
    this._checked = value;
    this.setClassMap();
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls]              : true,
      [`${this._prefixCls}-checked`] : this._checked,
      [`${this._prefixCls}-disabled`]: this._disabled,
      [`${this._prefixCls}-small`]   : this._size === 'small'
    };
  }

  writeValue(value: any): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  ngOnInit() {
    this.setClassMap();
  }
}
