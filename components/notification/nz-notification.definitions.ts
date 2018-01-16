import { NzMessageData, NzMessageDataOptions } from '../message/nz-message.definitions';

export interface NzNotificationData extends NzMessageData {
  // Overrides for string content
  type?: 'success' | 'info' | 'warning' | 'error' | 'blank';
  title?: string;
}

// Filled version of NzMessageData (includes more private properties)
export interface NzNotificationDataFilled extends NzNotificationData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: NzMessageDataOptions;
  createdAt: Date; // Auto created
}
