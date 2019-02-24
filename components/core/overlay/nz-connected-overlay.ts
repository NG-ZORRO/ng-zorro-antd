import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';

@Directive({
  selector: '[cdkConnectedOverlay][nzConnectedOverlay]'
})
export class NzConnectedOverlayDirective {

  constructor(private cdkConnectedOverlay: CdkConnectedOverlay) {
    this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';
  }

}
