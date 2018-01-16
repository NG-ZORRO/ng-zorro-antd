import { Component, HostBinding, Input } from '@angular/core';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-divider',
  preserveWhitespaces: false,
  template           : `
    <span class="ant-divider-inner-text">
      <ng-content></ng-content>
    </span>
  `,
  host               : {
    '[class.ant-divider]': 'true'
  }
})
export class NzDividerComponent {
  _dashed = false;
  _text = false;
  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';

  @Input()
  @HostBinding('class.ant-divider-dashed')
  set nzDashed(value: boolean) {
    this._dashed = toBoolean(value);
  }

  get nzDashed(): boolean {
    return this._dashed;
  }

  @Input()
  @HostBinding('class.ant-divider-with-text')
  set nzText(value: boolean) {
    this._text = toBoolean(value);
  }

  get nzText(): boolean {
    return this._text;
  }

  @HostBinding('class.ant-divider-horizontal')
  get isHorizontal(): boolean {
    return this.nzType === 'horizontal';
  }

  @HostBinding('class.ant-divider-vertical')
  get isVertical(): boolean {
    return this.nzType === 'vertical';
  }
}
