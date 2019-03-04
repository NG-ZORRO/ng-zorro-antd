import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : 'nz-card-loading',
  templateUrl        : './nz-card-loading.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  styles             : [ `
    nz-card-loading {
      display: block;
    }
  ` ]
})
export class NzCardLoadingComponent {
  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-card-loading-content');
  }
}
