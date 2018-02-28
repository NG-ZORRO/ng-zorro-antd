import {
  ConnectedPositionStrategy,
  ConnectionPositionPair,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NzDropdownContextComponent } from './nz-dropdown-context.component';

@Injectable()
export class NzDropdownService {
  protected instance: NzDropdownContextComponent;
  private overlayRef: OverlayRef;
  private locatePoint: HTMLElement;
  private positionStrategy: ConnectedPositionStrategy;
  private backdropClickSubscription: Subscription;
  private detachmentsSubscription: Subscription;
  private onPositionChangeSubscription: Subscription;
  private positions = [
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair(
      { originX: 'start', originY: 'top' },
      { overlayX: 'end', overlayY: 'top' })
  ];

  /* tslint:disable-next-line:no-any */
  constructor(private overlay: Overlay, @Inject(DOCUMENT) private document: any, private zone: NgZone) {
  }

  private createOverlay($event: MouseEvent): OverlayRef {
    this.createPoint($event);
    const defaultPosition = this.positions[ 0 ];
    const originPoint = { originX: defaultPosition.originX, originY: defaultPosition.originY };
    const overlayPoint = { overlayX: defaultPosition.overlayX, overlayY: defaultPosition.overlayY };
    const fakeElementRef = { nativeElement: this.locatePoint };
    this.positionStrategy = this.overlay.position().connectedTo(fakeElementRef, originPoint, overlayPoint);
    this.handlePositionChanges(this.positionStrategy);
    const overlayConfig = new OverlayConfig({
      hasBackdrop     : true,
      scrollStrategy  : this.overlay.scrollStrategies.close(),
      positionStrategy: this.positionStrategy
    });
    return this.overlay.create(overlayConfig);
  }

  private handlePositionChanges(strategy: ConnectedPositionStrategy): void {
    for (let i = 1; i < this.positions.length; i++) {
      strategy.withFallbackPosition(
        { originX: this.positions[ i ].originX, originY: this.positions[ i ].originY },
        { overlayX: this.positions[ i ].overlayX, overlayY: this.positions[ i ].overlayY }
      );
    }
    this.onPositionChangeSubscription = this.positionStrategy.onPositionChange.subscribe(data => {
      const position = data.connectionPair.overlayY === 'bottom' ? 'top' : 'bottom';
      this.instance.setDropDownPosition(position);
    });
  }

  private handleCloseEvent(overlayRef: OverlayRef): void {
    this.backdropClickSubscription = overlayRef.backdropClick().subscribe(_ => this.instance.close());
    this.detachmentsSubscription = overlayRef.detachments().subscribe(_ => this.close());
  }

  private createPoint(e: MouseEvent): void {
    if (!this.locatePoint) {
      const container = this.document.createElement('span');
      this.document.body.appendChild(container);
      this.locatePoint = container;
    }
    this.locatePoint.style.position = `fixed`;
    this.locatePoint.style.top = `${e.clientY}px`;
    this.locatePoint.style.left = `${e.clientX}px`;
  }

  private removePoint(): void {
    if (this.locatePoint) {
      this.document.body.removeChild(this.locatePoint);
      this.locatePoint = null;
    }
  }

  private setInstanceValue(instance: NzDropdownContextComponent, template: TemplateRef<void>): void {
    instance.open = true;
    instance.setTemplateRef(template);
    instance.setControl(this);
  }

  create($event: MouseEvent, template: TemplateRef<void>): NzDropdownContextComponent {
    $event.preventDefault();
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    } else {
      this.overlayRef = this.createOverlay($event);
      setTimeout(() => {
        if (this.overlayRef.backdropElement) {
          this.zone.runOutsideAngular(() => {
            this.overlayRef.backdropElement.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
          });
        }
      });
      this.instance = this.overlayRef.attach(new ComponentPortal(NzDropdownContextComponent)).instance;
      this.setInstanceValue(this.instance, template);
      this.handleCloseEvent(this.overlayRef);
      return this.instance;
    }
  }

  close(): void {
    this.removePoint();
    this.overlayRef.dispose();
    if (this.backdropClickSubscription) {
      this.backdropClickSubscription.unsubscribe();
      this.backdropClickSubscription = null;
    }
    if (this.detachmentsSubscription) {
      this.detachmentsSubscription.unsubscribe();
      this.detachmentsSubscription = null;
    }
    if (this.onPositionChangeSubscription) {
      this.onPositionChangeSubscription.unsubscribe();
      this.onPositionChangeSubscription = null;
    }
  }
}
