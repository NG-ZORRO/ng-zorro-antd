import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-basic',
  template: `
    <nz-result [nzIcon]="'success'">
      <nz-result-title>
        Successfully Purchased Cloud Server ECS!
      </nz-result-title>
      <nz-result-subtitle>
        Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.
      </nz-result-subtitle>
      <nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
        <button nz-button>Buy Again</button>
      </nz-result-extra>
    </nz-result>
  `
})
export class NzDemoResultBasicComponent {
}
