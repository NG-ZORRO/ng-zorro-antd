/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-statistic',
  exportAs: 'nzStatistic',
  template: `
    <div class="ant-statistic-title">
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
    </div>
    @if (nzLoading) {
      <nz-skeleton class="ant-statistic-skeleton" [nzParagraph]="false" />
    } @else {
      <div class="ant-statistic-content" [style]="nzValueStyle">
        @if (nzPrefix) {
          <span class="ant-statistic-content-prefix">
            <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
          </span>
        }
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"></nz-statistic-number>
        @if (nzSuffix) {
          <span class="ant-statistic-content-suffix">
            <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
          </span>
        }
      </div>
    }
  `,
  host: {
    class: 'ant-statistic',
    '[class.ant-statistic-rtl]': `dir.isRtl()`
  },
  imports: [NzSkeletonModule, NzStatisticNumberComponent, NzOutletModule]
})
export class NzStatisticComponent {
  @Input() nzPrefix?: string | TemplateRef<void>;
  @Input() nzSuffix?: string | TemplateRef<void>;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzValue?: NzStatisticValueType;
  @Input() nzValueStyle: NgStyleInterface = {};
  @Input() nzValueTemplate?: TemplateRef<{ $implicit: NzStatisticValueType }>;
  @Input({ transform: booleanAttribute }) nzLoading: boolean = false;

  readonly dir = nzInjectDirectionality();

  protected cdr = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);
}
