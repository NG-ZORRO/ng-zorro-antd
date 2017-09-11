import {
  Directive,
  Input,
  HostBinding,
  ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { NzTableComponent } from './nz-table.component';

@Directive({
  selector: '[nz-th]'
})
export class NzThDirective implements OnInit, OnDestroy {
  _el: HTMLElement;
  @Input() nzWidth;
  @Input() @HostBinding(`class.ant-table-selection-column`) nzCheckbox;
  @Input() @HostBinding(`class.ant-table-expand-icon-th`) nzExpand;

  constructor(private _elementRef: ElementRef, private nzTableComponent: NzTableComponent) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit() {
    this.nzTableComponent.ths.push(this);
  }

  ngOnDestroy() {
    const index = this.nzTableComponent.ths.indexOf(this);
    if (index > -1) {
      this.nzTableComponent.ths.splice(index, 1);
    }
  }
}
