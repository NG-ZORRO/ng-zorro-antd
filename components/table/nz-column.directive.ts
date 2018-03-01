import {
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

import { isNotNil } from '../core/util/check';

@Directive({
  selector: '[nz-column]'
})
export class NzColumnDirective {
  _width: string;

  @Input()
  set nzWidth(value: string) {
    if (isNotNil(value)) {
      this._width = value;
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', value);
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', value);
    }
  }

  get nzWidth(): string {
    return this._width;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
}
