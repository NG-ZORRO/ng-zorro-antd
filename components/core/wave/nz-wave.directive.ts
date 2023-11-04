/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  CSP_NONCE,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  makeEnvironmentProviders,
  EnvironmentProviders,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzWaveRenderer } from './nz-wave-renderer';

export interface NzWaveConfig {
  disabled?: boolean;
}

export const NZ_WAVE_GLOBAL_DEFAULT_CONFIG: NzWaveConfig = {
  disabled: false
};

export const NZ_WAVE_GLOBAL_CONFIG = new InjectionToken<NzWaveConfig>('nz-wave-global-options');

export function provideNzWave(config: NzWaveConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: NZ_WAVE_GLOBAL_CONFIG, useValue: config }]);
}

@Directive({
  selector: '[nz-wave],button[nz-button]:not([nzType="link"]):not([nzType="text"])',
  exportAs: 'nzWave'
})
export class NzWaveDirective implements OnInit, OnDestroy {
  @Input() nzWaveExtraNode = false;

  private waveRenderer?: NzWaveRenderer;
  private waveDisabled: boolean = false;

  get disabled(): boolean {
    return this.waveDisabled;
  }

  get rendererRef(): NzWaveRenderer | undefined {
    return this.waveRenderer;
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    @Optional() @Inject(NZ_WAVE_GLOBAL_CONFIG) private config: NzWaveConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string,
    @Inject(PLATFORM_ID) private platformId: NzSafeAny,
    @Optional() @Inject(CSP_NONCE) private cspNonce?: string | null
  ) {
    this.waveDisabled = this.isConfigDisabled();
  }

  isConfigDisabled(): boolean {
    let disabled = false;
    if (this.config && typeof this.config.disabled === 'boolean') {
      disabled = this.config.disabled;
    }
    if (this.animationType === 'NoopAnimations') {
      disabled = true;
    }
    return disabled;
  }

  ngOnDestroy(): void {
    if (this.waveRenderer) {
      this.waveRenderer.destroy();
    }
  }

  ngOnInit(): void {
    this.renderWaveIfEnabled();
  }

  renderWaveIfEnabled(): void {
    if (!this.waveDisabled && this.elementRef.nativeElement) {
      this.waveRenderer = new NzWaveRenderer(
        this.elementRef.nativeElement,
        this.ngZone,
        this.nzWaveExtraNode,
        this.platformId,
        this.cspNonce
      );
    }
  }

  disable(): void {
    this.waveDisabled = true;
    if (this.waveRenderer) {
      this.waveRenderer.removeTriggerEvent();
      this.waveRenderer.removeStyleAndExtraNode();
    }
  }

  enable(): void {
    // config priority
    this.waveDisabled = this.isConfigDisabled() || false;
    if (this.waveRenderer) {
      this.waveRenderer.bindTriggerEvent();
    }
  }
}
