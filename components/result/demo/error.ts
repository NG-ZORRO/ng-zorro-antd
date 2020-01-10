import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-error',
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
            <i nz-icon nzType="close-circle"></i>
            Your account has been frozen <a>Thaw immediately &gt;</a>
          </p>
          <p nz-paragraph>
            <i nz-icon nzType="close-circle"></i>
            Your account is not yet eligible to apply <a>Apply immediately &gt;</a>
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
