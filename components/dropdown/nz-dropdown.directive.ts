import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Directive({
  selector: '[nz-dropdown]'
})
export class NzDropDownDirective {
  el: HTMLElement = this.elementRef.nativeElement;
  hover$: Observable<boolean> = merge(
    fromEvent(this.el, 'mouseenter').pipe(mapTo(true)),
    fromEvent(this.el, 'mouseleave').pipe(mapTo(false))
  );
  $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(tap(e => e.stopPropagation()), mapTo(true));

  setDisabled(disabled: boolean): void {
    if (disabled) {
      this.renderer.setAttribute(this.el, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.el, 'disabled');
    }
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-dropdown-trigger');
  }
}
