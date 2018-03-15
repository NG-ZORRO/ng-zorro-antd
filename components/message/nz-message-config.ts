import { InjectionToken } from '@angular/core';

export interface NzMessageConfig {
  // For all messages as default config (can override when dynamically created)
  nzDuration?: number;
  nzPauseOnHover?: boolean;
  nzAnimate?: boolean;
  // For message container only
  nzMaxStack?: number;
  /* tslint:disable-next-line:no-any */
  [index: string]: any;
}

export const NZ_MESSAGE_DEFAULT_CONFIG = new InjectionToken<NzMessageConfig>('NZ_MESSAGE_DEFAULT_CONFIG');

export const NZ_MESSAGE_CONFIG = new InjectionToken<NzMessageConfig>('NZ_MESSAGE_CONFIG');

export const NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
  provide : NZ_MESSAGE_DEFAULT_CONFIG,
  useValue: {
    nzDuration    : 3000,
    nzAnimate     : true,
    nzPauseOnHover: true,
    nzMaxStack    : 7
  }
};
