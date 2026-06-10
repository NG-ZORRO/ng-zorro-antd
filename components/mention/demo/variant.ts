import { Component, signal } from '@angular/core';
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
    <br />
    <br />
    <nz-mention [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)" [nzVariant]="variant()">
      <textarea rows="1" placeholder="input here" nzMentionTrigger nz-input [(ngModel)]="inputValue"></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionVariantComponent {
  readonly inputValue = signal('@afc163');
  readonly suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  readonly variant = signal<NzVariant>('outlined');
  readonly variants = [
    { label: 'Outlined', value: 'outlined' },
    { label: 'Filled', value: 'filled' },
    { label: 'Borderless', value: 'borderless' },
    { label: 'Underlined', value: 'underlined' }
  ];

  onSelect(value: string): void {
    console.log(value);
  }
}
