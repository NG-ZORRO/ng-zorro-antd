import { Component } from '@angular/core';

@Component({
  selector: 'nz-form-extra',
  template: `
    <ng-content></ng-content>`,
  host    : {
    '[class.ant-form-extra]': 'true'
  },
  styles             : [ `:host {
    display: block;
  }` ]
})
export class NzFormExtraComponent {
}
