/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { NzSafeAny, type NgClassInterface, type NgStyleInterface } from 'ng-zorro-antd/core/types';

import { NzMNComponent } from './base';

export type NzMessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

export type NzMessageContentType = string | TemplateRef<void | { $implicit: NzMNComponent; data: NzSafeAny }>;

export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
  nzData?: NzSafeAny;
  nzStyle?: NgStyleInterface | string;
  nzClass?: NgClassInterface | string;
}

export interface NzMessageData {
  type?: NzMessageType | string;
  content?: NzMessageContentType;
  messageId?: string;
  createdAt?: Date;
  options?: NzMessageDataOptions;
  state?: 'enter' | 'leave';
  onClose?: Subject<boolean>;
}

export type NzMessageRef = Pick<Required<NzMessageData>, 'onClose' | 'messageId'>;
