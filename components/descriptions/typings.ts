/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

export type NzDescriptionsSize = 'default' | 'middle' | 'small';

export type NzDescriptionsLayout = 'horizontal' | 'vertical';

export interface NzDescriptionsItemRenderProps {
  title: string | TemplateRef<void>;
  span: number;
  content: TemplateRef<void>;
}
