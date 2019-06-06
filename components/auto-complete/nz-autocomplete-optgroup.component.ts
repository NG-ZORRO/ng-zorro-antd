/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-auto-optgroup',
  exportAs: 'nzAutoOptgroup',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-autocomplete-optgroup.component.html',
  host: {
    role: 'group',
    class: 'ant-select-dropdown-menu-item-group'
  }
})
export class NzAutocompleteOptgroupComponent {
  @Input() nzLabel: string | TemplateRef<void>;

  constructor() {}
}
