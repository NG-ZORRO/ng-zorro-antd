import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-uncertain-category',
  imports: [FormsModule, NzAutocompleteModule, NzFlexModule, NzInputModule],
  template: `
    <nz-input-search nzEnterButton>
      <input
        nz-input
        placeholder="input here"
        nzSize="large"
        [(ngModel)]="value"
        (input)="onChange($event)"
        [nzAutocomplete]="auto"
      />
    </nz-input-search>
    <nz-autocomplete #auto>
      @for (option of options(); track option.category) {
        <nz-auto-option [nzValue]="option.category">
          <nz-flex nzJustify="space-between">
            <span>
              Found {{ option.value }} on
              <a href="https://s.taobao.com/search?q={{ option.value }}" target="_blank" rel="noopener noreferrer">
                {{ option.category }}
              </a>
            </span>
            <span>{{ option.count }} results</span>
          </nz-flex>
        </nz-auto-option>
      }
    </nz-autocomplete>
  `
})
export class NzDemoAutoCompleteUncertainCategoryComponent {
  value?: string;
  readonly options = signal<Array<{ value: string; category: string; count: number }>>([]);

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options.set(
      new Array(this.getRandomInt(5, 15))
        .join('.')
        .split('.')
        .map((_item, idx) => ({
          value,
          category: `${value}${idx}`,
          count: this.getRandomInt(200, 100)
        }))
    );
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
