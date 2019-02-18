import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { DateRangePickerComponent } from './date-range-picker.component';

@Component({
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector       : 'nz-week-picker',
  templateUrl    : './date-range-picker.component.html',
  providers      : [ {
    provide    : NG_VALUE_ACCESSOR,
    multi      : true,
    useExisting: forwardRef(() => NzWeekPickerComponent)
  } ]
})

export class NzWeekPickerComponent extends DateRangePickerComponent {
  showWeek: boolean = true;

  constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    super(i18n, cdr);
    renderer.addClass(elementRef.nativeElement, 'ant-calendar-picker');
  }
}
