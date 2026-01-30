/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTableStyleService } from '../table-style.service';
import { NzTableSummaryFixedType } from '../table.types';

function fixedAttribute(value: NzTableSummaryFixedType | boolean | unknown): NzTableSummaryFixedType | null {
  return value === 'top' || value === 'bottom' ? value : booleanAttribute(value) ? 'bottom' : null;
}

/* eslint-disable @angular-eslint/component-selector */
@Component({
  selector: 'tfoot[nzSummary]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
    @if (!isInsideTable || !nzFixed) {
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    }
  `,
  imports: [NgTemplateOutlet],
  host: {
    '[class.ant-table-summary]': '!isInsideTable || !nzFixed'
  }
})
export class NzTfootSummaryComponent implements OnInit, OnChanges {
  @Input({ transform: fixedAttribute }) nzFixed: NzTableSummaryFixedType | null = null;
  @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<NzSafeAny>;
  private nzTableStyleService = inject(NzTableStyleService, { optional: true });
  isInsideTable = !!this.nzTableStyleService;

  ngOnInit(): void {
    this.nzTableStyleService?.setTfootTemplate(this.templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzFixed } = changes;
    this.nzTableStyleService?.setTfootFixed(nzFixed.currentValue);
  }
}
