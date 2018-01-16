import { Component } from '@angular/core';

@Component({
  selector           : 'nz-footer',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `,
  host               : {
    '[class.ant-layout-footer]': 'true'
  }
})
export class NzFooterComponent {
}
