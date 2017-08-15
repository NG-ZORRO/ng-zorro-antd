import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-button-ghost',
  template: `
    <div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
      <button nz-button [nzType]="'primary'" [nzGhost]="true">
        <span>Primary</span>
      </button>
      <button nz-button [nzType]="'default'" [nzGhost]="true">
        <span>Default</span>
      </button>
      <button nz-button [nzType]="'dashed'" [nzGhost]="true">
        <span>Dashed</span>
      </button>
      <button nz-button [nzType]="'danger'" [nzGhost]="true">
        <span>Danger</span>
      </button>
    </div>
  `,
  styles  : []
})
export class NzDemoButtonGhostComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

