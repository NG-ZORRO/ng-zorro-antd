import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { DateHelperService } from '../i18n/date-helper.service';
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

  constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, dateHelper: DateHelperService, renderer: Renderer2, elementRef: ElementRef,
              @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(i18n, cdr, dateHelper, noAnimation);
    renderer.addClass(elementRef.nativeElement, 'ant-calendar-picker');
  }
}
