import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipe-safe-null',
  template: `
    <ul>
      <li>使用量：{{ 1000 | nzSafeNull }}</li>
      <li>比例：34/{{ null | nzSafeNull: '-' }}</li>
    </ul>
  `
})
export class NzDemoPipeSafeNullComponent {}
