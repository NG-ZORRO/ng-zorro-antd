import {
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-input-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzInputGroupComponent implements AfterContentInit {
  private _compat = false;

  _el: HTMLElement;
  _prefixCls = 'ant-input';

  @HostBinding(`class.ant-input-group-lg`)
  get _isLarge(): boolean {
    return this.nzSize === 'lg';
  }

  @HostBinding(`class.ant-input-group-sm`)
  get _isSmall(): boolean {
    return this.nzSize === 'sm';
  }

  @Input() nzSize: string;

  @Input()
  @HostBinding(`class.ant-input-group-compact`)
  set nzCompact(value: boolean) {
    this._compat = toBoolean(value);
  }

  get nzCompact(): boolean {
    return this._compat;
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._render.addClass(this._el, `${this._prefixCls}-group`);
  }

  ngAfterContentInit(): void {
    /** trim text node between button */
    Array.from(this._el.childNodes).forEach((node: HTMLElement) => {
      if (node.nodeType === 3) {
        this._el.removeChild(node);
      }
    });
  }
}
