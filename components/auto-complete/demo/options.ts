import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-demo-auto-complete-options',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input placeholder="input here" nz-input [(ngModel)]="inputValue" (input)="onInput($event)" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{ option }}</nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteOptionsComponent {
  inputValue: string;
  options: string[] = [];

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }
}
