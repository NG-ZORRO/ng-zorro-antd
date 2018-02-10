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
  private _size = 'default';
  private _disabled = false;
  private _autosize: boolean | AutoSizeType = false;
  private el: HTMLElement;

  @Input()
  get nzSize(): string {
    return this._size;
  }

  set nzSize(value: string) {
    this._size = value;
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
    return this.nzSize === 'large';
  }

  @HostBinding(`class.ant-input-sm`)
  get setSmClass(): boolean {
    return this.nzSize === 'small';
  }

  @HostListener('input')
  textAreaOnChange(): void {
    if (this.nzAutosize) {
      this.resizeTextArea();
    }
  }

  resizeTextArea(): void {
    const textAreaRef = this.el as HTMLTextAreaElement;
    // eliminate jitter
    this.renderer.setStyle(textAreaRef, 'height', 'auto');
    const maxRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).maxRows || null : null;
    const minRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).minRows || null : null;
    const textAreaStyles = calculateNodeHeight(textAreaRef, false, minRows, maxRows);
    this.renderer.setStyle(textAreaRef, 'height', `${textAreaStyles.height}px`);
    this.renderer.setStyle(textAreaRef, 'overflowY', textAreaStyles.overflowY);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.nzAutosize) {
      this.resizeTextArea();
    }
  }
}
