/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, Optional, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PREFIX } from 'ng-zorro-antd/core';

import { NzEmptyCustomContent, NZ_DEFAULT_EMPTY_CONTENT } from './nz-empty-config';
import { NzEmptyServiceModule } from './nz-empty.service.module';

@Injectable({
  providedIn: NzEmptyServiceModule
})
// tslint:disable-next-line:no-any
export class NzEmptyService<T = any> {
  userDefaultContent$ = new BehaviorSubject<NzEmptyCustomContent | undefined>(undefined);

  constructor(@Inject(NZ_DEFAULT_EMPTY_CONTENT) @Optional() private defaultEmptyContent: Type<T>) {
    if (this.defaultEmptyContent) {
      this.userDefaultContent$.next(this.defaultEmptyContent);
    }
  }

  setDefaultContent(content?: NzEmptyCustomContent): void {
    if (
      typeof content === 'string' ||
      content === undefined ||
      content === null ||
      content instanceof TemplateRef ||
      content instanceof Type
    ) {
      this.userDefaultContent$.next(content);
    } else {
      throw new Error(
        `${PREFIX} 'useDefaultContent' expect 'string', 'templateRef' or 'component' but get ${content}.`
      );
    }
  }

  resetDefault(): void {
    this.userDefaultContent$.next(undefined);
  }
}
