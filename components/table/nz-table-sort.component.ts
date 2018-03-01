import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector           : 'nz-table-sort',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-table-column-sorter">
      <span
        class="ant-table-column-sorter-up"
        [class.on]="nzValue == 'ascend'"
        [class.off]="nzValue != 'ascend'"
        title="↑"
        (click)="setValue('ascend')">
        <i class="anticon anticon-caret-up"></i>
      </span>
      <span
        class="ant-table-column-sorter-down"
        [class.on]="nzValue == 'descend'"
        [class.off]="nzValue != 'descend'"
        title="↓"
        (click)="setValue('descend')">
        <i class="anticon anticon-caret-down"></i>
      </span>
    </div>
  `
})
export class NzTableSortComponent {
  @Input() nzValue: string = null;
  @Output() nzValueChange: EventEmitter<string> = new EventEmitter();

  setValue(value: string): void {
    if (this.nzValue === value) {
      this.nzValue = null;
    } else {
      this.nzValue = value;
    }
    this.nzValueChange.emit(this.nzValue);
  }
}
