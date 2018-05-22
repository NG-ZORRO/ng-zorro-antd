import { Component } from '@angular/core';

@Component({
  selector           : 'nz-header',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `,
  styles             : [
    `:host {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-header]': 'true'
  }
})
export class NzHeaderComponent {
}
