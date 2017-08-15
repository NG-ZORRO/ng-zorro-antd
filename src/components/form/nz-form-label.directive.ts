import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-label]'
})

export class NzFormLabelDirective {
  @HostBinding(`class.ant-form-item-label`) true;
}
