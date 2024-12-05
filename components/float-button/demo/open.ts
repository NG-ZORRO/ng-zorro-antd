import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-float-button-open',
  imports: [FormsModule, NzFloatButtonModule, NzIconModule, NzSwitchModule],
  template: `
    <div class="open">
      <nz-float-button-group [nzIcon]="icon" [nzOpen]="isOpen" nzType="primary" nzTrigger="hover" style="right: 24px">
        <nz-float-button></nz-float-button>
        <nz-float-button [nzIcon]="inner"></nz-float-button>
      </nz-float-button-group>
      <nz-switch [(ngModel)]="isOpen"></nz-switch>
      <ng-template #icon>
        <nz-icon nzType="customer-service" nzTheme="outline"></nz-icon>
      </ng-template>
      <ng-template #inner>
        <nz-icon nzType="comment" nzTheme="outline"></nz-icon>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .open {
        height: 300px;
        position: relative;
      }
      nz-float-button-group,
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonOpenComponent {
  isOpen: boolean = true;
}
