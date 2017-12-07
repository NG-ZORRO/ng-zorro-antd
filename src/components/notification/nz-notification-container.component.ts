import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { NzMessageContainerComponent } from '../message/nz-message-container.component';
import { NzNotificationConfig, NZ_NOTIFICATION_CONFIG, NZ_NOTIFICATION_DEFAULT_CONFIG } from './nz-notification-config';

@Component({
  selector     : 'nz-notification-container',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-notification" [style.top]="config.nzTop" [style.right]="config.nzRight">
      <nz-notification *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"></nz-notification>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzNotificationContainerComponent extends NzMessageContainerComponent {

  constructor(@Optional() @Inject(NZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NzNotificationConfig,
              @Optional() @Inject(NZ_NOTIFICATION_CONFIG) config: NzNotificationConfig) {
    super(defaultConfig, config);
  }

}
