import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-card-grid]',
  host    : {
    '[class.ant-card-grid]': 'true'
  }
})
export class NzCardGridDirective {
}
