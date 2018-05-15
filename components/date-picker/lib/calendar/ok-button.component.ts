import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';

@Component({
  selector: 'ok-button',
  templateUrl: 'ok-button.component.html'
})

export class OkButtonComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() okDisabled: boolean = false;
  @Output() clickOk = new EventEmitter<void>();

  prefixCls: string = 'ant-calendar';
}
