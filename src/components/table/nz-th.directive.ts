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
  @Input() nzWidth;
  @Input() @HostBinding(`class.ant-table-selection-column`) nzCheckbox;
  @Input() @HostBinding(`class.ant-table-expand-icon-th`) nzExpand;

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
