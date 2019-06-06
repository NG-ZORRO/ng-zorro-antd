import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-target',
  template: `
    <div class="scrollable-container" #target>
      <div class="background">
        <nz-affix [nzTarget]="target" id="affix-container-target">
          <button nz-button [nzType]="'primary'">
            <span>Fixed at the top of container</span>
          </button>
        </nz-affix>
      </div>
    </div>
  `,
  styles: [
    `
      .scrollable-container {
        height: 100px;
        overflow-y: scroll;
      }

      .background {
        padding-top: 60px;
        height: 300px;
        background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
      }
    `
  ]
})
export class NzDemoAffixTargetComponent {}
