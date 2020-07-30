/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Input, OnChanges, OnDestroy, QueryList } from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';

import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzSpaceItemComponent } from './space-item.component';
import { NzSpaceDirection, NzSpaceSize } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'space';

@Component({
  selector: 'nz-space',
  exportAs: 'NzSpace',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'ant-space',
    '[class.ant-space-horizontal]': 'nzDirection === "horizontal"',
    '[class.ant-space-vertical]': 'nzDirection === "vertical"'
  }
})
export class NzSpaceComponent implements OnChanges, OnDestroy, AfterViewInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() nzDirection: NzSpaceDirection = 'horizontal';
  @Input() @WithConfig() nzSize: number | NzSpaceSize = 'small';

  @ContentChildren(NzSpaceItemComponent) nzSpaceItemComponents!: QueryList<NzSpaceItemComponent>;

  private destroy$ = new Subject();

  constructor(public nzConfigService: NzConfigService) {}

  private updateSpaceItems(): void {
    if (this.nzSpaceItemComponents) {
      this.nzSpaceItemComponents.forEach(item => {
        item.setDirectionAndSize(this.nzDirection, this.nzSize);
      });
    }
  }

  ngOnChanges(): void {
    this.updateSpaceItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.nzSpaceItemComponents.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.updateSpaceItems();
    });
  }
}
