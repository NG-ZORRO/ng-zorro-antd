import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-presuffix',
  template: `
    <nz-input-group>
      <ng-template #prefix>
        <i class="anticon anticon-user"></i>
      </ng-template>
      <input type="text" nz-input placeholder="Enter your username" [(ngModel)]="username">
      <ng-template #suffix>
        <i class="anticon anticon-close-circle" (click)="username=null" *ngIf="username"></i>
      </ng-template>
    </nz-input-group>
  `,
  styles  : [
      `
      .anticon-close-circle {
        cursor: pointer;
        color: #ccc;
        transition: color 0.3s;
        font-size: 12px;
      }

      .anticon-close-circle:hover {
        color: #999;
      }

      .anticon-close-circle:active {
        color: #666;
      }
    `
  ]
})
export class NzDemoInputPresuffixComponent {
  username: string;
}
