/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

/**
 * https://angular.io/errors/NG3003
 * An intermediate interface for {@link NzBreadCrumbComponent} & {@link NzBreadCrumbItemComponent}
 */
export abstract class NzBreadcrumb {
  abstract nzSeparator: string | TemplateRef<void> | null;
}
