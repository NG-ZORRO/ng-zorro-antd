import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Directive({
  selector: '[nz-th]'
})
export class NzThDirective {
  private _checkbox = false;
  private _expand = false;

  _el: HTMLElement;
  @Input() nzWidth;

  @Input()
  @HostBinding(`class.ant-table-selection-column`)
  set nzCheckbox(value: boolean) {
    this._checkbox = toBoolean(value);
  }

  get nzCheckbox(): boolean {
    return this._checkbox;
  }

  @Input()
  @HostBinding(`class.ant-table-expand-icon-th`)
  set nzExpand(value: boolean) {
    this._expand = toBoolean(value);
  }

  get nzExpand(): boolean {
    return this._expand;
  }

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
