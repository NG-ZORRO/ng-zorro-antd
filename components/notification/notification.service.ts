/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';

import { NzMNService } from 'ng-zorro-antd/message';

import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationData, NzNotificationDataOptions, NzNotificationRef } from './typings';

let notificationId = 0;

@Injectable({
  providedIn: 'root'
})
export class NzNotificationService extends NzMNService<NzNotificationContainerComponent> {
  protected componentPrefix = 'notification-';

  constructor(overlay: Overlay, injector: Injector) {
    super(overlay, injector);
  }

  success(
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.create('success', title, content, options);
  }

  error(
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.create('error', title, content, options);
  }

  info(
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.create('info', title, content, options);
  }

  warning(
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.create('warning', title, content, options);
  }

  blank(
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.create('blank', title, content, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title: string | TemplateRef<void>,
    content: string | TemplateRef<void>,
    options?: NzNotificationDataOptions
  ): NzNotificationRef {
    return this.createInstance({ type, title, content }, options);
  }

  template(template: TemplateRef<{}>, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ template }, options);
  }

  protected generateMessageId(): string {
    return `${this.componentPrefix}-${notificationId++}`;
  }

  private createInstance(message: NzNotificationData, options?: NzNotificationDataOptions): NzNotificationRef {
    this.container = this.withContainer(NzNotificationContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: options?.nzKey || this.generateMessageId(),
        options
      }
    });
  }
}
