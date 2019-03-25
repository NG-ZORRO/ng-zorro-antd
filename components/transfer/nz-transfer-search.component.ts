import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[nz-transfer-search]',
  preserveWhitespaces: false,
  templateUrl: './nz-transfer-search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTransferSearchComponent implements OnChanges {
  // region: fields

  @Input() placeholder: string;
  @Input() value: string;
  @Input() disabled: boolean;

  @Output() readonly valueChanged = new EventEmitter<string>();
  @Output() readonly valueClear = new EventEmitter<void>();

  // endregion

  constructor(private cdr: ChangeDetectorRef) {}

  _handle(): void {
    this.valueChanged.emit(this.value);
  }

  _clear(): void {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.valueClear.emit();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}
