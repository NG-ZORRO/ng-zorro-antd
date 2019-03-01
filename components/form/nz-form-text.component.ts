import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-form-text',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-form-text.component.html'
})
export class NzFormTextComponent {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-text');
  }
}
