import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-card-loading',
  templateUrl        : './nz-card-loading.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  host               : {
    '[class.ant-card-loading-content]': 'true'
  },
  styles             : [ `
    nz-card-loading {
      display: block;
    }
  ` ]
})
export class NzCardLoadingComponent {

}
