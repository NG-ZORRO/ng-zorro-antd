/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subscription } from 'rxjs';
import { NzDrawerControlServiceModule } from './nz-drawer-control.service.module';
import { NzDrawerRef } from './nz-drawer-ref';
import { NzDrawerComponent } from './nz-drawer.component';

interface RegisteredMeta {
  drawerRef: NzDrawerRef;
  afterOpenSubscription: Subscription;
  afterCloseSubscription: Subscription;
}

@Injectable({
  providedIn: NzDrawerControlServiceModule
})
export class NzDrawerControlService {
  private rootOpenDrawers: NzDrawerRef[] | null = this.parentService ? null : [];
  private rootRegisteredMetaMap: Map<NzDrawerRef, RegisteredMeta> | null = this.parentService ? null : new Map();

  private get registeredMetaMap(): Map<NzDrawerRef, RegisteredMeta> {
    return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap!;
  }

  get openDrawers(): NzDrawerRef[] {
    return this.parentService ? this.parentService.openDrawers : this.rootOpenDrawers!;
  }

  constructor(@Optional() @SkipSelf() private parentService: NzDrawerControlService) {}

  private hasRegistered(drawerRef: NzDrawerRef): boolean {
    return this.registeredMetaMap.has(drawerRef);
  }

  private removeOpenDrawer(drawerRef: NzDrawerRef): void {
    const index = this.openDrawers.indexOf(drawerRef);

    if (index > -1) {
      this.openDrawers.splice(index, 1);
    }
  }

  registerDrawer(drawerRef: NzDrawerRef): void {
    if (!this.hasRegistered(drawerRef)) {
      const afterOpenSubscription = drawerRef.afterOpen.subscribe(() => this.openDrawers.push(drawerRef));
      const afterCloseSubscription = drawerRef.afterClose.subscribe(() => this.removeOpenDrawer(drawerRef));
      this.registeredMetaMap.set(drawerRef, { drawerRef, afterOpenSubscription, afterCloseSubscription });
    }
  }

  deregisterDrawer(drawerRef: NzDrawerRef): void {
    const registeredMeta = this.registeredMetaMap.get(drawerRef);
    if (registeredMeta) {
      this.removeOpenDrawer(registeredMeta.drawerRef);
      registeredMeta.afterOpenSubscription.unsubscribe();
      registeredMeta.afterCloseSubscription.unsubscribe();
      this.registeredMetaMap.delete(drawerRef);
    }
  }

  closeAll(): void {
    let i = this.openDrawers.length;

    while (i--) {
      const openDrawer = this.openDrawers[i] as NzDrawerComponent;
      if (openDrawer.createByService) {
        openDrawer.close();
      } else {
        openDrawer.nzOnClose.emit();
      }
    }
  }
}
