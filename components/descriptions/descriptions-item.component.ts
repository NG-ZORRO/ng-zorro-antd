/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NumberInput } from 'ng-zorro-antd/core/types';
import { InputNumber } from 'ng-zorro-antd/core/util';

import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-descriptions-item',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  exportAs: 'nzDescriptionsItem',
  preserveWhitespaces: false
})
export class NzDescriptionsItemComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_nzSpan: NumberInput;

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;

  @Input() @InputNumber() nzSpan = 1;
  @Input() nzTitle: string | TemplateRef<void> = '';

  readonly inputChange$ = new Subject<void>();

  ngOnChanges(): void {
    this.inputChange$.next();
  }

  ngOnDestroy(): void {
    this.inputChange$.complete();
  }
}
