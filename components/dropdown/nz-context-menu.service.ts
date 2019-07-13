/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** keep track https://github.com/angular/material2/issues/5007 **/
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NzContextMenuServiceModule } from './nz-context-menu.service.module';
import { NzDropdownMenuComponent } from './nz-dropdown-menu.component';

@Injectable({
  providedIn: NzContextMenuServiceModule
})
export class NzContextMenuService {
  private overlayRef: OverlayRef;
  private nzDropdownMenuComponent: NzDropdownMenuComponent;
  private clickOutsideSubscription = Subscription.EMPTY;
  private clickMenuSubscription = Subscription.EMPTY;
  private positionSubscription = Subscription.EMPTY;

  constructor(private overlay: Overlay) {}

  create($event: MouseEvent, nzDropdownMenuComponent: NzDropdownMenuComponent): void {
    $event.preventDefault();
    const overlayRef = this.createOverlay($event);
    if (overlayRef.hasAttached()) {
      this.close();
    }
    this.attachTemplatePortal(overlayRef, nzDropdownMenuComponent);
    this.handleClickOutside();
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.setOpenState(false);
      this.clickOutsideSubscription.unsubscribe();
      this.clickMenuSubscription.unsubscribe();
      this.positionSubscription.unsubscribe();
    }
  }

  private handleClickOutside(): void {
    this.clickOutsideSubscription.unsubscribe();
    this.clickOutsideSubscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as HTMLElement)),
        // handle firefox contextmenu event
        filter(event => event.button !== 2),
        take(1)
      )
      .subscribe(() => {
        this.close();
      });
  }

  private attachTemplatePortal(overlayRef: OverlayRef, nzDropdownMenuComponent: NzDropdownMenuComponent): void {
    this.nzDropdownMenuComponent = nzDropdownMenuComponent;
    nzDropdownMenuComponent.setValue('nzTrigger', 'click');
    this.clickMenuSubscription.unsubscribe();
    this.clickMenuSubscription = nzDropdownMenuComponent.nzMenuDropdownService.menuItemClick$.subscribe(() => {
      this.close();
    });
    overlayRef.attach(
      new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef)
    );
    this.setOpenState(true);
  }

  private setOpenState(state: boolean): void {
    this.nzDropdownMenuComponent.setValue('open', state);
  }

  private getOverlayConfig($event: MouseEvent): OverlayConfig {
    return new OverlayConfig({
      panelClass: 'nz-dropdown-panel',
      positionStrategy: this.generatePositionStrategy($event),
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
  }

  private generatePositionStrategy($event: MouseEvent): FlexibleConnectedPositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo({ x: $event.x, y: $event.y })
      .withPositions([
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
      ]);
  }

  private subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
    this.positionSubscription.unsubscribe();
    this.positionSubscription = position.positionChanges.subscribe(change => {
      // TODO: positionChanges won't trigger if not dispose
      this.nzDropdownMenuComponent.setValue(
        'dropDownPosition',
        change.connectionPair.overlayY === 'bottom' ? 'top' : 'bottom'
      );
    });
  }

  private createOverlay($event: MouseEvent): OverlayRef {
    const config = this.getOverlayConfig($event);
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(config);
    } else {
      this.updatePosition(this.overlayRef, $event);
    }
    this.subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
    return this.overlayRef;
  }

  private updatePosition(overlayRef: OverlayRef, $event: MouseEvent): void {
    overlayRef.updatePositionStrategy(this.generatePositionStrategy($event));
  }
}
