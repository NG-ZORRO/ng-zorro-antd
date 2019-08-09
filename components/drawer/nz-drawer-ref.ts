/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzDrawerPlacement } from './nz-drawer-options';

// tslint:disable-next-line:no-any
export abstract class NzDrawerRef<R = any> {
  abstract afterClose: Observable<R>;
  abstract afterOpen: Observable<void>;
  abstract close(result?: R): void;
  abstract open(): void;

  abstract nzClosable: boolean;
  abstract nzNoAnimation: boolean;
  abstract nzMaskClosable: boolean;
  abstract nzKeyboard: boolean;
  abstract nzMask: boolean;
  abstract nzTitle: string | TemplateRef<{}>;
  abstract nzPlacement: NzDrawerPlacement;
  abstract nzMaskStyle: object;
  abstract nzBodyStyle: object;
  abstract nzWrapClassName: string;
  abstract nzWidth: number | string;
  abstract nzHeight: number | string;
  abstract nzZIndex: number | string;
  abstract nzOffsetX: number | string;
  abstract nzOffsetY: number | string;
}
