import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-disabled',
  template: `
    <button nz-button [nzType]="'primary'">
      <span>Primary</span>
    </button>
    <button nz-button [nzType]="'primary'" disabled>
      <span>Primary(disabled)</span>
    </button>
    <br>
    <button nz-button [nzType]="'default'">
      <span>Default</span>
    </button>
    <button nz-button [nzType]="'default'" disabled>
      <span>Default(disabled)</span>
    </button>
    <br>
    <button nz-button nzGhost>
      <span>Ghost</span>
    </button>
    <button nz-button nzGhost disabled>
      <span>Ghost(disabled)</span>
    </button>
    <br>
    <button nz-button [nzType]="'dashed'">
      <span>Dashed</span>
    </button>
    <button nz-button [nzType]="'dashed'" disabled>
      <span>Dashed(disabled)</span>
    </button>`,
  styles  : []
})
export class NzDemoButtonDisabledComponent { }
