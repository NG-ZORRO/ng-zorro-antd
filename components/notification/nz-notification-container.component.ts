/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { toCssPixel, warnDeprecation, NzConfigService } from 'ng-zorro-antd/core';
import { NzMessageContainerComponent } from 'ng-zorro-antd/message';

import {
  NzNotificationConfigLegacy,
  NZ_NOTIFICATION_CONFIG,
  NZ_NOTIFICATION_DEFAULT_CONFIG
} from './nz-notification-config';
import { NzNotificationDataFilled, NzNotificationDataOptions } from './nz-notification.definitions';

const NZ_CONFIG_COMPONENT_NAME = 'notification';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification-container',
  exportAs: 'nzNotificationContainer',
  preserveWhitespaces: false,
  templateUrl: './nz-notification-container.component.html'
})
export class NzNotificationContainerComponent extends NzMessageContainerComponent {
  config: Required<NzNotificationConfigLegacy>;
  bottom: string | null;

  /**
   * @override
   */
  messages: Array<Required<NzNotificationDataFilled>> = [];

  constructor(
    cdr: ChangeDetectorRef,
    nzConfigService: NzConfigService,
    @Optional() @Inject(NZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NzNotificationConfigLegacy,
    @Optional() @Inject(NZ_NOTIFICATION_CONFIG) config: NzNotificationConfigLegacy
  ) {
    super(cdr, nzConfigService, defaultConfig, config);
    if (!!config) {
      warnDeprecation(
        `Injection token 'NZ_NOTIFICATION_CONFIG' is deprecated and will be removed in 9.0.0. Please use 'NzConfigService' instead.`
      );
    }
  }

  /**
   * @override
   */
  setConfig(config?: NzNotificationConfigLegacy): void {
    const newConfig = (this.config = {
      ...this.config,
      ...config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    });
    const placement = this.config.nzPlacement;

    this.top = placement === 'topLeft' || placement === 'topRight' ? toCssPixel(newConfig.nzTop) : null;
    this.bottom = placement === 'bottomLeft' || placement === 'bottomRight' ? toCssPixel(newConfig.nzBottom) : null;

    this.cdr.markForCheck();
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
  protected subscribeConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => this.setConfig());
  }

  private replaceNotification(old: NzNotificationDataFilled, _new: NzNotificationDataFilled): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
  }
}
