/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-statistic',
  exportAs: 'nzStatistic',
  template: `
    <div class="ant-statistic" [class.ant-statistic-rtl]="dir === 'rtl'">
      <div class="ant-statistic-title">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-statistic-content" [ngStyle]="nzValueStyle">
        <span *ngIf="nzPrefix" class="ant-statistic-content-prefix">
          <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
        </span>
        <nz-statistic-number [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate"> </nz-statistic-number>
        <span *ngIf="nzSuffix" class="ant-statistic-content-suffix">
          <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
        </span>
      </div>
    </div>
  `
})
export class NzStatisticComponent implements OnDestroy {
  @Input() nzPrefix?: string | TemplateRef<void>;
  @Input() nzSuffix?: string | TemplateRef<void>;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzValue?: NzStatisticValueType;
  @Input() nzValueStyle: NgStyleInterface = {};
  @Input() nzValueTemplate?: TemplateRef<{ $implicit: NzStatisticValueType }>;
  dir: Direction;

  private destroy$ = new Subject<void>();

  constructor(cdr: ChangeDetectorRef, @Optional() directionality: Directionality) {
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
      cdr.detectChanges();
    });

    this.dir = directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
