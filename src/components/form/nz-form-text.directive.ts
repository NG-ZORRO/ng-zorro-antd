import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-text]'
})

export class NzFormTextDirective {
  @HostBinding(`class.ant-form-text`) true;
}
