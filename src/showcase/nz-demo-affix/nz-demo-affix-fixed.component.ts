import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-fixed',
  template: `
  <nz-affix [nzOffsetTop]="120" (nzChange)="onChange($event)">
    <button nz-button>
        <span>120px to affix top</span>
    </button>
  </nz-affix>
  `
})
export class NzDemoAffixFixedComponent {
  onChange(status: boolean) {
    console.log(status);
  }
}
