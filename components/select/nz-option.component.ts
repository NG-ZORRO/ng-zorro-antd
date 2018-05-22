import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { toBoolean } from '../core/util/convert';

@Component({
  selector: 'nz-option',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>`
})
export class NzOptionComponent {
  private _disabled = false;
  private _customContent = false;
  @ViewChild(TemplateRef) template: TemplateRef<void>;
  @Input() nzLabel: string;
  // tslint:disable-next-line:no-any
  @Input() nzValue: any;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzCustomContent(value: boolean) {
    this._customContent = toBoolean(value);
  }

  get nzCustomContent(): boolean {
    return this._customContent;
  }
}
