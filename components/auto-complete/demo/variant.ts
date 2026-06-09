import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzVariant } from 'ng-zorro-antd/core/types';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-variant',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule, NzFlexModule],
  template: `
    <nz-flex nzVertical nzGap="1rem">
      @for (variant of variants; track variant) {
        <input
          placeholder="input here"
          nz-input
          [(ngModel)]="value"
          (input)="onInput($event)"
          [nzAutocomplete]="auto"
          [nzVariant]="variant"
        />
        <nz-autocomplete [nzDataSource]="options()" nzBackfill #auto />
      }
    </nz-flex>
  `
})
export class NzDemoAutoCompleteVariantComponent {
  value?: string;
  readonly variants: NzVariant[] = ['outlined', 'filled', 'borderless', 'underlined'];
  readonly options = signal<string[]>([]);

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options.set(value ? [value, value + value, value + value + value] : []);
  }
}
