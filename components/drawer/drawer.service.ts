/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerOptions, NzDrawerOptionsOfComponent } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';

export class DrawerBuilderForService<T, R> {
  private drawerRef: NzDrawerComponent<T, R> | null;
  private overlayRef: OverlayRef;
  private unsubscribe$ = new Subject<void>();

  constructor(private overlay: Overlay, private options: NzDrawerOptions) {
    /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
    const { nzOnCancel, ...componentOption } = this.options;
    this.overlayRef = this.overlay.create();
    this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent)).instance;
    this.updateOptions(componentOption);
    // Prevent repeatedly open drawer when tap focus element.
    this.drawerRef.savePreviouslyFocusedElement();
    this.drawerRef.nzOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.drawerRef!.open();
    });
    this.drawerRef.nzOnClose.subscribe(() => {
      if (nzOnCancel) {
        nzOnCancel().then(canClose => {
          if (canClose !== false) {
            this.drawerRef!.close();
          }
        });
      } else {
        this.drawerRef!.close();
      }
    });

    this.drawerRef.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.overlayRef.dispose();
      this.drawerRef = null;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    });
  }

  getInstance(): NzDrawerRef<T, R> {
    return this.drawerRef!;
  }

  updateOptions(options: NzDrawerOptionsOfComponent): void {
    Object.assign(this.drawerRef!, options);
  }
}

@Injectable({ providedIn: NzDrawerServiceModule })
export class NzDrawerService {
  constructor(private overlay: Overlay) {}

  create<T = NzSafeAny, D = undefined, R = NzSafeAny>(options: NzDrawerOptions<T, D extends undefined ? {} : D>): NzDrawerRef<T, R> {
    return new DrawerBuilderForService<T, R>(this.overlay, options).getInstance();
  }
}
