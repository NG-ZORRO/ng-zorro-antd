import {
  forwardRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBoolean } from '../core/util/convert';

export type NzSwitchSizeType = 'default' | 'small';

@Component({
  selector           : 'nz-switch',
  preserveWhitespaces: false,
  template           : `
    <span [ngClass]="classMap" [tabindex]="nzDisabled?-1:0" #switchElement (keydown)="onKeyDown($event)">
      <span class="ant-switch-inner">
        <span *ngIf="checked">
          <ng-container *ngIf="isCheckedChildrenString; else checkedChildrenTemplate">{{ nzCheckedChildren }}</ng-container>
          <ng-template #checkedChildrenTemplate>
            <ng-template [ngTemplateOutlet]="nzCheckedChildren"></ng-template>
          </ng-template>
        </span>
        <span *ngIf="!checked">
          <ng-container *ngIf="isUnCheckedChildrenString; else unCheckedChildrenTemplate">{{ nzUnCheckedChildren }}</ng-container>
          <ng-template #unCheckedChildrenTemplate>
            <ng-template [ngTemplateOutlet]="nzUnCheckedChildren"></ng-template>
          </ng-template>
        </span>
      </span>
    </span>
  `,
  styles             : [ `
    :host {
      display: inline-block;
    }
  ` ],
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzSwitchComponent),
      multi      : true
    }
  ]
})
export class NzSwitchComponent implements OnInit, ControlValueAccessor {
  private _disabled = false;
  private _size: NzSwitchSizeType;
  private _loading = false;
  private _control = false;
  private _checkedChildren: string | TemplateRef<void>;
  private _unCheckedChildren: string | TemplateRef<void>;
  prefixCls = 'ant-switch';
  classMap;
  checked = false;
  isCheckedChildrenString: boolean;
  isUnCheckedChildrenString: boolean;
  @ViewChild('switchElement')
  private switchElement: ElementRef;
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  set nzControl(value: boolean) {
    this._control = toBoolean(value);
  }

  get nzControl(): boolean {
    return this._control;
  }

  @Input()
  set nzCheckedChildren(value: string | TemplateRef<void>) {
    this.isCheckedChildrenString = !(value instanceof TemplateRef);
    this._checkedChildren = value;
  }

  get nzCheckedChildren(): string | TemplateRef<void> {
    return this._checkedChildren;
  }

  @Input()
  set nzUnCheckedChildren(value: string | TemplateRef<void>) {
    this.isUnCheckedChildrenString = !(value instanceof TemplateRef);
    this._unCheckedChildren = value;
  }

  get nzUnCheckedChildren(): string | TemplateRef<void> {
    return this._unCheckedChildren;
  }

  @Input()
  set nzSize(value: NzSwitchSizeType) {
    this._size = value;
    this.setClassMap();
  }

  get nzSize(): NzSwitchSizeType {
    return this._size;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
    this.setClassMap();
  }

  get nzLoading(): boolean {
    return this._loading;
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
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if ((!this.nzDisabled) && (!this.nzLoading) && (!this.nzControl)) {
      this.updateValue(!this.checked, true);
    }
  }

  updateValue(value: boolean, emit: boolean): void {
    if (this.checked === value) {
      return;
    }
    this.checked = value;
    this.setClassMap();
    if (emit) {
      this.onChange(this.checked);
    }
  }

  setClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]              : true,
      [ `${this.prefixCls}-checked` ] : this.checked,
      [ `${this.prefixCls}-loading` ] : this.nzLoading,
      [ `${this.prefixCls}-disabled` ]: this.nzDisabled,
      [ `${this.prefixCls}-small` ]   : this.nzSize === 'small'
    };
  }

  onKeyDown(e: KeyboardEvent): void {
    if (!this.nzControl) {
      if (e.keyCode === 37) { // Left
        this.updateValue(false, true);
        e.preventDefault();
      } else if (e.keyCode === 39) { // Right
        this.updateValue(true, true);
        e.preventDefault();
      } else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
        this.updateValue(!this.checked, true);
        e.preventDefault();
      }
    }
  }

  focus(): void {
    this.switchElement.nativeElement.focus();
  }

  blur(): void {
    this.switchElement.nativeElement.blur();
  }

  writeValue(value: boolean): void {
    this.updateValue(value, false);
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
