import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-complex',
  template: `
    <nz-result
      nzIcon="error"
      nzTitle="Submission Failed"
      nzSubtitle="Please check and modify the following information before resubmitting.">
      <div nz-result-content>
        <div class="desc">
          <span>
            <i nz-icon type="close-circle"></i>
            Your account has been frozen <a>Thaw immediately &gt;</a>
          </span>
          <span>
            <i nz-icon type="close-circle"></i>
            Your account is not yet eligible to apply <a>Apply immediately &gt;</a>
          </span>
        </div>
      </div>
      <nz-result-extra>
        <button nz-button nzType="primary">Go Console</button>
        <button nz-button>Buy Again</button>
      </nz-result-extra>
    </nz-result>
  `,
  styles: [
    `.ant-result .ant-result-content p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 1.5;
    }
    .ant-result .ant-result-content .desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.4;
    }
    .ant-result .ant-result-content .desc span {
      display: block;
      margin: 16px 0;
    }
    .ant-result .ant-result-content .desc i {
      color: red;
      margin-right: 8px;
      vertical-align: top;
      display: inline-block;
      margin-top: 3px;
    }
    #components-result-demo-complex .ant-result .ant-result-content .desc a {
      margin-left: 16px;
    }`
  ]
})
export class NzDemoResultComplexComponent {
}
