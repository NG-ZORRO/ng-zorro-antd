import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-form-extra',
  templateUrl        : './nz-form-extra.component.html',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  host               : {
    '[class.ant-form-extra]': 'true'
  },
  styles             : [
      `
      nz-form-extra {
        display: block;
      }
    `
  ]
})
export class NzFormExtraComponent {
}
