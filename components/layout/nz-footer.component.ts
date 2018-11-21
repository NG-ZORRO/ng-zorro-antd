import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-footer',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-footer.component.html',
  styles             : [
      `nz-footer {
      display: block;
    }`
  ],
  host               : {
    '[class.ant-layout-footer]': 'true'
  }
})
export class NzFooterComponent {
}
