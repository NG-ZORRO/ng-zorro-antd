import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector     : 'nz-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ],
  host: {
    '[class.ant-breadcrumb]': 'true'
  }
})
export class NzBreadCrumbComponent {
  @Input() nzSeparator = '/';
}
