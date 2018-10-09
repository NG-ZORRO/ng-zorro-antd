import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-basic',
  template: `
    <div class="icons-list">
      <i nz-icon [type]="'home'"></i>
      <i nz-icon [type]="'setting'" [theme]="'fill'"></i>
      <i nz-icon [type]="'smile'" [theme]="'outline'"></i>
      <i nz-icon [type]="'sync'" [spin]="true"></i>
      <i nz-icon [type]="'loading'"></i>
      <br><br>
      <i class="anticon anticon-home"></i>
      <i class="anticon anticon-setting"></i>
      <i class="anticon anticon-smile"></i>
      <i class="anticon anticon-sync anticon-spin"></i>
      <i class="anticon anticon-loading"></i>
    </div>
  `,
  styles: [ `
    .icons-list > .anticon {
      margin-right: 6px;
      font-size: 24px;
    }
  `]
})
export class NzDemoIconBasicComponent {
}
