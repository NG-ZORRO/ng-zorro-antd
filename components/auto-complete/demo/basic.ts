import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <input placeholder="input here" nz-input [(ngModel)]="inputValue" (input)="onInput($event.target?.value)" [nzAutocomplete]="auto">
      <nz-autocomplete nzBackfill #auto>
      <nz-auto-option *ngFor="let option of options" [nzValue]="option">
      {{option}}
      </nz-auto-option>
      </nz-autocomplete>
    </div>
`
})
export class NzDemoAutoCompleteBasicComponent {
  inputValue: string;
  options = [];

  onInput(value: string): void {
    this.options = value ? [
      value,
      value + value,
      value + value + value
    ] : [];
  }
}
