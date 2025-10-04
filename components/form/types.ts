/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

export type NzRequiredMark = boolean | 'optional' | TemplateRef<{ $implicit: TemplateRef<void>; required: boolean }>;
