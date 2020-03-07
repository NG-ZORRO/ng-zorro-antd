/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * A patch directive to select the element of a component.
 *
 * @ref https://stackoverflow.com/questions/42183472/access-dom-element-with-template-reference-variables-on-component
 */
@Directive({
  selector: '[nz-element]',
  exportAs: 'nzElement'
})
export class NzElementPatchDirective implements OnInit {
  @Output() readonly elementChange = new EventEmitter<HTMLElement | undefined>();

  constructor(public elementRef: ElementRef) {
    this.elementChange.next(undefined);
  }

  @Input()
  get element(): HTMLElement | undefined {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.elementChange.next(this.elementRef.nativeElement);
  }
}
