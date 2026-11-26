/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, Directive, inject, OnInit, TemplateRef } from '@angular/core';

import { NzDrawerRef } from './drawer-ref';

@Directive({
  selector: '[nzDrawerFooter]',
  exportAs: 'nzDrawerFooter'
})
export class NzDrawerFooterDirective implements OnInit {
  readonly templateRef: TemplateRef<{}> = inject(TemplateRef);
  private readonly drawerRef = inject(NzDrawerRef, { optional: true });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      if (this.drawerRef?.nzFooter === this.templateRef) {
        this.drawerRef.updateConfig({ nzFooter: undefined });
      }
    });
  }

  ngOnInit(): void {
    this.drawerRef?.updateConfig({ nzFooter: this.templateRef });
  }
}
