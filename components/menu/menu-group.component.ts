/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[nz-menu-group]',
  exportAs: 'nzMenuGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-menu-item-group-title" #titleElement>
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  preserveWhitespaces: false
})
export class NzMenuGroupComponent implements AfterViewInit {
  @Input() nzTitle: string | TemplateRef<void>;
  @ViewChild('titleElement') titleElement: ElementRef;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-menu-item-group');
  }
  ngAfterViewInit(): void {
    const ulElement = this.renderer.nextSibling(this.titleElement.nativeElement);
    if (ulElement) {
      /** add classname to ul **/
      this.renderer.addClass(ulElement, 'ant-menu-item-group-list');
    }
  }
}
