import {
  Directive,
  Input,
  HostBinding,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[nz-th]'
})
export class NzThDirective {
  _el: HTMLElement;
  @Input() @HostBinding(`class.ant-table-selection-column`) nzCheckbox;

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
