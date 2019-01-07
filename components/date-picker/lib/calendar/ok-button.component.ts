import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'ok-button',
  templateUrl: 'ok-button.component.html'
})

export class OkButtonComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() okDisabled: boolean = false;
  @Output() readonly clickOk = new EventEmitter<void>();

  prefixCls: string = 'ant-calendar';
}
