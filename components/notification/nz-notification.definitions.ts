/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { NgClassInterface, NgStyleInterface } from 'ng-zorro-antd/core';
import { NzMessageData, NzMessageDataOptions } from 'ng-zorro-antd/message';

export interface NzNotificationData extends NzMessageData {
  template?: TemplateRef<{}>;

  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  title?: string;
}

export type NzNotificationPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NzNotificationDataOptions<T = {}> extends NzMessageDataOptions {
  nzKey?: string;
  nzStyle?: NgStyleInterface | string;
  nzClass?: NgClassInterface | string;
  nzCloseIcon?: TemplateRef<void> | string;
  nzPosition?: NzNotificationPosition;

  /** Anything user wants renderer into a template. */
  nzData?: T;
}

// Filled version of NzMessageData (includes more private properties)
export interface NzNotificationDataFilled extends NzNotificationData {
  messageId: string; // Service-wide unique id, auto generated
  createdAt: Date; // Auto created

  state?: 'enter' | 'leave';
  options?: NzNotificationDataOptions;
  onClose?: Subject<boolean>;
}
