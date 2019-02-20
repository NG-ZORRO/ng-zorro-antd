import {
  Directive, ElementRef,
  Input,
  Optional, Renderer2,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { NzSizeLDSType } from '../core/types/size';
import { toBoolean } from '../core/util/convert';

@Directive({
  selector: '[nz-input]',
  host    : {
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-lg]'      : `nzSize === 'large'`,
    '[class.ant-input-sm]'      : `nzSize === 'small'`
  }
})
export class NzInputDirective {
  private _disabled = false;
  @Input() nzSize: NzSizeLDSType = 'default';

  @Input()
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  constructor(@Optional() @Self() public ngControl: NgControl, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-input');
  }
}
