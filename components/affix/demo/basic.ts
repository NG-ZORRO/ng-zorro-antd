import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-affix-basic',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-affix>
      <button nz-button [nzType]="'primary'">
        <span>Affix Button</span>
      </button>
    </nz-affix>
  `,
  styles       : [ `
    #components-affix-demo-target .scrollable-container {
      height: 100px;
      overflow-y: scroll;
    }

    #components-affix-demo-target .background {
      padding-top: 60px;
      height: 300px;
      background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
    }
  ` ]
})
export class NzDemoAffixBasicComponent {
}
