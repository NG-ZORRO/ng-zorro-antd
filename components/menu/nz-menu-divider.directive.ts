import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nz-menu-divider]'
})
export class NzMenuDividerDirective {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-dropdown-menu-item-divider');
  }
}
