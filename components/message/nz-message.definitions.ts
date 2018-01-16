import { TemplateRef } from '@angular/core';

export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
  /* tslint:disable-next-line:no-any */
  nzStyle?: any;
  /* tslint:disable-next-line:no-any */
  nzClass?: any;
}

// Message data for terminal users
export interface NzMessageData {
  // For template
  template?: TemplateRef<void>;

  // For string content
  // TODO: remove the literal parts as it's widened anyway
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading' | string;
  content?: string;
}

// Filled version of NzMessageData (includes more private properties)
export interface NzMessageDataFilled extends NzMessageData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NzMessageDataOptions;
  createdAt: Date; // Auto created
}
