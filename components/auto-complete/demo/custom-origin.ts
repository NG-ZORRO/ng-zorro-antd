import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-custom-origin',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <nz-input-wrapper nzAutocompleteOrigin #origin="nzAutocompleteOrigin" nzSuffix="RMB" style="width: 300px">
      <input
        nz-input
        placeholder="input here"
        [(ngModel)]="inputValue"
        [nzAutocomplete]="auto"
        [nzAutocompleteConnectedTo]="origin"
        (input)="onInput($event)"
      />
    </nz-input-wrapper>
    <nz-autocomplete #auto>
      @for (option of options(); track option) {
        <nz-auto-option [nzValue]="option">{{ option }}</nz-auto-option>
      }
    </nz-autocomplete>
  `
})
export class NzDemoAutoCompleteCustomOriginComponent {
  inputValue = '';
  readonly options = signal<string[]>([]);

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options.set(value ? [value, value + value, value + value + value] : []);
  }
}
