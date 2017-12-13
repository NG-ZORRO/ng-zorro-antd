import { AfterContentInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

export type NzButtonGroupSize = 'small' | 'large' | 'default' ;

@Component({
  selector     : 'nz-button-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [ngClass]="_classMap" #groupWrapper>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls    : []
})
export class NzButtonGroupComponent implements AfterContentInit {
  _size: NzButtonGroupSize;
  _prefixCls = 'ant-btn-group';
  _sizeMap = { large: 'lg', small: 'sm' };
  _classMap = {
    [this._prefixCls]                                     : true,
    [`${this._prefixCls}-${this._sizeMap[ this.nzSize ]}`]: this._sizeMap[ this.nzSize ]
  };
  @ViewChild('groupWrapper') _groupWrapper: ElementRef;

  @Input()
  get nzSize(): NzButtonGroupSize {
    return this._size;
  }

  set nzSize(value: NzButtonGroupSize) {
    this._size = value;
    this._classMap = {
      [this._prefixCls]                                     : true,
      [`${this._prefixCls}-${this._sizeMap[ this.nzSize ]}`]: this._sizeMap[ this.nzSize ]
    };
  }

  ngAfterContentInit(): void {
    /** trim text node between button */
    Array.from(this._groupWrapper.nativeElement.childNodes).forEach((node: HTMLElement) => {
      if (node.nodeType === 3) {
        this._groupWrapper.nativeElement.removeChild(node);
      }
    });
  }
}
