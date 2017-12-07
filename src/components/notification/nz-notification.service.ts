import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { NzMessageDataOptions } from '../message/nz-message.definitions';
import { NzMessageBaseService } from '../message/nz-message.service';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationData, NzNotificationDataFilled } from './nz-notification.definitions';

@Injectable()
export class NzNotificationService extends NzMessageBaseService<NzNotificationContainerComponent, NzNotificationData> {

  constructor(overlay: Overlay) {
    super(overlay, NzNotificationContainerComponent, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'success', title, content }, options) as NzNotificationDataFilled;
  }

  error(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'error', title, content }, options) as NzNotificationDataFilled;
  }

  info(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'info', title, content }, options) as NzNotificationDataFilled;
  }

  warning(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'warning', title, content }, options) as NzNotificationDataFilled;
  }

  blank(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'blank', title, content }, options) as NzNotificationDataFilled;
  }

  create(type: string, title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type, title, content }, options) as NzNotificationDataFilled;
  }

  // For content with html
  html(html: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ html }, options) as NzNotificationDataFilled;
  }
}
