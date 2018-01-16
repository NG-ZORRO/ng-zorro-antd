import { Component, Inject, Optional } from '@angular/core';
import { NzMessageContainerComponent } from '../message/nz-message-container.component';
import { NzNotificationConfig, NZ_NOTIFICATION_CONFIG, NZ_NOTIFICATION_DEFAULT_CONFIG } from './nz-notification-config';

@Component({
  selector           : 'nz-notification-container',
  preserveWhitespaces: false,
  template           : `
    <div
      class="ant-notification ant-notification-{{config.nzPlacement}}"
      [style.top]="(config.nzPlacement==='topLeft'||config.nzPlacement=='topRight')? config.nzTop:null"
      [style.bottom]="(config.nzPlacement==='bottomLeft'||config.nzPlacement=='bottomRight')? config.nzBottom:null"
      [style.right]="(config.nzPlacement==='bottomRight'||config.nzPlacement=='topRight')?'0px':null"
      [style.left]="(config.nzPlacement==='topLeft'||config.nzPlacement=='bottomLeft')?'0px':null">
      <nz-notification *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"></nz-notification>
    </div>
  `
})
export class NzNotificationContainerComponent extends NzMessageContainerComponent {

  constructor(@Optional() @Inject(NZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NzNotificationConfig,
              @Optional() @Inject(NZ_NOTIFICATION_CONFIG) config: NzNotificationConfig) {
    super(defaultConfig, config);
  }

}
