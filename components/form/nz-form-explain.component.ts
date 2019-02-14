import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { helpMotion } from '../core/animation/help';

@Component({
  selector           : 'nz-form-explain',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  animations         : [ helpMotion ],
  templateUrl        : './nz-form-explain.component.html',
  host               : {
    '[class.ant-form-explain]': 'true'
  },
  styles             : [
      `nz-form-explain {
      display: block;
    }`
  ]
})
export class NzFormExplainComponent {
}
