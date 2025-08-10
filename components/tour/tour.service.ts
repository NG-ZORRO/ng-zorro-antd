/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, type ComponentRef, inject } from '@angular/core';

import { overlayZIndexSetter } from 'ng-zorro-antd/core/overlay';

import { NzTourMaskComponent } from './mask';

@Injectable({
  providedIn: 'root'
})
export class NzTourService {
  private readonly overlay = inject(Overlay);
  private overlayRef?: OverlayRef | null;
  private maskRef?: ComponentRef<NzTourMaskComponent> | null;

  attachOrUpdateMask(
    zIndex: number,
    target: HTMLElement | null,
    opts?: {
      padding?: number;
      radius?: number;
      fill?: string;
      disabledInteraction?: boolean;
      animated?: boolean;
    }
  ): void {
    const desiredZ = (typeof zIndex === 'number' ? zIndex : 1001) - 1;

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        positionStrategy: this.overlay.position().global().top('0').left('0'),
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      });
      const pane = this.overlayRef.hostElement as HTMLElement;
      pane.style.width = '100%';
      pane.style.height = '100%';
    }

    overlayZIndexSetter(this.overlayRef, desiredZ);

    if (!this.maskRef || !this.overlayRef.hasAttached()) {
      this.maskRef = this.overlayRef.attach(new ComponentPortal(NzTourMaskComponent));
    }

    this.maskRef!.setInput('zIndex', desiredZ);
    this.maskRef!.setInput('target', target);
    if (opts) {
      if (opts.padding != null) this.maskRef!.setInput('padding', opts.padding);
      if (opts.radius != null) this.maskRef!.setInput('radius', opts.radius);
      if (opts.fill != null) this.maskRef!.setInput('fill', opts.fill);
      if (opts.disabledInteraction != null) this.maskRef!.setInput('disabledInteraction', opts.disabledInteraction);
      if (opts.animated != null) this.maskRef!.setInput('animated', opts.animated);
    }
  }

  detachMask(): void {
    this.overlayRef?.detach();
  }

  dispose(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.maskRef = null;
  }
}
