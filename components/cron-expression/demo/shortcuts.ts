import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-cron-expression-shortcuts',
  imports: [FormsModule, NzButtonModule, NzCronExpressionModule, NzDropdownModule, NzIconModule],
  template: `
    <nz-cron-expression [nzExtra]="shortcuts" [(ngModel)]="value" (ngModelChange)="getValue($event)" />
    <ng-template #shortcuts>
      <button nz-button nz-dropdown [nzDropdownMenu]="menu">
        Shortcuts
        <nz-icon nzType="down" />
      </button>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu nzSelectable>
          @for (item of options; track item.value) {
            <li nz-menu-item [value]="item.value" (click)="setValue(item.value)">{{ item.label }}</li>
          }
        </ul>
      </nz-dropdown-menu>
    </ng-template>
    <p>cron: {{ cron }} </p>
  `
})
export class NzDemoCronExpressionShortcutsComponent {
  value: string = '1 1 * * *';
  cron: string = '';
  options = [
    {
      label: 'Every hour',
      value: '0 0-23/1 * * *'
    },
    {
      label: 'Every day at eight',
      value: '0 8 * * *'
    },
    {
      label: 'Every Friday',
      value: '0 0 * * 5'
    }
  ];

  setValue(value: string): void {
    this.value = value;
  }

  getValue(value: string): void {
    this.cron = value;
  }
}
