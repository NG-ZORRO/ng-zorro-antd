import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-otp',
  template: `
    <nz-flex nzVertical [nzGap]="16">
      <nz-flex nzVertical>
        <h5 nz-typography>With Formatter (Uppercase)</h5>
        <nz-input-otp [ngModel]="'parsa'" (ngModelChange)="log($event)" [nzFormatter]="formatter"></nz-input-otp>
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With Disabled</h5>
        <nz-input-otp [disabled]="true"></nz-input-otp>
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With Length (8)</h5>
        <nz-input-otp [nzLength]="8"></nz-input-otp>
      </nz-flex>

      <nz-flex nzVertical>
        <h5 nz-typography>With custom display character</h5>
        <nz-input-otp [ngModel]="'test'" [nzMask]="'🔒'" (ngModelChange)="log($event)"></nz-input-otp>
      </nz-flex>
    </nz-flex>
  `
})
export class NzDemoInputOtpComponent {
  value?: string;

  formatter: (value: string) => string = value => value.toUpperCase();

  log(value: string): void {
    console.log(value);
  }
}
