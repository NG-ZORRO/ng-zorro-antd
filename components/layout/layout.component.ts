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

import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, ContentChildren, OnDestroy, QueryList, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzSiderComponent } from './sider.component';

@Component({
  selector: 'nz-layout',
  exportAs: 'nzLayout',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0',
    '[class.ant-layout]': 'true',
    '[class.ant-layout-rtl]': `dir === 'rtl'`
  }
})
export class NzLayoutComponent implements OnDestroy {
  @ContentChildren(NzSiderComponent) listOfNzSiderComponent!: QueryList<NzSiderComponent>;

  dir: Direction;
  private destroy$ = new Subject<void>();

  constructor(directionality: Directionality) {
    this.dir = directionality.value;
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
