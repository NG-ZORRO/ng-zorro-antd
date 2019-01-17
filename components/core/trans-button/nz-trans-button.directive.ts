import { Directive } from '@angular/core';

@Directive({
  selector: 'button[nz-trans-button]',
  host    : {
    '[style.border]'     : '"0"',
    '[style.background]' : '"transparent"',
    '[style.padding]'    : '"0"',
    '[style.line-height]': '"inherit"'
  }
})
export class NzTransButtonDirective {

}