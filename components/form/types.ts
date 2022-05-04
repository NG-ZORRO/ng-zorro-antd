/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ThemeType } from '@ant-design/icons-angular';

import { NzTSType } from 'ng-zorro-antd/core/types';

export type NzFormLayoutType = 'horizontal' | 'vertical' | 'inline';
export interface NzFormTooltipIcon {
  type: NzTSType;
  theme: ThemeType;
}
export type NzFormLabelAlign = 'left' | 'right';
export type NzFormControlStatusType = 'success' | 'error' | 'warning' | 'validating' | null;
