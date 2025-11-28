/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';

import { NzTabComponent } from './tab.component';

@Directive({
  selector: '[nzTabNavItem]'
})
export class NzTabNavItemDirective implements FocusableOption {
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() tab!: NzTabComponent;
  @Input({ transform: booleanAttribute }) active: boolean = false;

  public elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private el: HTMLElement = this.elementRef.nativeElement;
  private parentElement: HTMLElement = this.el.parentElement!;

  focus(): void {
    this.el.focus({ preventScroll: true });
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
