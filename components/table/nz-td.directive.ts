import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { toBoolean } from '../core/util/convert';

@Directive({
  selector: '[nz-td]'
})
export class NzTdDirective {
  private _checkbox = false;
  private _expand = false;
  _left = null;
  _right = null;
  _el: HTMLElement;

  @Input()
  @HostBinding(`class.ant-table-selection-column`)
  set nzCheckbox(value: boolean) {
    this._checkbox = toBoolean(value);
  }

  get nzCheckbox(): boolean {
    return this._checkbox;
  }

  @Input()
  @HostBinding(`class.ant-table-row-expand-icon-cell`)
  set nzExpand(value: boolean) {
    this._expand = toBoolean(value);
  }

  get nzExpand(): boolean {
    return this._expand;
  }

  @Input()
  @HostBinding(`style.left`)
  @HostBinding(`class.ant-table-td-left-sticky`)
  set nzLeft(value: string) {
    this._left = value;
  }

  get nzLeft(): string {
    return this._left;
  }

  @Input()
  @HostBinding(`style.right`)
  @HostBinding(`class.ant-table-td-right-sticky`)
  set nzRight(value: string) {
    this._right = value;
  }

  get nzRight(): string {
    return this._right;
  }

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
