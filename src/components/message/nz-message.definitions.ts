export interface NzMessageDataOptions {
  nzDuration?: number;
  nzAnimate?: boolean;
  nzPauseOnHover?: boolean;
}

// Message data for terminal users
export interface NzMessageData {
  // For html
  html?: string;

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
