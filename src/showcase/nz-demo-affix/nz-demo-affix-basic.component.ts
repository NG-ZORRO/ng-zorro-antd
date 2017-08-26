import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-affix-basic',
  template: `
  <nz-affix>
    <button nz-button [nzType]="'primary'">
        <span>Affix Button</span>
    </button>
  </nz-affix>
  `
})
export class NzDemoAffixBasicComponent { }
