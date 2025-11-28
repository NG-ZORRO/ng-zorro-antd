import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import type { NzVariant } from 'ng-zorro-antd/core/types';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-variant',
  imports: [FormsModule, NzAutocompleteModule, NzInputModule, NzFlexModule],
  template: `
    <section nz-flex nzVertical nzGap="1rem">
      @for (variant of variants(); track variant) {
        <div class="example-input">
          <input
            placeholder="input here"
            nz-input
            [(ngModel)]="inputValue"
            (input)="onInput($event)"
            [nzAutocomplete]="auto"
            [nzVariant]="variant"
          />
          <nz-autocomplete [nzDataSource]="options()" nzBackfill #auto />
        </div>
      }
    </section>
  `
})
export class NzDemoAutoCompleteVariantComponent {
  options = signal<string[]>([]);
  inputValue = model<string>('');
  variants = signal<NzVariant[]>(['outlined', 'filled', 'borderless', 'underlined']);
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options.set(value ? [value, value + value, value + value + value] : []);
  }
}
