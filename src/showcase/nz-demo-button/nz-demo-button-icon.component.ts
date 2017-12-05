import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-button-icon',
  template: `
    <button nz-button [nzType]="'primary'" [nzShape]="'circle'">
      <i class="anticon anticon-search"></i>
    </button>
    <button nz-button [nzType]="'primary'">
      <i class="anticon anticon-search"></i><span>Search</span>
    </button>
    <br>
    <button nz-button [nzType]="'dashed'" [nzShape]="'circle'">
      <i class="anticon anticon-search"></i>
    </button>
    <button nz-button [nzType]="'default'">
      <i class="anticon anticon-search"></i><span>Search</span>
    </button>
  `,
  styles  : []
})
export class NzDemoButtonIconComponent { }
