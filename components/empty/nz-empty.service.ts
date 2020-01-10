/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { NzConfigService, PREFIX } from 'ng-zorro-antd/core';

import { NzEmptyCustomContent } from './nz-empty-config';

@Injectable({
  providedIn: 'root'
})
export class NzEmptyService {
  userDefaultContent$ = new BehaviorSubject<NzEmptyCustomContent | undefined>(undefined);

  constructor(public nzConfigService: NzConfigService) {
    this.subscribeDefaultEmptyContentChange();
  }

  private subscribeDefaultEmptyContentChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent('empty').pipe(startWith(true)).subscribe(() => {
      this.userDefaultContent$.next(this.getUserDefaultEmptyContent());
    });
  }

  // tslint:disable-next-line:no-any
  private getUserDefaultEmptyContent(): Type<any> | TemplateRef<string> | string | undefined {
    const content = (this.nzConfigService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent;

    if (
      typeof content === 'string' ||
      content === undefined ||
      content === null ||
      content instanceof TemplateRef ||
      content instanceof Type
    ) {
      return content;
    } else {
      throw new Error(
        `${PREFIX} default empty content expects a 'null', 'undefined', 'string', 'TemplateRef' or 'Component' but get ${content}.`
      );
    }
  }
}
