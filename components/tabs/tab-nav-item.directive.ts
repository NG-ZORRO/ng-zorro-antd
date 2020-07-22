/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusableOption } from '@angular/cdk/a11y/key-manager/focus-key-manager';
import { Directive, ElementRef, Input } from '@angular/core';

import { NzTabComponent } from './tab.component';

@Directive({
  selector: '[nzTabNavItem]'
})
export class NzTabNavItemDirective implements FocusableOption {
  @Input() disabled: boolean = false;
  @Input() tab!: NzTabComponent;
  @Input() active: boolean = false;
  private el!: HTMLElement;
  private parentElement!: HTMLElement;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    this.el = elementRef.nativeElement;
    this.parentElement = this.el.parentElement!;
  }

  focus(): void {
    this.el.focus();
  }

  get width(): number {
    return this.parentElement.offsetWidth;
  }

  get height(): number {
    return this.parentElement.offsetHeight;
  }

  get left(): number {
    return this.parentElement.offsetLeft;
  }

  get top(): number {
    return this.parentElement.offsetTop;
  }
}
