import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-extra]'
})

export class NzFormExtraDirective {
  @HostBinding(`class.ant-form-extra`) _nzFormExtra = true;
}
