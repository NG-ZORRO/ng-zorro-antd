/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';

import { InputBoolean, toBoolean } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [attr.for]="nzFor"
      [class.ant-form-item-no-colon]="noColon === 'default' ? defaultNoColon : nzNoColon"
      [class.ant-form-item-required]="nzRequired"
    >
      <ng-content></ng-content>
    </label>
  `
})
export class NzFormLabelComponent {
  @Input() nzFor: string;
  @Input() @InputBoolean() nzRequired = false;
  @Input()
  set nzNoColon(value: boolean) {
    this.noColon = toBoolean(value);
  }
  get nzNoColon(): boolean {
    return !!this.noColon;
  }

  defaultNoColon: boolean = false;
  noColon: boolean | string = 'default';

  constructor(elementRef: ElementRef, renderer: Renderer2, private cdr: ChangeDetectorRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
  }

  setDefaultNoColon(value: boolean): void {
    this.defaultNoColon = toBoolean(value);
    this.cdr.markForCheck();
  }
}
