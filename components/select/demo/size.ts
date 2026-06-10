import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';

function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}

@Component({
  selector: 'nz-demo-select-size',
  imports: [FormsModule, NzSelectModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="large">Large</label>
      <label nz-radio-button nzValue="default">Default</label>
      <label nz-radio-button nzValue="small">Small</label>
    </nz-radio-group>
    <br />
    <br />
    <nz-select [nzOptions]="options" [(ngModel)]="singleValue" [nzSize]="size()" />
    <br />
    <br />
    <nz-select [nzOptions]="options" [(ngModel)]="singleValue" [nzSize]="size()" nzShowSearch />
    <br />
    <br />
    <nz-select
      [nzOptions]="options"
      [(ngModel)]="multipleValue"
      [nzSize]="size()"
      nzMode="multiple"
      nzPlaceHolder="Please select"
    />
    <br />
    <br />
    <nz-select
      [nzOptions]="options"
      [(ngModel)]="tagValue"
      [nzSize]="size()"
      nzMode="tags"
      nzPlaceHolder="Please select"
    />
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectSizeComponent {
  readonly options = alphabet().map(item => ({ label: item, value: item }));

  readonly size = signal<NzSelectSizeType>('default');
  readonly singleValue = signal('a10');
  readonly multipleValue = signal(['a10', 'c12']);
  readonly tagValue = signal(['a10', 'c12', 'tag']);
}
