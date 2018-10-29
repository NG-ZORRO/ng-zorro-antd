import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector           : 'nz-card-loading',
  templateUrl        : './nz-card-loading.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  host               : {
    '[class.ant-card-loading-content]': 'true'
  },
  styles             : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzCardLoadingComponent {

}
