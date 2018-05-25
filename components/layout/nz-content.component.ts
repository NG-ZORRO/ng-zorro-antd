import { Component } from '@angular/core';

@Component({
  selector           : 'nz-content',
  preserveWhitespaces: false,
  templateUrl        : './nz-content.component.html',
  styles             : [
    `:host {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-content]': 'true'
  }
})
export class NzContentComponent {
}
