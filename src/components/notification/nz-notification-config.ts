import { InjectionToken } from '@angular/core';
import { NzMessageConfig } from '../message/nz-message-config';

export interface NzNotificationConfig extends NzMessageConfig {
  nzTop?: string;
  nzRight?: string;
}

export const NZ_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NzNotificationConfig>('NZ_NOTIFICATION_DEFAULT_CONFIG');

export const NZ_NOTIFICATION_CONFIG = new InjectionToken<NzNotificationConfig>('NZ_NOTIFICATION_CONFIG');

export const NZ_NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
  provide: NZ_NOTIFICATION_DEFAULT_CONFIG,
  useValue: {
    nzTop                  : '24px',
    nzRight                : '0px',
    nzDuration             : 4500,
    nzMaxStack             : 7,
    nzPauseOnHover         : true,
    nzAnimate              : true
  }
};
