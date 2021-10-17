/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Directive, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { getPlacementName } from './overlay-position';

@Directive({
  selector: '[cdkConnectedOverlay][nzConnectedOverlay]',
  exportAs: 'nzConnectedOverlay',
  providers: [NzDestroyService]
})
export class NzConnectedOverlayDirective {
  @Input() @InputBoolean() nzArrowPointAtCenter: boolean = false;

  constructor(
    private readonly cdkConnectedOverlay: CdkConnectedOverlay,
    private readonly nzDestroyService: NzDestroyService
  ) {
    this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';

    this.cdkConnectedOverlay.positionChange
      .pipe(takeUntil(this.nzDestroyService))
      .subscribe((position: ConnectedOverlayPositionChange) => {
        if (this.nzArrowPointAtCenter) {
          this.updateArrowPosition(position);
        }
      });
  }

  private updateArrowPosition(position: ConnectedOverlayPositionChange): void {
    const originEl = this.cdkConnectedOverlay.origin.elementRef.nativeElement as HTMLElement;
    const originRect = originEl.getBoundingClientRect();
    const placement = getPlacementName(position);

    let offsetX: number | undefined = 0;
    let offsetY: number | undefined = 0;

    if (placement === 'topLeft' || placement === 'bottomLeft') {
      offsetX = originRect.width / 2 - 14;
    } else if (placement === 'topRight' || placement === 'bottomRight') {
      offsetX = -(originRect.width / 2 - 14);
    } else if (placement === 'leftTop' || placement === 'rightTop') {
      offsetY = originRect.height / 2 - 10;
    } else if (placement === 'leftBottom' || placement === 'rightBottom') {
      offsetY = -(originRect.height / 2 - 10);
    }

    if (this.cdkConnectedOverlay.offsetX !== offsetX || this.cdkConnectedOverlay.offsetY !== offsetY) {
      this.cdkConnectedOverlay.offsetY = offsetY;
      this.cdkConnectedOverlay.offsetX = offsetX;
      this.cdkConnectedOverlay.overlayRef.updatePosition();
    }
  }
}
