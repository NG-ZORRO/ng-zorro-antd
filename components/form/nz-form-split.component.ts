import { Component } from '@angular/core';

@Component({
  selector: 'nz-form-split',
  template: `
    <ng-content></ng-content>`,
  host    : {
    '[class.ant-form-split]': 'true'
  }
})
export class NzFormSplitComponent {
}
