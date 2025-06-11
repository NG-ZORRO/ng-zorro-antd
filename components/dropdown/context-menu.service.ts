/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { EmbeddedViewRef, inject, Injectable, NgZone } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzContextMenuServiceModule } from './context-menu.service.module';
import { NzDropdownMenuComponent } from './dropdown-menu.component';

const LIST_OF_POSITIONS = [
  new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
  new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
  new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
  new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
];

@Injectable({
  providedIn: NzContextMenuServiceModule
})
export class NzContextMenuService {
  private ngZone = inject(NgZone);
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private closeSubscription = Subscription.EMPTY;

  create(
    $event: MouseEvent | { x: number; y: number },
    nzDropdownMenuComponent: NzDropdownMenuComponent
  ): EmbeddedViewRef<NzSafeAny> {
    this.close(true);
    const { x, y } = $event;
    if ($event instanceof MouseEvent) {
      $event.preventDefault();
    }
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions(LIST_OF_POSITIONS)
      .withTransformOriginOn('.ant-dropdown');
    this.overlayRef = this.overlay.create({
      positionStrategy,
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.closeSubscription = new Subscription();

    this.closeSubscription.add(nzDropdownMenuComponent.descendantMenuItemClick$.subscribe(() => this.close()));

    this.closeSubscription.add(
      merge(
        fromEventOutsideAngular<MouseEvent>(document, 'click').pipe(
          filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as HTMLElement)),
          /** handle firefox contextmenu event **/
          filter(event => event.button !== 2)
        ),
        fromEventOutsideAngular<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.key === 'Escape'))
      )
        .pipe(first())
        .subscribe(() => this.ngZone.run(() => this.close()))
    );

    return this.overlayRef.attach(
      new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef)
    );
  }

  close(clear: boolean = false): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      if (clear) {
        this.overlayRef.dispose();
      }
      this.overlayRef = null;
      this.closeSubscription.unsubscribe();
    }
  }
}
