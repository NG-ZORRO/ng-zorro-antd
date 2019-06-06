/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[nzStringTemplateOutlet]',
  exportAs: 'nzStringTemplateOutlet'
})
export class NzStringTemplateOutletDirective {
  private isTemplate: boolean;
  private inputTemplate: TemplateRef<void> | null = null;
  private inputViewRef: EmbeddedViewRef<void> | null = null;
  private defaultViewRef: EmbeddedViewRef<void> | null = null;

  constructor(private viewContainer: ViewContainerRef, private defaultTemplate: TemplateRef<void>) {}

  @Input()
  set nzStringTemplateOutlet(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.isTemplate = true;
      this.inputTemplate = value;
    } else {
      this.isTemplate = false;
    }
    this.updateView();
  }

  updateView(): void {
    if (!this.isTemplate) {
      /** use default template when input is string **/
      if (!this.defaultViewRef) {
        this.viewContainer.clear();
        this.inputViewRef = null;
        if (this.defaultTemplate) {
          this.defaultViewRef = this.viewContainer.createEmbeddedView(this.defaultTemplate);
        }
      }
    } else {
      /** use input template when input is templateRef **/
      if (!this.inputViewRef) {
        this.viewContainer.clear();
        this.defaultViewRef = null;
        if (this.inputTemplate) {
          this.inputViewRef = this.viewContainer.createEmbeddedView(this.inputTemplate);
        }
      }
    }
  }
}
