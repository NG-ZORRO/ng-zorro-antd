/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { NotificationConfig, NzConfigService, toCssPixel } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
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
    <div class="ant-notification ant-notification-topLeft" [style.top]="top" [style.left]="'0px'">
      <nz-notification
        *ngFor="let message of topLeftMessages"
        [nzMessage]="message"
        [nzPlacement]="config.nzPlacement"
        (messageDestroy)="removeMessage($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-topRight" [style.top]="top" [style.right]="'0px'">
      <nz-notification
        *ngFor="let message of topRightMessages"
        [nzMessage]="message"
        [nzPlacement]="config.nzPlacement"
        (messageDestroy)="removeMessage($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-bottomLeft" [style.bottom]="bottom" [style.left]="'0px'">
      <nz-notification
        *ngFor="let message of bottomLeftMessages"
        [nzMessage]="message"
        [nzPlacement]="config.nzPlacement"
        (messageDestroy)="removeMessage($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-bottomRight" [style.bottom]="bottom" [style.right]="'0px'">
      <nz-notification
        *ngFor="let message of bottomRightMessages"
        [nzMessage]="message"
        [nzPlacement]="config.nzPlacement"
        (messageDestroy)="removeMessage($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `
})
export class NzNotificationContainerComponent implements OnInit, OnDestroy {
  config: Required<NotificationConfig>;
  bottom: string | null;
  messages: Array<Required<NzNotificationDataFilled>> = [];

  constructor(protected cdr: ChangeDetectorRef, protected nzConfigService: NzConfigService) {
    this.updateConfig();
  }

  get topLeftMessages(): Array<Required<NzNotificationDataFilled>> {
    return this.messages.filter(m => m.options.nzPosition === 'topLeft');
  }

  get topRightMessages(): Array<Required<NzNotificationDataFilled>> {
    return this.messages.filter(m => m.options.nzPosition === 'topRight' || !m.options.nzPosition);
  }

  get bottomLeftMessages(): Array<Required<NzNotificationDataFilled>> {
    return this.messages.filter(m => m.options.nzPosition === 'bottomLeft');
  }

  get bottomRightMessages(): Array<Required<NzNotificationDataFilled>> {
    return this.messages.filter(m => m.options.nzPosition === 'bottomRight');
  }

  /**
   * Create a new notification.
   * If there's a notification whose `nzKey` is same with `nzKey` in `NzNotificationDataFilled`,
   * replace its content instead of create a new one.
   * @override
   * @param notification
   */
  createMessage(notification: NzNotificationDataFilled): void {
    notification.options = this.mergeMessageOptions(notification.options);
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

  protected updateConfig(): void {
    const newConfig = (this.config = {
      ...NZ_NOTIFICATION_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    }) as NotificationConfig;

    this.top = toCssPixel(newConfig.nzTop!);
    this.bottom = toCssPixel(newConfig.nzBottom!);

    this.cdr.markForCheck();
  }

  protected subscribeConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => this.updateConfig());
  }

  private replaceNotification(old: NzNotificationDataFilled, _new: NzNotificationDataFilled): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
  }

  destroy$ = new Subject<void>();
  top: string | null;

  ngOnInit(): void {
    this.subscribeConfigChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Remove a message by `messageId`.
   * @param messageId Id of the message to be removed.
   * @param userAction Whether this is closed by user interaction.
   */
  removeMessage(messageId: string, userAction: boolean = false): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        this.messages = [...this.messages];
        this.cdr.detectChanges();
        message.onClose!.next(userAction);
        message.onClose!.complete();
        return true;
      }
      return false;
    });
  }

  /**
   * Remove all messages.
   */
  removeMessageAll(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }

  /**
   * Merge default options and custom message options
   * @param options
   */
  protected mergeMessageOptions(options?: NzNotificationDataOptions): NzNotificationDataOptions {
    const defaultOptions: NzNotificationDataOptions = {
      nzDuration: this.config.nzDuration,
      nzAnimate: this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return { ...defaultOptions, ...options };
  }
}
