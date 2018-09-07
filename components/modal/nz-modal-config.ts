import { InjectionToken } from '@angular/core';

export const NZ_MODAL_DEFAULT_CONFIG: NzModalConfig = {
  autoBodyPadding: true
};

export const NZ_MODAL_CONFIG = new InjectionToken<NzModalConfig>('NzModalConfig', {
  providedIn: 'root',
  factory: () => NZ_MODAL_DEFAULT_CONFIG // Default config
});

////////////

export interface NzModalConfig {
  autoBodyPadding: boolean; // Whether add the padding-right and overflow to body automatically to play smoothly
}
