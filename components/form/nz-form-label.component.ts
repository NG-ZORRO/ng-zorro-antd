import { Component, ElementRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzColComponent } from '../grid/nz-col.component';
import { NzRowComponent } from '../grid/nz-row.component';
import { NzRowDirective } from '../grid/nz-row.directive';

@Component({
  selector           : 'nz-form-label',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  templateUrl        : './nz-form-label.component.html',
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

  constructor(nzUpdateHostClassService: NzUpdateHostClassService, elementRef: ElementRef, @Optional() @Host() nzRowComponent: NzRowComponent, @Optional() @Host() nzRowDirective: NzRowDirective, renderer: Renderer2) {
    super(nzUpdateHostClassService, elementRef, nzRowComponent, nzRowDirective, renderer);
  }
}
