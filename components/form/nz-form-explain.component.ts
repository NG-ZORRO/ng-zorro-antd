import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { helpMotion } from '../core/animation/help';

@Component({
  selector           : 'nz-form-explain',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  animations         : [ helpMotion ],
  templateUrl        : './nz-form-explain.component.html',
  styles             : [
      `nz-form-explain {
      display: block;
    }`
  ]
})
export class NzFormExplainComponent {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-form-explain');
  }
}
