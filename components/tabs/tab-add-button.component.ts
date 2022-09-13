/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, Input, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-tab-add-button, button[nz-tab-add-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <span nz-icon [nzType]="icon" nzTheme="outline"></span>
    </ng-container>
  `,
  host: {
    class: 'ant-tabs-nav-add',
    'aria-label': 'Add tab',
    type: 'button'
  }
})
export class NzTabAddButtonComponent {
  @Input() addIcon: string | TemplateRef<NzSafeAny> = 'plus';

  private readonly element: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.element = this.elementRef.nativeElement;
  }

  getElementWidth(): number {
    return this.element?.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element?.offsetHeight || 0;
  }
}
