import { Component } from '@angular/core';

@Component({
  selector: 'nz-form-text',
  template: `
    <ng-content></ng-content>`,
  host    : {
    '[class.ant-form-text]': 'true'
  }
})
export class NzFormTextComponent {
}
