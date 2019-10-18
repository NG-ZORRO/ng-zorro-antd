/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, Optional, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { warnDeprecation, NzConfigService, PREFIX } from 'ng-zorro-antd/core';

import { NzEmptyCustomContent, NZ_DEFAULT_EMPTY_CONTENT } from './nz-empty-config';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:no-any
export class NzEmptyService<T = any> {
  userDefaultContent$ = new BehaviorSubject<NzEmptyCustomContent | undefined>(undefined);

  constructor(
    private nzConfigService: NzConfigService,
    @Inject(NZ_DEFAULT_EMPTY_CONTENT) @Optional() private legacyDefaultEmptyContent: Type<T>
  ) {
    if (legacyDefaultEmptyContent) {
      warnDeprecation(
        `'NZ_DEFAULT_EMPTY_CONTENT' is deprecated and would be removed in 9.0.0. Please migrate to 'NZ_CONFIG'.`
      );
    }

    const userDefaultEmptyContent = this.getUserDefaultEmptyContent();

    if (userDefaultEmptyContent) {
      this.userDefaultContent$.next(userDefaultEmptyContent);
    }

    this.nzConfigService.getConfigChangeEventForComponent('empty').subscribe(() => {
      this.userDefaultContent$.next(this.getUserDefaultEmptyContent());
    });
  }

  setDefaultContent(content?: NzEmptyCustomContent): void {
    warnDeprecation(
      `'setDefaultContent' is deprecated and would be removed in 9.0.0. Please migrate to 'NzConfigService'.`
    );

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
    warnDeprecation(
      `'resetDefault' is deprecated and would be removed in 9.0.0. Please migrate to 'NzConfigService' and provide an 'undefined'.`
    );
    this.userDefaultContent$.next(undefined);
  }

  private getUserDefaultEmptyContent(): Type<T> | TemplateRef<string> | string {
    return (
      (this.nzConfigService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent ||
      this.legacyDefaultEmptyContent
    );
  }
}
