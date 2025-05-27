/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgClassInterface } from 'ng-zorro-antd/core/types';
import { NzVariant } from 'ng-zorro-antd/core/types/variant';

export function getVariantClassNames(prefixCls: string, variant?: NzVariant, borderless?: boolean): NgClassInterface {
  return {
    [`${prefixCls}-borderless`]: variant === 'borderless' || (variant === 'outlined' && borderless),
    [`${prefixCls}-filled`]: variant === 'filled',
    [`${prefixCls}-underlined`]: variant === 'underlined'
  };
}
