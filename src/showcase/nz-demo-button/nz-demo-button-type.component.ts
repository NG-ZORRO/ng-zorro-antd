import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-type',
  template: `
    <button nz-button [nzType]="'primary'">
      <span>Primary</span>
    </button>
    <button nz-button [nzType]="'default'">
      <span>Default</span>
    </button>
    <button nz-button [nzType]="'dashed'">
      <span>Dashed</span>
    </button>
    <button nz-button [nzType]="'danger'">
      <span>Danger</span>
    </button>`,
  styles  : []
})
export class NzDemoButtonTypeComponent { }
