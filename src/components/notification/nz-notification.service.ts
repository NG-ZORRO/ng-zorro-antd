import { Injectable, EventEmitter } from '@angular/core';
import { FloaterService } from '../core/floater/index';
import { NzNotificationData, NzNotificationDataFilled } from './nz-notification.definitions';
import { NzMessageBaseService } from '../message/nz-message.service';
import { NzMessageDataOptions } from '../message/nz-message.definitions';
import { NzNotificationContainerComponent } from './nz-notification-container.component';

@Injectable()
export class NzNotificationService extends NzMessageBaseService<NzNotificationContainerComponent, NzNotificationData> {

  constructor(floaterService: FloaterService) {
    super(floaterService, NzNotificationContainerComponent, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'success', title: title, content: content }, options);
  }

  error(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'error', title: title, content: content }, options);
  }

  info(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'info', title: title, content: content }, options);
  }

  warning(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'warning', title: title, content: content }, options);
  }

  blank(title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'blank', title: title, content: content }, options);
  }

  create(type: string, title: string, content: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: type as any, title: title, content: content }, options);
  }

  // For content with html
  html(html: string, options?: NzMessageDataOptions): NzNotificationDataFilled {
    return this.createMessage({ html: html }, options);
  }
}
