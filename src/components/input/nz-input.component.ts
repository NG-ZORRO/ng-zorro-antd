import {
  forwardRef,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import calculateNodeHeight from '../util/calculate-node-height';
import { toBoolean } from '../util/convert';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Component({
  selector     : 'nz-input',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span class="ant-input-group-addon" *ngIf="_addOnContentBefore">
      <ng-template [ngTemplateOutlet]="_addOnContentBefore">
      </ng-template>
    </span>
    <span class="ant-input-prefix" *ngIf="_prefixContent">
      <ng-template [ngTemplateOutlet]="_prefixContent">
      </ng-template>
    </span>
    <ng-template [ngIf]="nzType!='textarea'">
      <input
        (blur)="_emitBlur($event)"
        (focus)="_emitFocus($event)"
        [attr.id]="nzId"
        [disabled]="nzDisabled"
        [readonly]="nzReadonly"
        [attr.type]="nzType"
        class="ant-input"
        [class.ant-input-search]="nzType==='search'"
        [ngClass]="_classMap"
        [attr.placeholder]="nzPlaceHolder"
        [(ngModel)]="nzValue">
    </ng-template>
    <ng-template [ngIf]="nzType=='textarea'">
      <textarea
        (blur)="_emitBlur($event)"
        (focus)="_emitFocus($event)"
        (input)="textareaOnChange($event)"
        [attr.id]="nzId"
        #inputTextarea
        [disabled]="nzDisabled"
        [readonly]="nzReadonly"
        type="textarea"
        [attr.rows]="nzRows"
        [attr.cols]="nzCols"
        class="ant-input"
        [ngClass]="_classMap"
        [attr.placeholder]="nzPlaceHolder"
        [(ngModel)]="nzValue"></textarea>
    </ng-template>
    <span class="ant-input-suffix" *ngIf="(nzType==='search')||(_suffixContent)">
      <i class="anticon anticon-search ant-input-search-icon" *ngIf="nzType==='search'"></i>
      <ng-template [ngTemplateOutlet]="_suffixContent">
      </ng-template>
    </span>
    <span class="ant-input-group-addon" *ngIf="_addOnContentAfter">
      <ng-template [ngTemplateOutlet]="_addOnContentAfter">
      </ng-template>
    </span>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzInputComponent implements AfterContentInit, ControlValueAccessor, AfterViewInit {
  private _disabled = false;
  private _readonly = false;

  _el: HTMLElement;
  _value: string;
  _size = 'default';
  _prefixCls = 'ant-input';
  _composing = false;
  _classMap;
  _autosize: boolean | AutoSizeType = false;

  // ngModel Access
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  @Input() nzPlaceHolder: string;
  @Input() nzType = 'text';
  @Input() nzId: string;
  @Input() nzRows: number;
  @Input() nzCols: number;

  @Input()
  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
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

  @Input()
  set nzReadonly(value: boolean) {
    this._readonly = toBoolean(value);
  }

  get nzReadonly(): boolean {
    return this._readonly;
  }

  @Input()
  set nzAutosize(value: string | boolean | AutoSizeType) {
    if (typeof value === 'string') {
      this._autosize = true;
    } else {
      this._autosize = value;
    }
    if (this._autosize) {
      this.nzRows = 1;
    }
  }

  get nzAutosize(): string | boolean | AutoSizeType {
    return this._autosize;
  }

  @Output() nzBlur: EventEmitter<FocusEvent> = new EventEmitter();
  @Output() nzFocus: EventEmitter<FocusEvent> = new EventEmitter();
  @ViewChild('inputTextarea') textAreaRef: ElementRef;
  @ContentChild('addOnBefore') _addOnContentBefore: TemplateRef<void>;
  @ContentChild('addOnAfter') _addOnContentAfter: TemplateRef<void>;

  @ContentChild('prefix') _prefixContent: TemplateRef<void>;
  @ContentChild('suffix') _suffixContent: TemplateRef<void>;

  @HostListener('compositionstart', [ '$event' ])
  compositionStart(e: CompositionEvent): void {
    this._composing = true;
  }

  @HostListener('compositionend', [ '$event' ])
  compositionEnd(e: CompositionEvent): void {
    this._composing = false;
    this.onChange(this._value);
  }

  get nzValue(): string {
    return this._value;
  }

  set nzValue(value: string) {
    if ((this._value === value) || ((this._value == null) && (value == null))) {
      return;
    }
    this._value = value;
    if (!this._composing) {
      this.onChange(value);
    }
  }

  _emitBlur($event: FocusEvent): void {
    this.nzBlur.emit($event);
    this.onTouched();
  }

  _emitFocus($event: FocusEvent): void {
    this.nzFocus.emit($event);
  }

  setClassMap(): void {
    this._classMap = {
      [`${this._prefixCls}-${this._size}`]: true,
      [`${this._prefixCls}-disabled`]     : this._disabled
    };
  }

  resizeTextarea(): void {
    const textAreaRef =  this.textAreaRef.nativeElement;
    // eliminate jitter
    textAreaRef.style.height = 'auto';
    const maxRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).maxRows || null : null;
    const minRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).minRows || null : null;
    const textareaStyles = calculateNodeHeight(textAreaRef, false, minRows, maxRows);
    textAreaRef.style.height = `${textareaStyles.height}px`;
    textAreaRef.style.overflowY = textareaStyles.overflowY;
  }

  textareaOnChange(): void {
    if (this.nzType === 'textarea' && this.nzAutosize) {
      this.resizeTextarea();
    }
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    if (this.nzType === 'search' || this._prefixContent || this._suffixContent) {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-affix-wrapper`);
    } else {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-wrapper`);
    }
    if ((this._addOnContentBefore || this._addOnContentAfter)) {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-group`);
    }
  }

  ngAfterViewInit(): void {
    if (this.nzType === 'textarea' && this.nzAutosize) {
      setTimeout(() => this.resizeTextarea(), 0);
    }
  }

  writeValue(value: string): void {
    // this.nzValue = value; // [NOTE] nzValue will trigger the onChange which leads to a new "VIEW -> MODEL updating"
    this._value = value;
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
