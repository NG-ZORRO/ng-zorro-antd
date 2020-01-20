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
  EventEmitter,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzCheckboxComponent } from './checkbox.component';

@Component({
  selector: 'nz-checkbox-wrapper',
  exportAs: 'nzCheckboxWrapper',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-checkbox-group]': 'true',
    '[class.ant-checkbox-group-rtl]': `dir === 'rtl'`
  }
})
export class NzCheckboxWrapperComponent implements OnDestroy {
  @Output() readonly nzOnChange = new EventEmitter<NzSafeAny[]>();
  private checkboxList: NzCheckboxComponent[] = [];

  dir: Direction;

  private destroy$ = new Subject<void>();

  addCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.push(value);
  }

  removeCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
  }

  onChange(): void {
    const listOfCheckedValue = this.checkboxList.filter(item => item.nzChecked).map(item => item.nzValue);
    this.nzOnChange.emit(listOfCheckedValue);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(cdr: ChangeDetectorRef, @Optional() directionality: Directionality) {
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
      cdr.detectChanges();
    });

    this.dir = directionality.value;
  }
}
