/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    '[class.ant-statistic-rtl]': `dir === 'rtl'`
  },
  imports: [NzSkeletonModule, NzStatisticNumberComponent, NzOutletModule]
})
export class NzStatisticComponent implements OnDestroy, OnInit {
  @Input() nzPrefix?: string | TemplateRef<void>;
  @Input() nzSuffix?: string | TemplateRef<void>;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzValue?: NzStatisticValueType;
  @Input() nzValueStyle: NgStyleInterface = {};
  @Input() nzValueTemplate?: TemplateRef<{ $implicit: NzStatisticValueType }>;
  @Input({ transform: booleanAttribute }) nzLoading: boolean = false;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  protected cdr = inject(ChangeDetectorRef);
  private directionality = inject(Directionality);

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
