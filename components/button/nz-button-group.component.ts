import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export type NzButtonGroupSize = 'small' | 'large' | 'default' ;

@Component({
  selector           : 'nz-button-group',
  preserveWhitespaces: false,
  templateUrl        : './nz-button-group.component.html'
})
export class NzButtonGroupComponent {
  private _size: NzButtonGroupSize;
  private prefixCls = 'ant-btn-group';
  private sizeMap = { large: 'lg', small: 'sm' };
  classMap = {
    [ this.prefixCls ]                                    : true,
    [ `${this.prefixCls}-${this.sizeMap[ this.nzSize ]}` ]: this.sizeMap[ this.nzSize ]
  };
  @ViewChild('groupWrapper') groupWrapper: ElementRef;

  @Input()
  get nzSize(): NzButtonGroupSize {
    return this._size;
  }

  set nzSize(value: NzButtonGroupSize) {
    this._size = value;
    this.classMap = {
      [ this.prefixCls ]                                    : true,
      [ `${this.prefixCls}-${this.sizeMap[ this.nzSize ]}` ]: this.sizeMap[ this.nzSize ]
    };
  }
}
