import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-back-top-target',
  template: `
    Scroll down to see the bottom-right
    <strong> gray </strong>
    button.
    <div class="long-div" #divTarget>
      <div class="long-div-inner"></div>
      <nz-back-top [nzTarget]="divTarget"></nz-back-top>
    </div>
  `,
  styles  : [ `
    .long-div {
      height: 300px;
      overflow-y: scroll;
      background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
    }

    .long-div-inner {
      height: 1500px;
    }

    nz-back-top {
      right: 150px;
    }

    strong {
      color: rgba(64, 64, 64, 0.6);
    }
  ` ]
})
export class NzDemoBackTopTargetComponent {
}
