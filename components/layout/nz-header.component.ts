import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-header',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl        : './nz-header.component.html',
  styles             : [
      `nz-header {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-header]': 'true'
  }
})
export class NzHeaderComponent {
}
