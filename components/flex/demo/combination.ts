import { Component } from '@angular/core';

import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-flex-combination',
  imports: [NzFlexModule],
  template: `
    <div class="combination-wrapper" nz-flex [nzGap]="80">
      <img
        alt="Angular"
        width="150"
        height="150"
        src="https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg"
      />

      <div nz-flex [nzVertical]="true" nzGap="large">
        <h2> Ant Design of Angular </h2>

        <h3>
          An enterprise-class Angular UI component library based on Ant Design, all components are open source and free
          to use under MIT license.
        </h3>
      </div>
    </div>
  `,
  styles: `
    .combination-wrapper {
      inline-size: 40rem;
      padding: 2rem;
      border: 1px solid #f0f0f0;
      border-radius: 2px;
    }
  `
})
export class NzDemoFlexCombinationComponent {}
