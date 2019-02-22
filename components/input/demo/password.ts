import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-password',
  template: `
    <nz-input-group nzPassword>
      <input type="password" nz-input placeholder="Input password" [(ngModel)]="value">
    </nz-input-group>
  `
})
export class NzDemoInputPasswordComponent {
  value: string;
}
