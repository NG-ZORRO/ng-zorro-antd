import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzVariant } from 'ng-zorro-antd/core/types';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-mention-variant',
  imports: [FormsModule, NzInputModule, NzMentionModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="variants" [(ngModel)]="variant" />
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)" [nzVariant]="variant()">
      <textarea rows="1" placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue"></textarea>
    </nz-mention>
  `,
  styles: `
    nz-segmented {
      margin-bottom: 1rem;
    }
  `
})
export class NzDemoMentionVariantComponent {
  inputValue = model('@afc163');
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  variant = model<NzVariant>('outlined');
  variants = [
    { label: 'Outlined', value: 'outlined' },
    { label: 'Filled', value: 'filled' },
    { label: 'Borderless', value: 'borderless' },
    { label: 'Underlined', value: 'underlined' }
  ];

  onSelect(value: string): void {
    console.log(value);
  }
}
