import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nz-tr]',
  host    : {
    '[class.ant-table-row]': 'true'
  }
})

export class NzTrDirective {

  @Input()
  set nzExpand(value: boolean) {
    if (value) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-table-expanded-row');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-table-expanded-row');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }
}
