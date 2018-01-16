import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector           : 'nz-breadcrumb',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>`,
  host               : {
    '[class.ant-breadcrumb]': 'true'
  }
})
export class NzBreadCrumbComponent {
  @Input() nzSeparator = '/';
}
