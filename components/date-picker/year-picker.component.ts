/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';
import { AbstractPickerComponent } from './abstract-picker.component';
import { DatePickerService } from './date-picker.service';
import { PanelMode } from './standard-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-year-picker',
  exportAs: 'nzYearPicker',
  templateUrl: './abstract-picker.component.html',
  host: {
    '[class]': 'hostClassMap'
  },
  providers: [
    DatePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NzYearPickerComponent)
    }
  ]
})
export class NzYearPickerComponent extends AbstractPickerComponent {
  @Input() nzMode: PanelMode | PanelMode[] = 'year';
  @Input() nzFormat: string = 'yyyy';

  constructor(
    datePickerService: DatePickerService,
    i18n: NzI18nService,
    cdr: ChangeDetectorRef,
    dateHelper: DateHelperService,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(datePickerService, i18n, cdr, dateHelper, noAnimation);
  }
}
