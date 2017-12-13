import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { AutoSizeType } from './nz-input.component';

@Component({
  selector     : '[nz-input]',
  encapsulation: ViewEncapsulation.None,
  template     : ``,
  styleUrls    : [
    './style/index.less'
  ],
  host: {
    '[class.ant-input]': 'true'
  }
})
export class NzInputDirectiveComponent {
  private _disabled = false;
  private _readonly = false;

  size = 'default';
  nativeElement: HTMLElement;
  _autosize: boolean | AutoSizeType = false;

  @Input()
  get nzSize(): string {
    return this.size;
  }

  set nzSize(value: string) {
    this.size = { large: 'lg', small: 'sm' }[ value ];
  }

  @Input()
  @HostBinding(`class.ant-input-disabled`)
  set nzDisabled(value: boolean) {
    const disabled = toBoolean(value);
    if (disabled) {
      this._render.setAttribute(this.nativeElement, 'disabled', '');
    } else {
      this._render.removeAttribute(this.nativeElement, 'disabled');
    }
    this._disabled = disabled;
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzReadonly(value: boolean) {
    const readonly = toBoolean(value);
    if (readonly) {
      this._render.setAttribute(this.nativeElement, 'readonly', '');
    } else {
      this._render.removeAttribute(this.nativeElement, 'readonly');
    }
    this._readonly = readonly;
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
      this._render.setAttribute(this.nativeElement, 'autosize', '');
    } else {
      this._render.removeAttribute(this.nativeElement, 'autosize');
    }
  }

  get nzAutosize(): string | boolean | AutoSizeType {
    return this._autosize;
  }

  @HostBinding(`class.ant-input-lg`)
  get setLgClass(): boolean {
    return this.size === 'lg';
  }

  @HostBinding(`class.ant-input-sm`)
  get setSmClass(): boolean {
    return this.size === 'sm';
  }

  constructor(private _elementRef: ElementRef,
              private _render: Renderer2) {
    this.nativeElement = this._elementRef.nativeElement;

  }
}
