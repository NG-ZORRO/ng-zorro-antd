import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { NzNotificationData, NzNotificationDataFilled } from './nz-notification.definitions';
import { NzMessageBaseService } from '../message/nz-message.service';
import { NzMessageDataOptions } from '../message/nz-message.definitions';
import { NzNotificationContainerComponent } from './nz-notification-container.component';

@Injectable()
export class NzNotificationService extends NzMessageBaseService<NzNotificationContainerComponent, NzNotificationData> {

  constructor(overlay: Overlay) {
    super(overlay, NzNotificationContainerComponent, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'success', title: title, content: content }, options) as NzNotificationDataFilled;
  }

  error(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'error', title: title, content: content }, options) as NzNotificationDataFilled;
  }

  info(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'info', title: title, content: content }, options) as NzNotificationDataFilled;
  }

  warning(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'warning', title: title, content: content }, options) as NzNotificationDataFilled;
  }

  blank(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'blank', title: title, content: content }, options) as NzNotificationDataFilled;
  }

  create(type: string, title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: type as any, title: title, content: content }, options) as NzNotificationDataFilled;
  }

  // For content with html
  html(html: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ html: html }, options) as NzNotificationDataFilled;
  }
}
