import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-form-text',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-form-text.component.html',
  host               : {
    '[class.ant-form-text]': 'true'
  }
})
export class NzFormTextComponent {
}
