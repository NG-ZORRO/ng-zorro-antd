/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'ok-button',
  exportAs: 'okButton',
  templateUrl: 'ok-button.component.html'
})
export class OkButtonComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() okDisabled: boolean = false;
  @Output() readonly clickOk = new EventEmitter<void>();

  prefixCls: string = 'ant-calendar';
}
