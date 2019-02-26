import { coerceElement } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { InputBoolean } from '../util/convert';

const DISABLED_CLASSNAME = 'nz-animate-disabled';

@Directive({
  selector: '[nzNoAnimation]',
  host    : {
    '[@.disabled]': 'nzNoAnimation'
  }
})
export class NzNoAnimationDirective implements OnChanges, AfterViewInit {

  @Input() @InputBoolean() nzNoAnimation: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(): void {
    this.updateClass();
  }

  ngAfterViewInit(): void {
    this.updateClass();
  }

  private updateClass(): void {
    const element = coerceElement(this.element);
    if (!element) { return; }
    if (this.nzNoAnimation) {
      this.renderer.addClass(element, DISABLED_CLASSNAME);
    } else {
      this.renderer.removeClass(element, DISABLED_CLASSNAME);
    }
  }

}
