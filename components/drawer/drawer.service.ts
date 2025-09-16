/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { createOverlayRef, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDrawerOptions, NzDrawerOptionsOfComponent } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
import { NzDrawerComponent } from './drawer.component';

export class DrawerBuilderForService<T extends {}, R> {
  private drawerRef: NzDrawerComponent<T, R> | null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private overlayRef: OverlayRef,
    private options: NzDrawerOptions
  ) {
    /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
    const { nzOnCancel, ...componentOption } = this.options;
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

@Injectable()
export class NzDrawerService {
  private injector = inject(Injector);

  create<T extends {} = NzSafeAny, D = undefined, R = NzSafeAny>(
    options: NzDrawerOptions<T, D extends undefined ? {} : D>
  ): NzDrawerRef<T, R> {
    return new DrawerBuilderForService<T, R>(createOverlayRef(this.injector), options).getInstance();
  }
}
