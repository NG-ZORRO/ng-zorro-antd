import { TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { NzMessageData, NzMessageDataOptions } from '../message/nz-message.definitions';

export interface NzNotificationData extends NzMessageData {
  template?: TemplateRef<{}>;

  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  title?: string;
}

export interface NzNotificationDataOptions<T = {}> extends NzMessageDataOptions {
  nzKey?: string;
  nzStyle?: any; // tslint:disable-line:no-any
  nzClass?: any; // tslint:disable-line:no-any

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
