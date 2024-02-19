/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentRef, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzDrawerPlacement } from './drawer-options';

export abstract class NzDrawerRef<T = NzSafeAny, R = NzSafeAny> {
  abstract afterClose: Observable<R | undefined>;
  abstract afterOpen: Observable<void>;
  abstract close(result?: R): void;
  abstract open(): void;
  abstract getContentComponent(): T | null;
  abstract getContentComponentRef(): Readonly<ComponentRef<T>> | null;

  abstract nzClosable?: boolean;
  abstract nzNoAnimation?: boolean;
  abstract nzMaskClosable?: boolean;
  abstract nzKeyboard?: boolean;
  abstract nzMask?: boolean;
  abstract nzTitle?: string | TemplateRef<{}>;
  abstract nzPlacement?: NzDrawerPlacement;
  abstract nzMaskStyle?: object;
  abstract nzBodyStyle?: object;
  abstract nzWrapClassName?: string;
  abstract nzWidth?: number | string;
  abstract nzHeight?: number | string;
  abstract nzZIndex?: number | string;
  abstract nzOffsetX?: number | string;
  abstract nzOffsetY?: number | string;
}
