import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'a[nz-dropdown]'
})
export class NzDropDownADirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-dropdown-link');
  }
}
