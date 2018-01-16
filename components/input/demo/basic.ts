import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-basic',
  template: `
    <div class="example-input">
      <input nz-input [(ngModel)]="inputValue" placeholder="basic usage" (ngModelChange)="_console($event)">
      <input nz-input [(ngModel)]="inputValue" placeholder="disabled" (ngModelChange)="_console($event)" disabled>
      <input nz-input [(ngModel)]="inputValue" placeholder="readonly" (ngModelChange)="_console($event)" readonly>
    </div>
  `,

  styles: [
      `
      .example-input .ant-input {
        width: 200px;
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class NzDemoInputBasicComponent {
  inputValue: string;

  _console(value: string): void {
    console.log(value);
  }
}
