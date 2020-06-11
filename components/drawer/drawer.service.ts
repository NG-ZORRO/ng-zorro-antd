/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerOptions, NzDrawerOptionsOfComponent } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';

export class DrawerBuilderForService<R> {
  private drawerRef: ComponentRef<NzDrawerComponent> | null;
  private overlayRef: OverlayRef;
  private unsubscribe$ = new Subject<void>();

  constructor(private overlay: Overlay, private options: NzDrawerOptions) {
    /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
    const { nzOnCancel, ...componentOption } = this.options;
    this.overlayRef = this.overlay.create();
    this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent));
    this.updateOptions(componentOption);
    // Prevent repeatedly open drawer when tap focus element.
    this.drawerRef!.instance.savePreviouslyFocusedElement();
    this.drawerRef!.instance.nzOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.drawerRef!.instance.open();
    });
    this.drawerRef!.instance.nzOnClose.subscribe(() => {
      if (nzOnCancel) {
        nzOnCancel().then(canClose => {
          if (canClose !== false) {
            this.drawerRef!.instance.close();
          }
        });
      } else {
        this.drawerRef!.instance.close();
      }
    });

    this.drawerRef!.instance.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.overlayRef.dispose();
      this.drawerRef = null;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    });
  }

  getInstance(): NzDrawerRef<R> {
    return this.drawerRef! && this.drawerRef!.instance;
  }

  updateOptions(options: NzDrawerOptionsOfComponent): void {
    Object.assign(this.drawerRef!.instance, options);
  }
}

@Injectable({ providedIn: NzDrawerServiceModule })
export class NzDrawerService {
  constructor(private overlay: Overlay) {}

  create<T = NzSafeAny, D = undefined, R = NzSafeAny>(options: NzDrawerOptions<T, D extends undefined ? {} : D>): NzDrawerRef<R> {
    return new DrawerBuilderForService<R>(this.overlay, options).getInstance();
  }
}
