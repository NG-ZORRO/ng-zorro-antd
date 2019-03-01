import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-footer',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-footer.component.html',
  styles             : [
      `nz-footer {
      display: block;
    }`
  ]
})
export class NzFooterComponent {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-footer');
  }
}
