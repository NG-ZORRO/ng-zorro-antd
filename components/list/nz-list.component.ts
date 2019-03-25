import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NzSizeLDSType } from '../core/types/size';
import { InputBoolean } from '../core/util/convert';

import { NzListGrid } from './interface';

@Component({
  selector: 'nz-list',
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
export class NzListComponent implements OnInit, OnChanges {
  // #region fields
  // tslint:disable-next-line:no-any
  @Input() nzDataSource: any[];

  @Input() @InputBoolean() nzBordered = false;

  @Input() nzGrid: NzListGrid;

  @Input() nzHeader: string | TemplateRef<void>;

  @Input() nzFooter: string | TemplateRef<void>;

  @Input() nzItemLayout: 'vertical' | 'horizontal' = 'horizontal';

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

  constructor(private el: ElementRef, private updateHostClassService: NzUpdateHostClassService) {}

  ngOnInit(): void {
    this._setClassMap();
  }

  ngOnChanges(): void {
    this._setClassMap();
  }
}
