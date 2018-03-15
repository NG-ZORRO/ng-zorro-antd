import { Component, Input } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzRowComponent } from '../grid/nz-row.component';

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector           : 'nz-form-item',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  template           : `
    <ng-content></ng-content>`,
  host               : {
    '[class.ant-form-item]'          : 'true',
    '[class.ant-form-item-with-help]': 'withHelp>0'
  },
  styles             : [ `:host {
    display: block;
  }` ]
})
export class NzFormItemComponent extends NzRowComponent {
  private _flex = false;
  withHelp = 0;

  @Input()
  set nzFlex(value: boolean) {
    this._flex = toBoolean(value);
    if (this._flex) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    }
  }

  enableHelp(): void {
    this.withHelp++;
  }

  disableHelp(): void {
    this.withHelp--;
  }
}
