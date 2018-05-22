import { Component } from '@angular/core';

@Component({
  selector: 'nz-card-loading',
  template: `
    <p class="ant-card-loading-block" style="width: 94%;"></p>
    <p>
      <span class="ant-card-loading-block" style="width: 28%;"></span><span class="ant-card-loading-block" style="width: 62%;"></span>
    </p>
    <p>
      <span class="ant-card-loading-block" style="width: 22%;"></span><span class="ant-card-loading-block" style="width: 66%;"></span>
    </p>
    <p>
      <span class="ant-card-loading-block" style="width: 56%;"></span><span class="ant-card-loading-block" style="width: 39%;"></span>
    </p>
    <p>
      <span class="ant-card-loading-block" style="width: 21%;"></span><span class="ant-card-loading-block" style="width: 15%;"></span><span class="ant-card-loading-block" style="width: 40%;"></span>
    </p>
  `,
  host    : {
    '[class.ant-card-loading-content]': 'true'
  },
  styles  : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzCardLoadingComponent {

}
