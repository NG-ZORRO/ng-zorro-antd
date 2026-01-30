import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-basic',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input
        placeholder="input here"
        nz-input
        [(ngModel)]="inputValue"
        (input)="onInput($event)"
        [nzAutocomplete]="auto"
      />
      <nz-autocomplete [nzDataSource]="options" nzBackfill #auto />
    </div>
  `
})
export class NzDemoAutoCompleteBasicComponent {
  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
