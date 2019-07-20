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
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropdownServiceModule } from './nz-dropdown.service.module';

@Injectable({
  providedIn: NzDropdownServiceModule
})
/**
 * @deprecated Use `NzContextMenuService` instead.
 */
export class NzDropdownService {
  private overlayRef: OverlayRef | null;

  constructor(private overlay: Overlay) {
    warnDeprecation(
      `'NzDropdownService' is going to be removed in 9.0.0. Please use 'NzContextMenuService' instead. Read https://ng.ant.design/components/dropdown/en`
    );
  }

  create($event: MouseEvent, templateRef: TemplateRef<void>): NzDropdownContextComponent {
    $event.preventDefault();
    this.dispose();
    this.overlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.close(),
        panelClass: 'nz-dropdown-panel',
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo({
            x: $event.x,
            y: $event.y
          })
          .withPositions([
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
          ])
      })
    );
    const positionChanges = (this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy)
      .positionChanges;
    const instance = this.overlayRef.attach(new ComponentPortal(NzDropdownContextComponent)).instance;
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as HTMLElement)),
        take(1)
      )
      .subscribe(() => instance.close());
    instance.init(true, templateRef, positionChanges, this);
    return instance;
  }

  dispose(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
