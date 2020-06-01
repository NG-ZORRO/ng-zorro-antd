/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[nz-tab]',
  exportAs: 'nzTab'
})
export class NzTabDirective {}
