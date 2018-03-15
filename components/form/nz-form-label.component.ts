import { Component, Input } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzColComponent } from '../grid/nz-col.component';

@Component({
  selector           : 'nz-form-label',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  template           : `
    <label [attr.for]="nzFor" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
    </label>`,
  host               : {
    '[class.ant-form-item-label]': 'true'
  }
})
export class NzFormLabelComponent extends NzColComponent {
  @Input() nzFor: string;
  private _required = false;

  @Input()
  set nzRequired(value: boolean) {
    this._required = toBoolean(value);
  }

  get nzRequired(): boolean {
    return this._required;
  }
}
