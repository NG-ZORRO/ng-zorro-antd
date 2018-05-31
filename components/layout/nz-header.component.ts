import { Component } from '@angular/core';

@Component({
  selector           : 'nz-header',
  preserveWhitespaces: false,
  templateUrl        : './nz-header.component.html',
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
