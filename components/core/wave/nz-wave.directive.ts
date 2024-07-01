/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  CSP_NONCE,
  Directive,
  ElementRef,
  EnvironmentProviders,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

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
  exportAs: 'nzWave',
  standalone: true
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

  private cspNonce = inject(CSP_NONCE, { optional: true });
  private platformId = inject(PLATFORM_ID);
  private config = inject(NZ_WAVE_GLOBAL_CONFIG, { optional: true });
  private animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef
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
