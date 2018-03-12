import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-form-item]',
  host    : {
    '[class.ant-form-item]'          : 'true',
    '[class.ant-form-item-with-help]': 'withHelp>0'
  }
})
export class NzFormItemDirective {
  withHelp = 0;

  enableHelp(): void {
    this.withHelp++;
  }

  disableHelp(): void {
    this.withHelp--;
  }
}
