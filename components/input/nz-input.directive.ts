import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Optional,
  Renderer2,
  Self
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

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
export class NzInputDirective implements DoCheck, AfterViewInit {
  private _size = 'default';
  private _disabled = false;
  private _autosize: boolean | AutoSizeType = false;
  private el: HTMLTextAreaElement | HTMLInputElement = this.elementRef.nativeElement;
  private previousValue: string;
  private previewsMinRows: number;
  private previewsMaxRows: number;
  private isInit = false;

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
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
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
    const maxRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).maxRows || null : null;
    const minRows = this.nzAutosize ? (this.nzAutosize as AutoSizeType).minRows || null : null;
    if ((this.previousValue === textAreaRef.value) && (this.previewsMaxRows === maxRows) && (this.previewsMinRows === minRows)) {
      return;
    }
    this.previousValue = textAreaRef.value;
    this.previewsMinRows = minRows;
    this.previewsMaxRows = maxRows;
    // eliminate jitter
    this.renderer.setStyle(textAreaRef, 'height', 'auto');

    const textAreaStyles = calculateNodeHeight(textAreaRef, false, minRows, maxRows);
    this.renderer.setStyle(textAreaRef, 'height', `${textAreaStyles.height}px`);
    this.renderer.setStyle(textAreaRef, 'overflowY', textAreaStyles.overflowY);
    this.renderer.setStyle(textAreaRef, 'minHeight', `${textAreaStyles.minHeight}px`);
    this.renderer.setStyle(textAreaRef, 'maxHeight', `${textAreaStyles.maxHeight}px`);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Optional() private ngModel: NgModel, @Optional() @Self() public ngControl: NgControl) {
  }

  ngDoCheck(): void {
    if (this.nzAutosize && this.isInit) {
      this.resizeTextArea();
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    if (this.nzAutosize) {
      this.resizeTextArea();
    }
  }
}
