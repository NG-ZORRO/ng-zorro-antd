import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  standalone: true,
  selector: 'nz-demo-auto-complete-uncertain-category',
  imports: [FormsModule, NzAutocompleteModule, NzButtonModule, NzIconModule, NzInputModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-input-group nzSearch nzSize="large" [nzAddOnAfter]="suffixIconButton">
      <input
        placeholder="input here"
        nz-input
        [(ngModel)]="inputValue"
        (input)="onChange($event)"
        [nzAutocomplete]="auto"
      />
    </nz-input-group>
    <ng-template #suffixIconButton>
      <button nz-button nzType="primary" nzSize="large" nzSearch>
        <span nz-icon nzType="search" nzTheme="outline"></span>
      </button>
    </ng-template>
    <nz-autocomplete #auto>
      @for (option of options; track option.category) {
        <nz-auto-option class="search-item" [nzValue]="option.category">
          Found {{ option.value }} on
          <a
            class="search-item-desc"
            [href]="'https://s.taobao.com/search?q=' + option.value"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ option.category }}
          </a>
          <span class="search-item-count">{{ option.count }} results</span>
        </nz-auto-option>
      }
    </nz-autocomplete>
  `,
  styles: [
    `
      .search-item {
        display: flex;
      }

      .search-item-desc {
        flex: auto;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .search-item-count {
        flex: none;
      }
    `
  ]
})
export class NzDemoAutoCompleteUncertainCategoryComponent {
  inputValue?: string;
  options: Array<{ value: string; category: string; count: number }> = [];

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5, 15))
      .join('.')
      .split('.')
      .map((_item, idx) => ({
        value,
        category: `${value}${idx}`,
        count: this.getRandomInt(200, 100)
      }));
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
