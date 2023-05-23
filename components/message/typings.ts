/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { NzStringLiteralUnion } from 'ng-zorro-antd/core/types';

export type NzMessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
}

export interface NzMessageData {
  type?: NzStringLiteralUnion<NzMessageType>;
  content?: string | TemplateRef<void>;
  messageId?: string;
  createdAt?: Date;
  options?: NzMessageDataOptions;
  state?: 'enter' | 'leave';

  onClose?: Subject<boolean>;
}

export type NzMessageRef = Pick<Required<NzMessageData>, 'onClose' | 'messageId'>;
