import { Optional, Inject, Component, ViewEncapsulation } from '@angular/core';
import { NZ_NOTIFICATION_DEFAULT_CONFIG, NZ_NOTIFICATION_CONFIG, NzNotificationConfig } from './nz-notification-config';
import { NzMessageContainerComponent } from '../message/nz-message-container.component';

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
