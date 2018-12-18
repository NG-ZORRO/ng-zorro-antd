import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-content',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-content.component.html',
  styles             : [
      `nz-content {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-content]': 'true'
  }
})
export class NzContentComponent {
}
