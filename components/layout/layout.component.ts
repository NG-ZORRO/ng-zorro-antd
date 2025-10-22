/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  inject,
  OnInit,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzSiderComponent } from './sider.component';

@Component({
  selector: 'nz-layout',
  exportAs: 'nzLayout',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-layout',
    '[class.ant-layout-rtl]': `dir === 'rtl'`,
    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
  }
})
export class NzLayoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private directionality = inject(Directionality);
  @ContentChildren(NzSiderComponent) listOfNzSiderComponent!: QueryList<NzSiderComponent>;

  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
    });
  }
}
