import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector           : '[nz-transfer-search]',
  preserveWhitespaces: false,
  templateUrl        : './nz-transfer-search.component.html'
})
export class NzTransferSearchComponent {

  // region: fields

  @Input() placeholder: string;
  @Input() value: string;

  @Output() valueChanged = new EventEmitter<string>();
  @Output() valueClear = new EventEmitter();

  // endregion

  _handle(): void {
    this.valueChanged.emit(this.value);
  }

  _clear(): void {
    this.value = '';
    this.valueClear.emit();
  }

}
