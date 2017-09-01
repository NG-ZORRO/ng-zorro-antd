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
  AfterContentInit, HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
        [attr.id]="nzId"
        #inputTextarea
        [disabled]="nzDisabled"
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
export class NzInputComponent implements AfterContentInit, ControlValueAccessor {

  _el: HTMLElement;
  _value: string;
  _size = 'default';
  _prefixCls = 'ant-input';
  _composing = false;
  _classMap;
  _disabled = false;

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

  @Output() nzBlur: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() nzFocus: EventEmitter<MouseEvent> = new EventEmitter();
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


  writeValue(value: any): void {
    this.nzValue = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
