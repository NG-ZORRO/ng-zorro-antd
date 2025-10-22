/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, input, model } from '@angular/core';

@Directive({
  selector: 'nz-input-password'
})
export class NzInputPasswordDirective {
  readonly nzVisibilityToggle = input(true);
  readonly nzVisible = model(false);

  toggleVisible(): void {
    this.nzVisible.update(value => !value);
  }
}

@Directive({
  selector: '[nzInputPasswordIcon]'
})
export class NzInputPasswordIconDirective {
  /**
   * @internal
   */
  static ngTemplateContextGuard(_: NzInputPasswordIconDirective, context: unknown): context is { $implicit: boolean } {
    return true;
  }
}
