/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  providers: [NzUpdateHostClassService]
})
export class NzFormDirective implements OnInit, OnChanges {
  @Input() nzLayout = 'horizontal';

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`ant-form-${this.nzLayout}`]: this.nzLayout
    });
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(): void {
    this.setClassMap();
  }
}
