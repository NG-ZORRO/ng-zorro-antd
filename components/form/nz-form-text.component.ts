import { Component } from '@angular/core';

@Component({
  selector   : 'nz-form-text',
  templateUrl: './nz-form-text.component.html',
  host       : {
    '[class.ant-form-text]': 'true'
  }
})
export class NzFormTextComponent {
}
