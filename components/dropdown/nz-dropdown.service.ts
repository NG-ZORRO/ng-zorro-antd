/** keep track https://github.com/angular/material2/issues/5007 **/
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, NgZone, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';

@Injectable({
  providedIn: 'root'
})
export class NzDropdownService {
  private overlayRef: OverlayRef;
  private fakePoint: HTMLElement;
  private positions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
  ];

  /* tslint:disable-next-line:no-any */
  constructor(private overlay: Overlay, @Inject(DOCUMENT) private document: any, private zone: NgZone) {
  }

  private createFakePoint(e: MouseEvent): ElementRef {
    if (!this.fakePoint) {
      const container = this.document.createElement('span');
      this.document.body.appendChild(container);
      this.fakePoint = container;
    }
    this.fakePoint.style.position = `fixed`;
    this.fakePoint.style.top = `${e.clientY}px`;
    this.fakePoint.style.left = `${e.clientX}px`;
    return new ElementRef(this.fakePoint);
  }

  private removeFakePoint(): void {
    if (this.fakePoint) {
      this.document.body.removeChild(this.fakePoint);
      this.fakePoint = null;
    }
  }

  create($event: MouseEvent, templateRef: TemplateRef<void>): NzDropdownContextComponent {
    $event.preventDefault();
    this.dispose();
    this.overlayRef = this.overlay.create(new OverlayConfig({
      hasBackdrop     : true,
      scrollStrategy  : this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.createFakePoint($event)).withPositions(this.positions)
    }));
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        this.overlayRef.backdropElement.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
      });
    });
    const positionChanges = (this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy).positionChanges;
    const instance = this.overlayRef.attach(new ComponentPortal(NzDropdownContextComponent)).instance;
    this.overlayRef.backdropClick().subscribe(() => instance.close());
    instance.init(true, templateRef, positionChanges, this);
    return instance;
  }

  dispose(): void {
    this.removeFakePoint();
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }
}
