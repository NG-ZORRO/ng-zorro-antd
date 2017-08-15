import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  Host,
  Optional,
  EventEmitter, OnInit, Renderer2
} from '@angular/core';
import { NzThDirective } from './nz-th.directive';

@Component({
  selector     : 'nz-table-sort',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-table-column-sorter">
      <span class="ant-table-column-sorter-up" [ngClass]="{'on':_value == 'ascend'}" title="↑" (click)="_setValue('ascend')">
        <i class="anticon anticon-caret-up"></i>
      </span>
      <span class="ant-table-column-sorter-down" [ngClass]="{'on':_value == 'descend'}" title="↓" (click)="_setValue('descend')">
        <i class="anticon anticon-caret-down"></i>
      </span>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzTableSortComponent implements OnInit {
  _value = null;
  @Output() nzValueChange: EventEmitter<any> = new EventEmitter();

  @Input()
  get nzValue() {
    return this._value;
  }

  set nzValue(value) {
    this._value = value;
    if ((this._value !== 'ascend') && (this._value !== 'descend')) {
      if (this.nzThDirective) {
        this._renderer.removeClass(this.nzThDirective._el, 'ant-table-column-sort');
      }
    }
  }

  _setValue(value) {
    if (this.nzValue === value) {
      this.nzValue = null;
      if (this.nzThDirective) {
        this._renderer.removeClass(this.nzThDirective._el, 'ant-table-column-sort');
      }
    } else {
      this.nzValue = value;
      if (this.nzThDirective) {
        this._renderer.addClass(this.nzThDirective._el, 'ant-table-column-sort');
      }
    }
    this.nzValueChange.emit(this.nzValue);
  }

  constructor(@Host() @Optional() private nzThDirective: NzThDirective, private _renderer: Renderer2) {
  }

  ngOnInit() {
  }
}
