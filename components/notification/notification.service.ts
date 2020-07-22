/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMNService } from 'ng-zorro-antd/message';

import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationServiceModule } from './notification.service.module';
import { NzNotificationData, NzNotificationDataOptions, NzNotificationRef } from './typings';

let notificationId = 0;

@Injectable({
  providedIn: NzNotificationServiceModule
})
export class NzNotificationService extends NzMNService {
  protected container!: NzNotificationContainerComponent;
  protected componentPrefix = 'notification-';

  constructor(nzSingletonService: NzSingletonService, overlay: Overlay, injector: Injector) {
    super(nzSingletonService, overlay, injector);
  }

  success(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ type: 'success', title, content }, options);
  }

  error(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ type: 'error', title, content }, options);
  }

  info(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ type: 'info', title, content }, options);
  }

  warning(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ type: 'warning', title, content }, options);
  }

  blank(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationRef {
    return this.createInstance({ type: 'blank', title, content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title: string,
    content: string,
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
        messageId: this.generateMessageId(),
        options
      }
    });
  }
}
