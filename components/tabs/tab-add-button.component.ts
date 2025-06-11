/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, inject, Input, TemplateRef } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-tab-add-button, button[nz-tab-add-button]',
  template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
  host: {
    class: 'ant-tabs-nav-add',
    'aria-label': 'Add tab',
    type: 'button'
  },
  imports: [NzOutletModule, NzIconModule]
})
export class NzTabAddButtonComponent {
  @Input() addIcon: string | TemplateRef<NzSafeAny> = 'plus';

  private readonly element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  getElementWidth(): number {
    return this.element?.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element?.offsetHeight || 0;
  }
}
