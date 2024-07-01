import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-basic',
  template: `
    <div class="icons-list">
      <span nz-icon [nzType]="'home'"></span>
      <span nz-icon [nzType]="'setting'" [nzTheme]="'fill'"></span>
      <span nz-icon [nzType]="'smile'" [nzTheme]="'outline'"></span>
      <span nz-icon [nzType]="'sync'" [nzSpin]="true"></span>
      <span nz-icon [nzType]="'smile'" [nzTheme]="'outline'" [nzRotate]="180"></span>
      <!-- Loading with new API would spin automatically! -->
      <span nz-icon [nzType]="'loading'"></span>
    </div>
  `,
  styles: [
    `
      [nz-icon] {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoIconBasicComponent {}
