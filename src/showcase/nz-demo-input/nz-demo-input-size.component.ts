import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-size',
  template: `
    <div>
      <nz-input [(ngModel)]="inputValue" [nzPlaceHolder]="'large size'" [nzSize]="'large'"></nz-input>
      <nz-input [(ngModel)]="inputValue" [nzPlaceHolder]="'default size'"></nz-input>
      <nz-input [(ngModel)]="inputValue" [nzPlaceHolder]="'small size'" [nzSize]="'small'"></nz-input>
    </div>`,

  styles: [
      `
      nz-input {
        width: 200px;
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class NzDemoInputSizeComponent {
  inputValue: string;
}
