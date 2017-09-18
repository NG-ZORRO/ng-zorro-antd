import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  TemplateRef,
  ElementRef,
  Renderer2,
  EventEmitter,
  ContentChild,
  forwardRef,
  AfterContentInit,
  HostListener,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import calculateNodeHeight from '../util/calculate-node-height';

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

  _el: HTMLElement;
  _value: string;
  _size = 'default';
  _prefixCls = 'ant-input';
  _composing = false;
  _classMap;
  _disabled = false;
  _readonly = false;
  _autosize: boolean | AutoSizeType = false;

  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  @Input() nzPlaceHolder: string;
  @Input() nzType = 'text';
  @Input() nzId: string;
  @Input() nzRows: number;
  @Input() nzCols: number;

  @Input()
  get nzSize(): string {
    return this._size;
  };

  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
    this.setClassMap();
  }

  @Input()
  get nzDisabled(): boolean {
    return this._disabled;
  };

  set nzDisabled(value: boolean) {
    this._disabled = value;
    this.setClassMap();
  }

  @Input()
  get nzReadonly(): boolean {
    return this._readonly;
  };

  set nzReadonly(value: boolean) {
    this._readonly = value;
  }

  @Input()
  get nzAutosize() {
    return this._autosize;
  }

  set nzAutosize(value: string | boolean | AutoSizeType) {
    if (typeof value === 'string') {
      this._autosize = true;
    } else {
      this._autosize = <boolean | AutoSizeType>value;
    }
    if (this._autosize) {
      this.nzRows = 1;
    }
  }

  @Output() nzBlur: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() nzFocus: EventEmitter<MouseEvent> = new EventEmitter();
  @ViewChild('inputTextarea') textAreaRef: ElementRef;
  @ContentChild('addOnBefore') _addOnContentBefore: TemplateRef<any>;
  @ContentChild('addOnAfter') _addOnContentAfter: TemplateRef<any>;

  @ContentChild('prefix') _prefixContent: any;
  @ContentChild('suffix') _suffixContent: any;

  @HostListener('compositionstart', [ '$event' ])
  compositionStart(e): void {
    this._composing = true;
  }

  @HostListener('compositionend', [ '$event' ])
  compositionEnd(e): void {
    this._composing = false;
    this.onChange(this._value);
  }

  get nzValue(): any {
    return this._value;
  };

  set nzValue(value: any) {
    if ((this._value === value) || (((this._value === undefined) || (this._value === null)) && ((value === undefined) || (value === null)))) {
      return;
    }
    this._value = value;
    if (!this._composing) {
      this.onChange(value);
    }
  }

  _emitBlur($event) {
    this.nzBlur.emit($event);
    this.onTouched();
  }

  _emitFocus($event) {
    this.nzFocus.emit($event);
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls + '-' + this._size]: true,
      [`${this._prefixCls}-disabled`]     : this._disabled
    };
  }

  resizeTextarea() {
    const textAreaRef =  this.textAreaRef.nativeElement;
    // eliminate jitter
    textAreaRef.style.height = 'auto';
    const maxRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).maxRows || null : null;
    const minRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).minRows || null : null;
    const textareaStyles = calculateNodeHeight(textAreaRef, false, minRows, maxRows);
    textAreaRef.style.height = `${textareaStyles.height}px`;
    textAreaRef.style.overflowY = textareaStyles.overflowY;
  }

  textareaOnChange() {
    if (this.nzType === 'textarea' && this.nzAutosize) {
      this.resizeTextarea();
    }
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit() {
    if (this.nzType === 'search' || this._prefixContent || this._suffixContent) {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-affix-wrapper`);
    } else {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-wrapper`);
    }
    if ((this._addOnContentBefore || this._addOnContentAfter)) {
      this._renderer.setAttribute(this._el, 'class', `${this._prefixCls}-group`);
    }
  }

  ngAfterViewInit() {
    if (this.nzType === 'textarea' && this.nzAutosize) {
      setTimeout(() => this.resizeTextarea(), 0)
    }
  }

  writeValue(value: any): void {
    // this.nzValue = value; // [NOTE] nzValue will trigger the onChange which leads to a new "VIEW -> MODEL updating"
    this._value = value;
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
}
