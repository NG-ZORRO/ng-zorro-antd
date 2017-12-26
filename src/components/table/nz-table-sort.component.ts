import {
  Component,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  Renderer2,
  ViewEncapsulation,
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
export class NzTableSortComponent {
  _value: string = null;
  @Output() nzValueChange: EventEmitter<string> = new EventEmitter();

  @Input()
  get nzValue(): string {
    return this._value;
  }

  set nzValue(value: string) {
    this._value = value;
    if (this.nzThDirective) {
      if ((this._value !== 'ascend') && (this._value !== 'descend')) {
        this._renderer.removeClass(this.nzThDirective._el, 'ant-table-column-sort');
      } else {
        this._renderer.addClass(this.nzThDirective._el, 'ant-table-column-sort');
      }
    }
  }

  _setValue(value: string): void {
    if (this.nzValue === value) {
      this.nzValue = null;
    } else {
      this.nzValue = value;
    }
    this.nzValueChange.emit(this.nzValue);
  }

  constructor(@Host() @Optional() private nzThDirective: NzThDirective, private _renderer: Renderer2) {
  }
}
