/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';

import { NzSiderComponent } from './sider.component';

@Component({
  selector: 'nz-layout',
  exportAs: 'nzLayout',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-layout',
    '[class.ant-layout-rtl]': `dir.isRtl()`,
    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
  }
})
export class NzLayoutComponent {
  @ContentChildren(NzSiderComponent) listOfNzSiderComponent!: QueryList<NzSiderComponent>;

  readonly dir = nzInjectDirectionality();
}
