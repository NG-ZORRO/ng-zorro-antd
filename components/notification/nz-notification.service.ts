import { Overlay } from '@angular/cdk/overlay';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';

import { NzMessageBaseService } from '../message/nz-message.service';

import { NzNotificationConfig } from './nz-notification-config';
import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationData, NzNotificationDataFilled, NzNotificationDataOptions } from './nz-notification.definitions';

@Injectable({
  providedIn: 'root'
})
export class NzNotificationService extends NzMessageBaseService<NzNotificationContainerComponent, NzNotificationData, NzNotificationConfig> {

  constructor(
    overlay: Overlay,
    injector: Injector,
    cfr: ComponentFactoryResolver,
    appRef: ApplicationRef) {

    super(overlay, NzNotificationContainerComponent, injector, cfr, appRef, 'notification-');
  }

  // Shortcut methods
  success(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'success', title, content }, options) as NzNotificationDataFilled;
  }

  error(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'error', title, content }, options) as NzNotificationDataFilled;
  }

  info(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'info', title, content }, options) as NzNotificationDataFilled;
  }

  warning(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'warning', title, content }, options) as NzNotificationDataFilled;
  }

  blank(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'blank', title, content }, options) as NzNotificationDataFilled;
  }

  create(type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string, title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type, title, content }, options) as NzNotificationDataFilled;
  }

  // For content with template
  template(template: TemplateRef<{}>, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ template }, options) as NzNotificationDataFilled;
  }
}
