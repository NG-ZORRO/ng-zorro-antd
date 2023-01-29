/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { NgClassInterface, NgStyleInterface } from 'ng-zorro-antd/core/types';

export type NzNotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'top' | 'bottom';

export interface NzNotificationDataOptions<T = {}> {
  nzKey?: string;
  nzStyle?: NgStyleInterface;
  nzClass?: NgClassInterface | string;
  nzCloseIcon?: TemplateRef<void> | string;
  nzPlacement?: NzNotificationPlacement;
  nzData?: T;
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
}

export interface NzNotificationData {
  content?: string | TemplateRef<void>;
  createdAt?: Date;
  messageId?: string;
  options?: NzNotificationDataOptions;
  state?: 'enter' | 'leave';
  template?: TemplateRef<{}>;
  title?: string;
  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;

  // observables exposed to users
  onClose?: Subject<boolean>;
  onClick?: Subject<MouseEvent>;
}

export type NzNotificationRef = Pick<Required<NzNotificationData>, 'onClose' | 'onClick' | 'messageId'>;
