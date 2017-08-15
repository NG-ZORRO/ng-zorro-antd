import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[nz-form-item-required]'
})

export class NzFormItemRequiredDirective {
  @Input() @HostBinding(`class.ant-form-item-required`) nzRequired = true;
}
