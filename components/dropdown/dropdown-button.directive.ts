/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, Host, Optional, Renderer2 } from '@angular/core';
import { NzButtonGroupComponent } from 'ng-zorro-antd/button';

@Directive({
  selector: '[nz-button][nz-dropdown]'
})
export class NzDropdownButtonDirective implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Host() @Optional() private nzButtonGroupComponent: NzButtonGroupComponent,
    private elementRef: ElementRef
  ) {}
  ngAfterViewInit(): void {
    const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
    if (this.nzButtonGroupComponent && parentElement) {
      this.renderer.addClass(parentElement, 'ant-dropdown-button');
    }
  }
}
