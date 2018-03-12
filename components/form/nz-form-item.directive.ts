import { Directive, Renderer2, Input, ElementRef } from '@angular/core';
import { toBoolean } from '../core/util/convert';

@Directive({
  selector: '[nz-form-item]',
  host    : {
    '[class.ant-form-item]'          : 'true',
    '[class.ant-form-item-with-help]': 'withHelp>0'
  }
})
export class NzFormItemDirective {
  private _flex = false;
  withHelp = 0;

  @Input()
  set nzFlex(value: boolean) {
    this._flex = toBoolean(value);
    if (this._flex) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    }
  }

  enableHelp(): void {
    this.withHelp++;
  }

  disableHelp(): void {
    this.withHelp--;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }
}
