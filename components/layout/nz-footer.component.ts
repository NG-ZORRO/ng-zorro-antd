import { Component } from '@angular/core';

@Component({
  selector           : 'nz-footer',
  preserveWhitespaces: false,
  templateUrl        : './nz-footer.component.html',
  styles             : [
    `:host {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-footer]': 'true'
  }
})
export class NzFooterComponent {
}
