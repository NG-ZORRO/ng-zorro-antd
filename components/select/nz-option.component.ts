import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

@Component({
  selector       : 'nz-option',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './nz-option.component.html'
})
export class NzOptionComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
  @Input() nzLabel: string;
  // tslint:disable-next-line:no-any
  @Input() nzValue: any;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzCustomContent = false;
}
