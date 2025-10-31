import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-search-input',
  imports: [FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-search (nzSearch)="onSearch($event)">
      <input nz-input [(ngModel)]="value" placeholder="input search text" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search nzAllowClear (nzSearch)="onSearch($event)">
      <input nz-input [(ngModel)]="value" placeholder="input search text" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search (nzSearch)="onSearch($event)">
      <span nzInputAddonBefore>https://</span>
      <input nz-input [(ngModel)]="value" placeholder="input search text" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search nzEnterButton="Submit" (nzSearch)="onSearch($event)">
      <input nz-input [(ngModel)]="value" placeholder="input search text" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search nzEnterButton="Submit" (nzSearch)="onSearch($event)">
      <input nz-input [(ngModel)]="value" placeholder="input search text" nzSize="large" />
    </nz-input-search>
    <br />
    <br />
    <nz-input-search (nzSearch)="onSearch($event)">
      <input nz-input [(ngModel)]="value" placeholder="input search text" nzSize="large" />
      <nz-icon nzInputSuffix nzType="audio" [style.font-size.px]="16" [style.color]="'#1677ff'" />
      <span nzInputSearchEnterButton>Custom</span>
    </nz-input-search>
  `
})
export class NzDemoInputSearchInputComponent {
  readonly value = signal('');

  onSearch(event: NzInputSearchEvent): void {
    console.log(event);
  }
}
