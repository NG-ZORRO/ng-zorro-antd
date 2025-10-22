/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { NotificationConfig, onConfigChangeEventForComponent } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from 'ng-zorro-antd/message';

import { NzNotificationComponent } from './notification.component';
import { NzNotificationData, NzNotificationDataOptions, NzNotificationPlacement } from './typings';

const NZ_CONFIG_MODULE_NAME = 'notification';

const NZ_NOTIFICATION_DEFAULT_CONFIG: Required<NotificationConfig> = {
  nzTop: '24px',
  nzBottom: '24px',
  nzPlacement: 'topRight',
  nzDuration: 4500,
  nzMaxStack: 8,
  nzPauseOnHover: true,
  nzAnimate: true,
  nzDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification-container',
  exportAs: 'nzNotificationContainer',
  template: `
    <div
      class="ant-notification ant-notification-topLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      @for (instance of topLeftInstances; track instance) {
        <nz-notification
          [instance]="instance"
          [placement]="'topLeft'"
          (destroyed)="remove($event.id, $event.userAction)"
        />
      }
    </div>
    <div
      class="ant-notification ant-notification-topRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      @for (instance of topRightInstances; track instance) {
        <nz-notification
          [instance]="instance"
          [placement]="'topRight'"
          (destroyed)="remove($event.id, $event.userAction)"
        />
      }
    </div>
    <div
      class="ant-notification ant-notification-bottomLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      @for (instance of bottomLeftInstances; track instance) {
        <nz-notification
          [instance]="instance"
          [placement]="'bottomLeft'"
          (destroyed)="remove($event.id, $event.userAction)"
        />
      }
    </div>
    <div
      class="ant-notification ant-notification-bottomRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      @for (instance of bottomRightInstances; track instance) {
        <nz-notification
          [instance]="instance"
          [placement]="'bottomRight'"
          (destroyed)="remove($event.id, $event.userAction)"
        />
      }
    </div>
    <div
      class="ant-notification ant-notification-top"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
    >
      @for (instance of topInstances; track instance) {
        <nz-notification [instance]="instance" [placement]="'top'" (destroyed)="remove($event.id, $event.userAction)" />
      }
    </div>
    <div
      class="ant-notification ant-notification-bottom"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
    >
      @for (instance of bottomInstances; track instance) {
        <nz-notification
          [instance]="instance"
          [placement]="'bottom'"
          (destroyed)="remove($event.id, $event.userAction)"
        />
      }
    </div>
  `,
  imports: [NzNotificationComponent]
})
export class NzNotificationContainerComponent extends NzMNContainerComponent<NotificationConfig, NzNotificationData> {
  dir: Direction = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME)?.nzDirection || 'ltr';
  bottom?: string | null;
  top?: string | null;
  topLeftInstances: Array<Required<NzNotificationData>> = [];
  topRightInstances: Array<Required<NzNotificationData>> = [];
  bottomLeftInstances: Array<Required<NzNotificationData>> = [];
  bottomRightInstances: Array<Required<NzNotificationData>> = [];
  topInstances: Array<Required<NzNotificationData>> = [];
  bottomInstances: Array<Required<NzNotificationData>> = [];

  constructor() {
    super();
    this.updateConfig();
  }

  override create(notification: NzNotificationData): Required<NzNotificationData> {
    const instance = this.onCreate(notification);
    const key = instance.options.nzKey;
    const notificationWithSameKey = this.instances.find(
      msg => msg.options.nzKey === (notification.options as Required<NzNotificationDataOptions>).nzKey
    );
    if (key && notificationWithSameKey) {
      this.replaceNotification(notificationWithSameKey, instance);
    } else {
      if (this.instances.length >= this.config!.nzMaxStack) {
        this.instances = this.instances.slice(1);
      }
      this.instances = [...this.instances, instance];
    }

    this.readyInstances();

    return instance;
  }

  protected override onCreate(instance: NzNotificationData): Required<NzNotificationData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    instance.onClick = new Subject<MouseEvent>();
    return instance as Required<NzNotificationData>;
  }

  protected subscribeConfigChange(): void {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
      this.updateConfig();
      this.dir = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME)?.nzDirection || this.dir;
    });
  }

  protected updateConfig(): void {
    this.config = {
      ...NZ_NOTIFICATION_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME)
    };

    this.top = toCssPixel(this.config.nzTop!);
    this.bottom = toCssPixel(this.config.nzBottom!);

    this.cdr.markForCheck();
  }

  private replaceNotification(old: NzNotificationData, _new: NzNotificationData): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
    old.options = _new.options;
  }

  protected override readyInstances(): void {
    const instancesMap: Record<NzNotificationPlacement, Array<Required<NzNotificationData>>> = {
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
      top: [],
      bottom: []
    };
    this.instances.forEach(m => {
      const placement = m.options.nzPlacement;
      switch (placement) {
        case 'topLeft':
          instancesMap.topLeft.unshift(m);
          break;
        case 'topRight':
          instancesMap.topRight.unshift(m);
          break;
        case 'bottomLeft':
          instancesMap.bottomLeft.unshift(m);
          break;
        case 'bottomRight':
          instancesMap.bottomRight.unshift(m);
          break;
        case 'top':
          instancesMap.top.unshift(m);
          break;
        case 'bottom':
          instancesMap.bottom.unshift(m);
          break;
        default:
          instancesMap.topRight.unshift(m);
      }
    });
    this.topLeftInstances = instancesMap.topLeft;
    this.topRightInstances = instancesMap.topRight;
    this.bottomLeftInstances = instancesMap.bottomLeft;
    this.bottomRightInstances = instancesMap.bottomRight;
    this.topInstances = instancesMap.top;
    this.bottomInstances = instancesMap.bottom;

    this.cdr.detectChanges();
  }

  protected override mergeOptions(options?: NzNotificationDataOptions): NzNotificationDataOptions {
    const { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement } = this.config!;
    return { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement, ...options };
  }
}
