/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationConfig, NzConfigService, toCssPixel } from 'ng-zorro-antd/core';
import { MessageContainerComponent } from 'ng-zorro-antd/message';

import { NzNotificationDataFilled, NzNotificationDataOptions } from './typings';

const NZ_CONFIG_COMPONENT_NAME = 'notification';

const NZ_NOTIFICATION_DEFAULT_CONFIG: Required<NotificationConfig> = {
  nzTop: '24px',
  nzBottom: '24px',
  nzPlacement: 'topRight',
  nzDuration: 4500,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzAnimate: true
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification-container',
  exportAs: 'nzNotificationContainer',
  preserveWhitespaces: false,
  template: `
    <div
      class="ant-notification ant-notification-{{ config.nzPlacement }}"
      [style.top]="config.nzPlacement === 'topLeft' || config.nzPlacement === 'topRight' ? top : null"
      [style.bottom]="config.nzPlacement === 'bottomLeft' || config.nzPlacement === 'bottomRight' ? bottom : null"
      [style.right]="config.nzPlacement === 'bottomRight' || config.nzPlacement === 'topRight' ? '0px' : null"
      [style.left]="config.nzPlacement === 'topLeft' || config.nzPlacement === 'bottomLeft' ? '0px' : null"
    >
      <nz-notification *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"> </nz-notification>
    </div>
  `
})
export class NzNotificationContainerComponent extends MessageContainerComponent {
  config: Required<NotificationConfig>;
  bottom: string | null;

  /**
   * @override
   */
  messages: Array<Required<NzNotificationDataFilled>> = [];

  constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService) {
    super(cdr, nzConfigService);
  }

  /**
   * Create a new notification.
   * If there's a notification whose `nzKey` is same with `nzKey` in `NzNotificationDataFilled`,
   * replace its content instead of create a new one.
   * @override
   * @param notification
   */
  createMessage(notification: NzNotificationDataFilled): void {
    notification.options = this._mergeMessageOptions(notification.options);
    notification.onClose = new Subject<boolean>();
    const key = notification.options.nzKey;
    const notificationWithSameKey = this.messages.find(
      msg => msg.options.nzKey === (notification.options as Required<NzNotificationDataOptions>).nzKey
    );

    if (key && notificationWithSameKey) {
      this.replaceNotification(notificationWithSameKey, notification);
    } else {
      if (this.messages.length >= this.config.nzMaxStack) {
        this.messages.splice(0, 1);
      }
      this.messages.push(notification as Required<NzNotificationDataFilled>);
    }
    this.cdr.detectChanges();
  }

  /**
   * @override
   */
  protected updateConfig(): void {
    const newConfig = (this.config = {
      ...NZ_NOTIFICATION_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    });
    const placement = this.config.nzPlacement;

    this.top = placement === 'topLeft' || placement === 'topRight' ? toCssPixel(newConfig.nzTop) : null;
    this.bottom = placement === 'bottomLeft' || placement === 'bottomRight' ? toCssPixel(newConfig.nzBottom) : null;

    this.cdr.markForCheck();
  }

  /**
   * @override
   */
  protected subscribeConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => this.updateConfig());
  }

  private replaceNotification(old: NzNotificationDataFilled, _new: NzNotificationDataFilled): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
  }
}
