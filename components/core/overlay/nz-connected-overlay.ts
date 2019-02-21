import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';
import { NzOverlayConfig } from './nz-overlay-config';

@Directive({
  selector: '[cdkConnectedOverlay][nz-connected-overlay], [cdkConnectedOverlay][nzConnectedOverlay]'
})
export class NzConnectedOverlayDirective {

  constructor(private cdkConnectedOverlay: CdkConnectedOverlay) {
    const config = new NzOverlayConfig();
    this.cdkConnectedOverlay.backdropClass = config.backdropClass as string; // This can only be string
  }

}
