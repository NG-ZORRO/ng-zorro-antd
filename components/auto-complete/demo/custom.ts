import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-custom',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <textarea
        placeholder="input here"
        nz-input
        rows="4"
        [(ngModel)]="inputValue"
        (input)="onInput($event)"
        [nzAutocomplete]="auto"
      ></textarea>
      <nz-autocomplete #auto>
        @for (option of options; track $index) {
          <nz-auto-option [nzValue]="option">{{ option }}</nz-auto-option>
        }
      </nz-autocomplete>
    </div>
  `
})
export class NzDemoAutoCompleteCustomComponent {
  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
