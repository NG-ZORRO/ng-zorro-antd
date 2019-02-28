import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { DateHelperService } from '../i18n/date-helper.service';
import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';

@Component({
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector       : 'nz-month-picker',
  templateUrl    : './header-picker.component.html',
  providers      : [ {
    provide    : NG_VALUE_ACCESSOR,
    multi      : true,
    useExisting: forwardRef(() => NzMonthPickerComponent)
  } ]
})

export class NzMonthPickerComponent extends HeaderPickerComponent {
  @Input() nzFormat: string = 'yyyy-MM';

  endPanelMode: SupportHeaderPanel = 'month';

  constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, dateHelper: DateHelperService, renderer: Renderer2, elementRef: ElementRef,
              @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(i18n, cdr, dateHelper, noAnimation);
    renderer.addClass(elementRef.nativeElement, 'ant-calendar-picker');
  }
}
