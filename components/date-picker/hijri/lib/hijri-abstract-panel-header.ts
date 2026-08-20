/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, inject } from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core/time';

import { AbstractPanelHeader } from '../../lib/abstract-panel-header';
import { NzHijriDateAdapter } from '../hijri-date-adapter';

/**
 * Panel header that navigates by Hijri months and years instead of Gregorian ones.
 */
@Directive()
export abstract class HijriAbstractPanelHeader extends AbstractPanelHeader {
  protected readonly hijriAdapter = inject(NzHijriDateAdapter);

  override superPrevious(): void {
    this.changeValue(this.addYears(-1));
  }

  override superNext(): void {
    this.changeValue(this.addYears(1));
  }

  override previous(): void {
    this.changeValue(this.addMonths(-1));
  }

  override next(): void {
    this.changeValue(this.addMonths(1));
  }

  private addYears(amount: number): CandyDate {
    return new CandyDate(this.hijriAdapter.addCalendarYears(this.value.nativeDate, amount));
  }

  private addMonths(amount: number): CandyDate {
    return new CandyDate(this.hijriAdapter.addCalendarMonths(this.value.nativeDate, amount));
  }
}
