/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, input } from '@angular/core';

/**
 * Makes an `ng-template` type safe.
 *
 * Bind `nzTypeHint` to a value of the type the template context will have. The value itself is never read, it only
 * tells the compiler which type the context has, so a field that is never assigned is enough.
 *
 * ```ts
 * protected readonly itemContext!: { $implicit: NzSafeAny };
 * ```
 *
 * ```html
 * <ng-template #template [nzTypeHint]="itemContext" let-item>{{ item.name }}</ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[nzTypeHint]'
})
export class NzTypeHintDirective<T> {
  /** A value of the template context type. Only used to infer the context type, its value is never read. */
  readonly nzTypeHint = input<T>();

  static ngTemplateContextGuard<T>(_dir: NzTypeHintDirective<T>, _ctx: unknown): _ctx is T {
    return true;
  }
}
