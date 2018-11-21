import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-form-split',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-form-split.component.html',
  host               : {
    '[class.ant-form-split]': 'true'
  }
})
export class NzFormSplitComponent {
}
