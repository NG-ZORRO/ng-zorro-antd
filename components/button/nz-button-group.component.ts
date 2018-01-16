import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { trimWhiteSpace } from '../core/util/trim-whitespace';

export type NzButtonGroupSize = 'small' | 'large' | 'default' ;

@Component({
  selector           : 'nz-button-group',
  preserveWhitespaces: false,
  template           : `
    <div [ngClass]="_classMap" #groupWrapper>
      <ng-content></ng-content>
    </div>
  `
})
export class NzButtonGroupComponent implements AfterViewInit {
  _size: NzButtonGroupSize;
  _prefixCls = 'ant-btn-group';
  _sizeMap = { large: 'lg', small: 'sm' };
  _classMap = {
    [ this._prefixCls ]                                     : true,
    [ `${this._prefixCls}-${this._sizeMap[ this.nzSize ]}` ]: this._sizeMap[ this.nzSize ]
  };
  @ViewChild('groupWrapper') _groupWrapper: ElementRef;

  @Input()
  get nzSize(): NzButtonGroupSize {
    return this._size;
  }

  set nzSize(value: NzButtonGroupSize) {
    this._size = value;
    this._classMap = {
      [ this._prefixCls ]                                     : true,
      [ `${this._prefixCls}-${this._sizeMap[ this.nzSize ]}` ]: this._sizeMap[ this.nzSize ]
    };
  }

  ngAfterViewInit(): void {
    /** trim text node between button */
    trimWhiteSpace(this._groupWrapper.nativeElement);
  }
}
