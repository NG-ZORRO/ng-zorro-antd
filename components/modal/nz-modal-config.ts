import { InjectionToken } from '@angular/core';

export interface NzModalConfig {
  nzMask?: boolean;
  nzMaskClosable?: boolean;
}
export const NZ_MODAL_CONFIG = new InjectionToken<NzModalConfig>('NZ_MODAL_CONFIG');
