import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector           : '[nz-transfer-search]',
  preserveWhitespaces: false,
  templateUrl        : './nz-transfer-search.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzTransferSearchComponent implements OnChanges {

  // region: fields

  @Input() placeholder: string;
  @Input() value: string;
  @Input() disabled: boolean;

  @Output() readonly valueChanged = new EventEmitter<string>();
  @Output() readonly valueClear = new EventEmitter();

  // endregion

  constructor(private cdr: ChangeDetectorRef) {}

  _handle(): void {
    this.valueChanged.emit(this.value);
  }

  _clear(): void {
    if (this.disabled) {
      return ;
    }
    this.value = '';
    this.valueClear.emit();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }

}
