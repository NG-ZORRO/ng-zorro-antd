import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

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

  constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    super(i18n, cdr);
    renderer.addClass(elementRef.nativeElement, 'ant-calendar-picker');
  }
}
