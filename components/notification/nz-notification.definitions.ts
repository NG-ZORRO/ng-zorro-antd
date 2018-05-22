import { TemplateRef } from '@angular/core';

import { NzMessageData, NzMessageDataOptions } from '../message/nz-message.definitions';

export interface NzNotificationData extends NzMessageData {
  template?: TemplateRef<{}>;

  type?: 'success' | 'info' | 'warning' | 'error' | 'blank' | string;
  title?: string;
}

export interface NzNotificationDataOptions extends NzMessageDataOptions {
  /* tslint:disable-next-line:no-any */
  nzStyle?: any;
  /* tslint:disable-next-line:no-any */
  nzClass?: any;
}

// Filled version of NzMessageData (includes more private properties)
export interface NzNotificationDataFilled extends NzNotificationData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NzNotificationDataOptions;
  createdAt: Date; // Auto created
}
