/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { InputNumber } from 'ng-zorro-antd/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-descriptions-item',
  templateUrl: './nz-descriptions-item.component.html',
  exportAs: 'nzDescriptionsItem',
  preserveWhitespaces: false
})
export class NzDescriptionsItemComponent {
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  @Input() @InputNumber() nzSpan = 1;
  @Input() nzTitle: string = '';
}
