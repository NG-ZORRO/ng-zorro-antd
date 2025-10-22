import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'nz-demo-result-success',
  imports: [NzButtonModule, NzResultModule],
  template: `
    <nz-result
      nzStatus="success"
      nzTitle="Successfully Purchased Cloud Server ECS!"
      nzSubTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <div nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
        <button nz-button>Buy Again</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultSuccessComponent {}
