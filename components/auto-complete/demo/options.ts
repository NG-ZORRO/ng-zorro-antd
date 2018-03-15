import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-options',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <input placeholder="input here" nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto">
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{option}}</nz-auto-option>
      </nz-autocomplete>
    </div>
`
})
export class NzDemoAutoCompleteOptionsComponent {
  inputValue: string;
  options = [];

  onChange(value: string): void {
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }
}
