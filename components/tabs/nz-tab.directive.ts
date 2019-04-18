import { Directive } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[nz-tab]',
  exportAs: 'nzTab'
})
export class NzTabDirective {}
