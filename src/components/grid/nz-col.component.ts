import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostBinding,
  OnChanges,
  Renderer2,
  SimpleChange,
  Host,
  Optional
} from '@angular/core';
import { NzRowComponent } from './nz-row.component';

@Component({
  selector     : 'nz-col',
  template     : `
    <ng-content></ng-content>
  `,
  styles       : []
})

export class NzColComponent implements OnInit, OnChanges {
  _classList: Array<string> = [];
  _el: HTMLElement;
  _prefixCls = 'ant-col';

  @HostBinding('style.padding-left.px')
  get paddingLeft() {
    return this._nzRow && this._nzRow._gutter / 2;
  }

  @HostBinding('style.padding-right.px')
  get paddingRight() {
    return this._nzRow && this._nzRow._gutter / 2;
  }

  @Input() nzSpan: number;
  @Input() nzOrder: number;
  @Input() nzOffset: number;
  @Input() nzPush: number;
  @Input() nzPull: number;
  @Input() nzXs: number;
  @Input() nzSm: number;
  @Input() nzMd: number;
  @Input() nzLg: number;
  @Input() nzXl: number;

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this.nzSpan && `${this._prefixCls}-${this.nzSpan}`,
      this.nzOrder && `${this._prefixCls}-order-${this.nzOrder}`,
      this.nzOffset && `${this._prefixCls}-offset-${this.nzOffset}`,
      this.nzPull && `${this._prefixCls}-pull-${this.nzPull}`,
      this.nzPush && `${this._prefixCls}-push-${this.nzPush}`,
      this.nzXs && `${this._prefixCls}-xs-${this.nzXs}`,
      this.nzSm && `${this._prefixCls}-sm-${this.nzSm}`,
      this.nzMd && `${this._prefixCls}-md-${this.nzMd}`,
      this.nzLg && `${this._prefixCls}-lg-${this.nzLg}`,
      this.nzXl && `${this._prefixCls}-xl-${this.nzXl}`,
    ].filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    })
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.setClassMap();
  }

  constructor(private _elementRef: ElementRef, @Optional() @Host() public _nzRow: NzRowComponent, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): any {
    this.setClassMap();
  }
}
