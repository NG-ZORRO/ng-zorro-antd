/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NzFloatButtonService {
  nzShapeSource = new BehaviorSubject<'circle' | 'square' | null>(null);
  nzShape = this.nzShapeSource.asObservable();

  constructor() {}

  updateShape(data: 'circle' | 'square'): void {
    this.nzShapeSource.next(data);
  }
}
