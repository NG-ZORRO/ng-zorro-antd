import {
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { NzWaveRenderer } from './nz-wave-renderer';

export interface NzWaveConfig {
  disabled?: boolean;
}

export const NZ_WAVE_GLOBAL_DEFAULT_CONFIG: NzWaveConfig = {
  disabled: false
};

export const NZ_WAVE_GLOBAL_CONFIG = new InjectionToken<NzWaveConfig>('nz-wave-global-options', {
  providedIn: 'root',
  factory: NZ_WAVE_GLOBAL_CONFIG_FACTORY
});

export function NZ_WAVE_GLOBAL_CONFIG_FACTORY(): NzWaveConfig {
  return NZ_WAVE_GLOBAL_DEFAULT_CONFIG;
}

@Directive({
  selector: '[nz-wave]'
})
export class NzWaveDirective implements OnInit, OnDestroy {
  @Input() nzWaveExtraNode = false;

  private waveRenderer: NzWaveRenderer;
  private waveDisabled: boolean = false;

  constructor(private ngZone: NgZone,
              private elementRef: ElementRef,
              @Optional() @Inject(NZ_WAVE_GLOBAL_CONFIG) config: NzWaveConfig,
              @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string) {
    if (config && typeof config.disabled === 'boolean') {
      this.waveDisabled = config.disabled;
    }
    if (this.animationType === 'NoopAnimations') {
      this.waveDisabled = true;
    }
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
      this.waveRenderer = new NzWaveRenderer(this.elementRef.nativeElement, this.ngZone, this.nzWaveExtraNode);
    }
  }
}
