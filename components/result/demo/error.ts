import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-result-error',
  imports: [NzButtonModule, NzIconModule, NzResultModule, NzTypographyModule],
  template: `
    <nz-result
      nzTitle="Submission Failed"
      nzStatus="error"
      nzSubTitle="Please check and modify the following information before resubmitting."
    >
      <div nz-result-content>
        <div class="desc">
          <h4 nz-title>The content you submitted has the following error:</h4>
          <p nz-paragraph>
            <nz-icon nzType="close-circle" />
            Your account has been frozen
            <a>Thaw immediately &gt;</a>
          </p>
          <p nz-paragraph>
            <nz-icon nzType="close-circle" />
            Your account is not yet eligible to apply
            <a>Apply immediately &gt;</a>
          </p>
        </div>
      </div>
      <div nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
        <button nz-button>Buy Again</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultErrorComponent {}
