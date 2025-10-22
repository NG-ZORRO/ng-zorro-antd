/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzButtonType } from 'ng-zorro-antd/button';

export interface NzPopConfirmButton {
  nzType: NzButtonType;
  nzDanger: boolean;
  nzDisabled: boolean;
}

export type NzPopConfirmButtonProps = Partial<NzPopConfirmButton>;
