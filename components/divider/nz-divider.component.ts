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
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-divider',
  exportAs: 'nzDivider',
  templateUrl: './nz-divider.component.html',
  preserveWhitespaces: false,
  providers: [NzUpdateHostClassService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDividerComponent implements OnChanges, OnInit {
  @Input() nzText: string | TemplateRef<void>;
  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzOrientation: 'left' | 'right' | 'center' = 'center';
  @Input() @InputBoolean() nzDashed = false;

  private setClass(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      ['ant-divider']: true,
      [`ant-divider-${this.nzType}`]: true,
      [`ant-divider-with-text-${this.nzOrientation}`]: this.nzText,
      [`ant-divider-dashed`]: this.nzDashed
    });
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {}

  ngOnChanges(): void {
    this.setClass();
  }

  ngOnInit(): void {
    this.setClass();
  }
}
