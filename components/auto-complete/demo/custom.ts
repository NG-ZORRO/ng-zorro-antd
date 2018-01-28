import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-custom',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <textarea row="4" nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto"></textarea>
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{option}}</nz-auto-option>
      </nz-autocomplete>
    </div>
`
})
export class NzDemoAutoCompleteCustomComponent {
  inputValue: string;
  options = [];

  onChange(value: string): void {
    this.options = value ? [
      value,
      value + value,
      value + value + value,
    ] : [];
  }
}
