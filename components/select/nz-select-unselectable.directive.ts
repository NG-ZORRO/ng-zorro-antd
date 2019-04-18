import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-select-unselectable]',
  exportAs: 'nzSelectUnselectable',
  host: {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"'
  }
})
export class NzSelectUnselectableDirective {}
