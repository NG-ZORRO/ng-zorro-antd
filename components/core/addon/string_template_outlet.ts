/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[nzStringTemplateOutlet]',
  exportAs: 'nzStringTemplateOutlet'
})
export class NzStringTemplateOutletDirective implements OnChanges {
  private isTemplate: boolean;
  // tslint:disable-next-line:no-any
  private inputTemplate: TemplateRef<any> | null = null;
  private inputViewRef: EmbeddedViewRef<void> | null = null;
  private defaultViewRef: EmbeddedViewRef<void> | null = null;

  // tslint:disable-next-line:no-any
  @Input() nzStringTemplateOutletContext: any | null = null;

  @Input()
  // tslint:disable-next-line:no-any
  set nzStringTemplateOutlet(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this.isTemplate = true;
      this.inputTemplate = value;
    } else {
      this.isTemplate = false;
    }
  }

  recreateView(): void {
    if (!this.isTemplate) {
      /** use default template when input is string **/
      if (!this.defaultViewRef) {
        if (this.defaultTemplate) {
          this.defaultViewRef = this.viewContainer.createEmbeddedView(
            this.defaultTemplate,
            this.nzStringTemplateOutletContext
          );
        }
      }
    } else {
      /** use input template when input is templateRef **/
      if (!this.inputViewRef) {
        if (this.inputTemplate) {
          this.inputViewRef = this.viewContainer.createEmbeddedView(
            this.inputTemplate,
            this.nzStringTemplateOutletContext
          );
        }
      }
    }
  }

  // tslint:disable-next-line:no-any
  private getType(value: string | TemplateRef<any>): 'template' | 'string' {
    if (value instanceof TemplateRef) {
      return 'template';
    } else {
      return 'string';
    }
  }

  private shouldRecreateView(changes: SimpleChanges): boolean {
    const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
    let shouldOutletRecreate = false;
    if (nzStringTemplateOutlet) {
      if (nzStringTemplateOutlet.firstChange) {
        shouldOutletRecreate = true;
      } else {
        const previousOutletType = this.getType(nzStringTemplateOutlet.previousValue);
        const currentOutletType = this.getType(nzStringTemplateOutlet.currentValue);
        shouldOutletRecreate = !(previousOutletType === 'string' && currentOutletType === 'string');
      }
    }
    const shouldContextRecreate =
      nzStringTemplateOutletContext && this.hasContextShapeChanged(nzStringTemplateOutletContext);
    return shouldContextRecreate || shouldOutletRecreate;
  }

  private hasContextShapeChanged(ctxChange: SimpleChange): boolean {
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
  }

  // tslint:disable-next-line:no-any
  private updateExistingContext(ctx: any): void {
    for (const propName of Object.keys(ctx)) {
      // tslint:disable-next-line:no-any
      (this.inputViewRef!.context as any)[propName] = this.nzStringTemplateOutletContext[propName];
    }
  }

  constructor(private viewContainer: ViewContainerRef, private defaultTemplate: TemplateRef<void>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const recreateView = this.shouldRecreateView(changes);
    if (recreateView) {
      if (this.viewContainer) {
        this.viewContainer.clear();
        this.defaultViewRef = null;
        this.inputViewRef = null;
      }
      this.recreateView();
    } else {
      if (this.inputViewRef && this.nzStringTemplateOutletContext) {
        this.updateExistingContext(this.nzStringTemplateOutletContext);
      }
    }
  }
}
