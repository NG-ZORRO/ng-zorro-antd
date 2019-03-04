import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-select-unselectable]',
  host    : {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"'
  }
})
export class NzSelectUnselectableDirective {

}
