import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-basic',
  template: `
    <div class="icons-list">
      <i nz-icon [nzType]="'home'"></i>
      <i nz-icon [nzType]="'setting'" [nzTheme]="'fill'"></i>
      <i nz-icon [nzType]="'smile'" [nzTheme]="'outline'"></i>
      <i nz-icon [nzType]="'sync'" [nzSpin]="true"></i>
      <i nz-icon [nzType]="'smile'" [nzTheme]="'outline'" [nzRotate]="180"></i>
      <!-- Loading with new API would spin automatically! -->
      <i nz-icon [nzType]="'loading'"></i>
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
