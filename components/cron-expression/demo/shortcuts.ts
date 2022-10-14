import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-cron-expression-shortcuts',
  template: `
    <nz-cron-expression [defaults]="defaults">
      <button nzCronExpressionExtra nz-button nz-dropdown [nzDropdownMenu]="menu">
        Shortcuts
        <span nz-icon nzType="down"></span>
      </button>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu nzSelectable>
          <li nz-menu-item *ngFor="let item of options" [value]="item.value" (click)="Shortcuts(item.value)">{{
            item.label
          }}</li>
        </ul>
      </nz-dropdown-menu>
    </nz-cron-expression>
  `
})
export class NzDemoCronExpressionShortcutsComponent {
  defaults: string | null = null;
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

  Shortcuts(value: string): void {
    this.defaults = value;
  }
}
