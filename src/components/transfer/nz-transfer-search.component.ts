import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nz-transfer-search',
  template: `
    <input nz-input [(ngModel)]="value" (ngModelChange)="_handle()"
        [placeholder]="placeholder" class="ant-transfer-list-search">
    <a *ngIf="value && value.length > 0; else def" class="ant-transfer-list-search-action" (click)="_clear()">
        <i class="anticon anticon-cross-circle"></i>
    </a>
    <ng-template #def><span class="ant-transfer-list-search-action"><i class="anticon anticon-search"></i></span></ng-template>
  `
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
