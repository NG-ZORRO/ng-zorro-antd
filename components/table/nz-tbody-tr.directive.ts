import { Directive, HostBinding, Input } from '@angular/core';

import { toBoolean } from '../core/util/convert';

@Directive({
  selector: '[nz-tbody-tr]',
  host    : {
    '[class.ant-table-row]': 'true'
  }
})

export class NzTbodyTrDirective {
  _expand = false;
  @Input()
  @HostBinding(`class.ant-table-expanded-row`)
  set nzExpand(value: boolean) {
    this._expand = toBoolean(value);
  }

  get nzExpand(): boolean {
    return this._expand;
  }
}
