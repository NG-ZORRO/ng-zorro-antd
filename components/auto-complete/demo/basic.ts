import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-basic',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <input
      placeholder="input here"
      nz-input
      [(ngModel)]="inputValue"
      (input)="onInput($event)"
      [nzAutocomplete]="auto"
    />
    <nz-autocomplete [nzDataSource]="option()" nzBackfill #auto />
  `
})
export class NzDemoAutoCompleteBasicComponent {
  inputValue?: string;
  readonly option = signal<string[]>([]);

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.option.set(value ? [value, value + value, value + value + value] : []);
  }
}
