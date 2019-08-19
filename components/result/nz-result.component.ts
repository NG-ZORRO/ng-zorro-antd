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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzUpdateHostClassService } from 'ng-zorro-antd/core';

export type NzResultIconType = 'success' | 'error' | 'info' | 'warning';
export type NzExceptionStatusType = '404' | '500' | '403';
export type NzResultStatusType = NzExceptionStatusType | NzResultIconType;

const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning'
};
const ExceptionStatus = ['404', '500', '403'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-result',
  exportAs: 'nzResult',
  templateUrl: './nz-result.component.html',
  providers: [NzUpdateHostClassService],
  styles: [
    `
      nz-result {
        display: block;
      }
    `
  ]
})
export class NzResultComponent implements OnChanges {
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzStatus: NzResultStatusType = 'info';
  @Input() nzSubTitle?: string | TemplateRef<void>;
  @Input() nzExtra?: string | TemplateRef<void>;

  icon?: string | TemplateRef<void>;
  isException = false;

  constructor(private nzUpdateHostClassService: NzUpdateHostClassService, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.setStatusIcon();
    this.setClassMap();
  }

  private setStatusIcon(): void {
    const icon = this.nzIcon;

    this.isException = ExceptionStatus.indexOf(this.nzStatus) !== -1;
    this.icon = icon
      ? typeof icon === 'string'
        ? IconMap[icon as NzResultIconType] || icon
        : icon
      : this.isException
      ? undefined
      : IconMap[this.nzStatus as NzResultIconType];
  }

  private setClassMap(): void {
    const prefix = 'ant-result';

    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [prefix]: true,
      [`${prefix}-${this.nzStatus}`]: true
    });
  }
}
