/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Component, ContentChildren, inject, QueryList, ViewEncapsulation } from '@angular/core';

import { NzSiderComponent } from './sider.component';

@Component({
  selector: 'nz-layout',
  exportAs: 'nzLayout',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-layout',
    '[class.ant-layout-rtl]': `dir() === 'rtl'`,
    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
  }
})
export class NzLayoutComponent {
  protected readonly dir = inject(Directionality).valueSignal;
  @ContentChildren(NzSiderComponent) listOfNzSiderComponent!: QueryList<NzSiderComponent>;
}
