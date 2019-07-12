/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IndexableObject } from '../types/indexable';
import { isNotNil } from '../util/check';
import { NzMeasureScrollbarServiceModule } from './nz-measure-scrollbar.service.module';

@Injectable({
  providedIn: NzMeasureScrollbarServiceModule
})
export class NzMeasureScrollbarService {
  private _scrollbarWidth: number;
  private scrollbarMeasure: IndexableObject = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px',
    overflow: 'scroll'
  };

  get scrollBarWidth(): number {
    if (isNotNil(this._scrollbarWidth)) {
      return this._scrollbarWidth;
    }
    this.initScrollBarWidth();
    return this._scrollbarWidth;
  }

  initScrollBarWidth(): void {
    const scrollDiv = this.document.createElement('div');
    for (const scrollProp in this.scrollbarMeasure) {
      if (this.scrollbarMeasure.hasOwnProperty(scrollProp)) {
        scrollDiv.style[scrollProp] = this.scrollbarMeasure[scrollProp];
      }
    }
    this.document.body.appendChild(scrollDiv);
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.document.body.removeChild(scrollDiv);
    this._scrollbarWidth = width;
  }

  // tslint:disable-next-line:no-any
  constructor(@Inject(DOCUMENT) private document: any) {
    this.initScrollBarWidth();
  }
}
