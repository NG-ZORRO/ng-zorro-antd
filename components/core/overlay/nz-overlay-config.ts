import { OverlayConfig } from '@angular/cdk/overlay';

export class NzOverlayConfig extends OverlayConfig {

  constructor(config?: OverlayConfig) {
    super(config);
    this.backdropClass = 'nz-overlay-transparent-backdrop';
  }
}
