import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NzSizeLDSType } from '../core/types/size';
import { InputBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { NzListGrid } from './interface';

@Component({
  selector           : 'nz-list',
  templateUrl        : './nz-list.component.html',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  styles             : [ `
    :host {
      display: block;
    }

    nz-spin {
      display: block;
    }
  ` ]
})
export class NzListComponent implements OnInit, OnChanges, OnDestroy {
  /* tslint:disable-next-line:no-any */
  locale: any = {};
  private i18n$: Subscription;

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

  // #endregion

  // #region styles

  private prefixCls = 'ant-list';

  private _setClassMap(): void {
    const classMap = {
      [ this.prefixCls ]                               : true,
      [ `${this.prefixCls}-vertical` ]                 : this.nzItemLayout === 'vertical',
      [ `${this.prefixCls}-lg` ]                       : this.nzSize === 'large',
      [ `${this.prefixCls}-sm` ]                       : this.nzSize === 'small',
      [ `${this.prefixCls}-split` ]                    : this.nzSplit,
      [ `${this.prefixCls}-bordered` ]                 : this.nzBordered,
      [ `${this.prefixCls}-loading` ]                  : this.nzLoading,
      [ `${this.prefixCls}-grid` ]                     : this.nzGrid,
      [ `${this.prefixCls}-something-after-last-item` ]: !!(this.nzLoadMore || this.nzPagination || this.nzFooter)
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // #endregion

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private updateHostClassService: NzUpdateHostClassService, private i18n: NzI18nService) {
  }

  ngOnInit(): void {
    this.i18n$ = this.i18n.localeChange.subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cd.detectChanges();
    });
    this._setClassMap();
  }

  ngOnChanges(): void {
    this._setClassMap();
  }

  ngOnDestroy(): void {
    this.i18n$.unsubscribe();
  }
}
