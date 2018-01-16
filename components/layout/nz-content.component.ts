import { Component } from '@angular/core';

@Component({
  selector           : 'nz-content',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `,
  host               : {
    '[class.ant-layout-content]': 'true'
  }
})
export class NzContentComponent {
}
