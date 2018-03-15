import { Component, Inject, Optional } from '@angular/core';

import { NzMessageContainerComponent } from '../message/nz-message-container.component';

import { NzNotificationConfig, NZ_NOTIFICATION_CONFIG, NZ_NOTIFICATION_DEFAULT_CONFIG } from './nz-notification-config';

@Component({
  selector           : 'nz-notification-container',
  preserveWhitespaces: false,
  templateUrl        : './nz-notification-container.component.html'
})
export class NzNotificationContainerComponent extends NzMessageContainerComponent {

  constructor(@Optional() @Inject(NZ_NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NzNotificationConfig,
              @Optional() @Inject(NZ_NOTIFICATION_CONFIG) config: NzNotificationConfig) {
    super(defaultConfig, config);
  }

}
