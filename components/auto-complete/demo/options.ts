import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-options',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <input placeholder="input here" nz-input [(ngModel)]="value" (input)="onInput($event)" [nzAutocomplete]="auto" />
    <nz-autocomplete #auto>
      @for (option of options(); track $index) {
        <nz-auto-option [nzValue]="option">{{ option }}</nz-auto-option>
      }
    </nz-autocomplete>
  `
})
export class NzDemoAutoCompleteOptionsComponent {
  value?: string;
  readonly options = signal<string[]>([]);

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options.set([]);
    } else {
      this.options.set(['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`));
    }
  }
}
