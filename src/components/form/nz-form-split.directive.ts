import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[nz-form-split]'
})
export class NzFormSplitDirective {
  @HostBinding(`class.ant-form-split`) _nzFormSplit = true;
}
