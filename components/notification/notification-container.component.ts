/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from 'ng-zorro-antd/message';

import { NzNotificationData, NzNotificationDataOptions, NzNotificationPlacement } from './typings';

const NZ_CONFIG_MODULE_NAME = 'notification';

const NZ_NOTIFICATION_DEFAULT_CONFIG: Required<NotificationConfig> = {
  nzTop: '24px',
  nzBottom: '24px',
  nzPlacement: 'topRight',
  nzDuration: 4500,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzAnimate: true,
  nzDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification-container',
  exportAs: 'nzNotificationContainer',
  preserveWhitespaces: false,
  template: `
    <div
      class="ant-notification ant-notification-topLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="'topLeft'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-topRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="'topRight'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomLeft"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="'bottomLeft'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottomRight"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <nz-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="'bottomRight'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-top"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
    >
      <nz-notification
        *ngFor="let instance of topInstances"
        [instance]="instance"
        [placement]="'top'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div
      class="ant-notification ant-notification-bottom"
      [class.ant-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'50%'"
      [style.transform]="'translateX(-50%)'"
    >
      <nz-notification
        *ngFor="let instance of bottomInstances"
        [instance]="instance"
        [placement]="'bottom'"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `
})
export class NzNotificationContainerComponent extends NzMNContainerComponent {
  dir: Direction = 'ltr';
  bottom?: string | null;
  top?: string | null;
  override config!: Required<NotificationConfig>; // initialized by parent class constructor
  override instances: Array<Required<NzNotificationData>> = [];
  topLeftInstances: Array<Required<NzNotificationData>> = [];
  topRightInstances: Array<Required<NzNotificationData>> = [];
  bottomLeftInstances: Array<Required<NzNotificationData>> = [];
  bottomRightInstances: Array<Required<NzNotificationData>> = [];
  topInstances: Array<Required<NzNotificationData>> = [];
  bottomInstances: Array<Required<NzNotificationData>> = [];

  constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService) {
    super(cdr, nzConfigService);
    const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
    this.dir = config?.nzDirection || 'ltr';
  }

  override create(notification: NzNotificationData): Required<NzNotificationData> {
    const noti = this.onCreate(notification);
    const key = noti.options.nzKey;
    const notificationWithSameKey = this.instances.find(
      msg => msg.options.nzKey === (notification.options as Required<NzNotificationDataOptions>).nzKey
    );
    if (key && notificationWithSameKey) {
      this.replaceNotification(notificationWithSameKey, noti);
    } else {
      if (this.instances.length >= this.config.nzMaxStack) {
        this.instances = this.instances.slice(1);
      }
      this.instances = [...this.instances, noti];
    }

    this.readyInstances();

    return noti;
  }

  protected override onCreate(instance: NzNotificationData): Required<NzNotificationData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    instance.onClick = new Subject<MouseEvent>();
    return instance as Required<NzNotificationData>;
  }

  protected subscribeConfigChange(): void {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateConfig();
        const config = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        if (config) {
          const { nzDirection } = config;
          this.dir = nzDirection || this.dir;
        }
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
          instancesMap.topLeft.push(m);
          break;
        case 'topRight':
          instancesMap.topRight.push(m);
          break;
        case 'bottomLeft':
          instancesMap.bottomLeft.push(m);
          break;
        case 'bottomRight':
          instancesMap.bottomRight.push(m);
          break;
        case 'top':
          instancesMap.top.push(m);
          break;
        case 'bottom':
          instancesMap.bottom.push(m);
          break;
        default:
          instancesMap.topRight.push(m);
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
    const { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement } = this.config;
    return { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement, ...options };
  }
}
