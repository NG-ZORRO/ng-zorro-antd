import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-cron-expression-shortcuts',
  template: `
    <nz-cron-expression
      [nzExtra]="shortcuts"
      [(ngModel)]="value"
      (ngModelChange)="getValue($event)"
    ></nz-cron-expression>
    <ng-template #shortcuts>
      <button nz-button nz-dropdown [nzDropdownMenu]="menu">
        Shortcuts
        <span nz-icon nzType="down"></span>
      </button>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu nzSelectable>
          <li nz-menu-item *ngFor="let item of options" [value]="item.value" (click)="setValue(item.value)">{{
            item.label
          }}</li>
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
