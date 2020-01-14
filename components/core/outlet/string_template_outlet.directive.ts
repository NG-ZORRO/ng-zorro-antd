/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[nzStringTemplateOutlet]',
  exportAs: 'nzStringTemplateOutlet'
})
export class NzStringTemplateOutletDirective implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<NzSafeAny> | null = null;
  @Input() nzStringTemplateOutletContext: NzSafeAny | null = null;
  @Input() nzStringTemplateOutlet: string | TemplateRef<NzSafeAny> | null = null;

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
    const templateRef = (isTemplateRef ? this.nzStringTemplateOutlet : this.templateRef) as NzSafeAny;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, this.nzStringTemplateOutletContext);
  }

  private updateContext(): void {
    const newCtx = this.nzStringTemplateOutletContext;
    const oldCtx = this.embeddedViewRef!.context as NzSafeAny;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NzSafeAny>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const shouldRecreateView = (ctxChanges: SimpleChanges): boolean => {
      const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = ctxChanges;
      let shouldOutletRecreate = false;
      if (nzStringTemplateOutlet) {
        if (nzStringTemplateOutlet.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate = nzStringTemplateOutlet.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate = nzStringTemplateOutlet.currentValue instanceof TemplateRef;
          shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };
    const recreateView = shouldRecreateView(changes);
    if (recreateView) {
      /** recreate view when context shape or outlet change **/
      this.recreateView();
    } else {
      /** update context **/
      this.updateContext();
    }
  }
}
