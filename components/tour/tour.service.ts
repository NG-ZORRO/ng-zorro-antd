/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, inject, DestroyRef, Injector } from '@angular/core';

import { NzTourRef } from './tour-ref';
import { NzTourOptions, NzTourPlacement } from './types';

export const DEFAULT_PLACEMENT: NzTourPlacement = 'bottom';

@Injectable({
  providedIn: 'root'
})
export class NzTourService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private tourRef?: NzTourRef | null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.dispose());
  }

  start(options: NzTourOptions): NzTourRef {
    this.dispose();
    this.tourRef = new NzTourRef(this.overlay, this.injector, options);
    this.tourRef.start();
    return this.tourRef;
  }

  dispose(): void {
    this.tourRef?.dispose();
    this.tourRef = null;
  }
}
