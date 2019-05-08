/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, NzDirectionVHType, NzSizeLDSType, NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { NzListGrid } from './interface';

@Component({
  selector: 'nz-list, [nz-list]',
  exportAs: 'nzList',
  templateUrl: './nz-list.component.html',
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      nz-list,
      nz-list nz-spin {
        display: block;
      }
    `
  ]
})
export class NzListComponent implements OnInit, OnChanges, OnDestroy {
  // #region fields
  // tslint:disable-next-line:no-any
  @Input() nzDataSource: any[];

  @Input() @InputBoolean() nzBordered = false;

  @Input() nzGrid: NzListGrid;

  @Input() nzHeader: string | TemplateRef<void>;

  @Input() nzFooter: string | TemplateRef<void>;

  @Input() nzItemLayout: NzDirectionVHType = 'horizontal';

  @Input() nzRenderItem: TemplateRef<void>;

  @Input() @InputBoolean() nzLoading = false;

  @Input() nzLoadMore: TemplateRef<void>;

  @Input() nzPagination: TemplateRef<void>;

  @Input() nzSize: NzSizeLDSType = 'default';

  @Input() @InputBoolean() nzSplit = true;

  @Input() nzNoResult: string | TemplateRef<void>;

  // #endregion

  // #region styles

  private prefixCls = 'ant-list';

  private _setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-vertical`]: this.nzItemLayout === 'vertical',
      [`${this.prefixCls}-lg`]: this.nzSize === 'large',
      [`${this.prefixCls}-sm`]: this.nzSize === 'small',
      [`${this.prefixCls}-split`]: this.nzSplit,
      [`${this.prefixCls}-bordered`]: this.nzBordered,
      [`${this.prefixCls}-loading`]: this.nzLoading,
      [`${this.prefixCls}-grid`]: this.nzGrid,
      [`${this.prefixCls}-something-after-last-item`]: !!(this.nzLoadMore || this.nzPagination || this.nzFooter)
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // #endregion

  private itemLayoutNotifySource = new BehaviorSubject<NzDirectionVHType>(this.nzItemLayout);

  get itemLayoutNotify$(): Observable<NzDirectionVHType> {
    return this.itemLayoutNotifySource.asObservable();
  }

  constructor(private el: ElementRef, private updateHostClassService: NzUpdateHostClassService) {}

  ngOnInit(): void {
    this._setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._setClassMap();
    if (changes.nzItemLayout) {
      this.itemLayoutNotifySource.next(this.nzItemLayout);
    }
  }

  ngOnDestroy(): void {
    this.itemLayoutNotifySource.unsubscribe();
  }
}
