import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import calculateNodeHeight from '../core/util/calculate-node-height';
import { toBoolean } from '../core/util/convert';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Directive({
  selector: '[nz-input]',
  host    : {
    '[class.ant-input]': 'true'
  }
})
export class NzInputDirective implements AfterViewInit {
  size = 'default';
  nativeElement: HTMLElement;
  _disabled = false;
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
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzAutosize(value: string | boolean | AutoSizeType) {
    if (typeof value === 'string') {
      this._autosize = true;
    } else {
      this._autosize = value;
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

  @HostListener('input')
  textAreaOnChange(): void {
    if (this.nzAutosize) {
      this.resizeTextArea();
    }
  }

  resizeTextArea(): void {
    const textAreaRef = this.nativeElement as HTMLTextAreaElement;
    // eliminate jitter
    textAreaRef.style.height = 'auto';
    const maxRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).maxRows || null : null;
    const minRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).minRows || null : null;
    const textAreaStyles = calculateNodeHeight(textAreaRef, false, minRows, maxRows);
    textAreaRef.style.height = `${textAreaStyles.height}px`;
    textAreaRef.style.overflowY = textAreaStyles.overflowY;
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this.nativeElement = this._elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.nzAutosize) {
      setTimeout(() => this.resizeTextArea());
    }
  }
}
