/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

@Component({
  selector: 'nz-option',
  exportAs: 'nzOption',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-option.component.html'
})
export class NzOptionComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
  @Input() nzLabel: string;
  // tslint:disable-next-line:no-any
  @Input() nzValue: any;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzCustomContent = false;
}
