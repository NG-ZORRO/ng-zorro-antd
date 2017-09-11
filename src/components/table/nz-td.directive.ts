import {
  Directive,
  Input,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[nz-td]'
})
export class NzTdDirective {
  _el: HTMLElement;
  @Input() @HostBinding(`class.ant-table-selection-column`) nzCheckbox;
  @Input() @HostBinding(`class.ant-table-row-expand-icon-cell`) nzExpand;

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
