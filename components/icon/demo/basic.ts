import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-basic',
  imports: [NzIconModule],
  template: `
    <div class="icons-list">
      <nz-icon nzType="home" />
      <nz-icon nzType="setting" nzTheme="fill" />
      <nz-icon nzType="smile" nzTheme="outline" />
      <nz-icon nzType="sync" [nzSpin]="true" />
      <nz-icon nzType="smile" nzTheme="outline" [nzRotate]="180" />
      <!-- Loading with new API would spin automatically! -->
      <nz-icon nzType="loading" />
    </div>
  `,
  styles: [
    `
      nz-icon {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoIconBasicComponent {}
