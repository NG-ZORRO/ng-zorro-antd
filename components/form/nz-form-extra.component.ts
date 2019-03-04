import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-form-extra',
  templateUrl        : './nz-form-extra.component.html',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  styles             : [
      `
      nz-form-extra {
        display: block;
      }
    `
  ]
})
export class NzFormExtraComponent {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-extra');
  }
}
