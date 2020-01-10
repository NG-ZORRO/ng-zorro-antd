/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

export type NzMessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
}

/**
 * Message data for terminal users.
 */
export interface NzMessageData {
  type?: NzMessageType | string;
  content?: string | TemplateRef<void>;
}

/**
 * Filled version of NzMessageData (includes more private properties).
 */
export interface NzMessageDataFilled extends NzMessageData {
  messageId: string;
  createdAt: Date;

  options?: NzMessageDataOptions;
  state?: 'enter' | 'leave';
  onClose?: Subject<boolean>;
}
