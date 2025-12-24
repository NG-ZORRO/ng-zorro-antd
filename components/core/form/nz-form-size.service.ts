/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import type { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Injectable()
export class NzFormSizeService {
  private readonly _formSize$ = new ReplaySubject<NzSizeLDSType | undefined>(1);
  readonly formSize$ = this._formSize$.asObservable();

  setFormSize(size: NzSizeLDSType | undefined): void {
    this._formSize$.next(size);
  }
}
