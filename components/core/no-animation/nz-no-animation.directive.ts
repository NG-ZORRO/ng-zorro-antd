import { coerceElement } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Inject, Input, OnChanges, Optional, Renderer2 } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { InputBoolean } from '../util/convert';

const DISABLED_CLASSNAME = 'nz-animate-disabled';

@Directive({
  selector: '[nzNoAnimation]',
  host: {
    '[@.disabled]': 'nzNoAnimation'
  }
})
export class NzNoAnimationDirective implements OnChanges, AfterViewInit {
  @Input() @InputBoolean() nzNoAnimation: boolean = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) {}

  ngOnChanges(): void {
    this.updateClass();
  }

  ngAfterViewInit(): void {
    this.updateClass();
  }

  private updateClass(): void {
    const element = coerceElement(this.element);
    if (!element) {
      return;
    }
    if (this.nzNoAnimation || this.animationType === 'NoopAnimations') {
      this.renderer.addClass(element, DISABLED_CLASSNAME);
    } else {
      this.renderer.removeClass(element, DISABLED_CLASSNAME);
    }
  }
}
