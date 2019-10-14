import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-on-change',
  template: `
    <nz-affix [nzOffsetTop]="120" (nzChange)="onChange($event)">
      <button nz-button>
        <span>120px to affix top</span>
      </button>
    </nz-affix>
  `
})
export class NzDemoAffixOnChangeComponent {
  onChange(status: boolean): void {
    console.log(status);
  }
}
