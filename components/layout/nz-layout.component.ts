import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-layout',
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  templateUrl        : './nz-layout.component.html'
})
export class NzLayoutComponent {

  destroySider(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'ant-layout-has-sider');
  }

  initSider(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-layout-has-sider');
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-layout');
  }
}
