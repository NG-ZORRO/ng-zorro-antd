import { Component } from '@angular/core';

@Component({
  selector   : 'nz-form-extra',
  templateUrl: './nz-form-extra.component.html',
  host       : {
    '[class.ant-form-extra]': 'true'
  },
  styles     : [ `:host {
    display: block;
  }` ]
})
export class NzFormExtraComponent {
}
