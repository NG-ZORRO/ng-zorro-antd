import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-float-button-open',
  imports: [FormsModule, NzFloatButtonModule, NzSwitchModule],
  template: `
    <div class="open">
      <nz-float-button-group
        nzIcon="customer-service"
        [nzOpen]="isOpen"
        nzType="primary"
        nzTrigger="hover"
        style="right: 24px"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button nzIcon="comment"></nz-float-button>
      </nz-float-button-group>
      <nz-switch [(ngModel)]="isOpen"></nz-switch>
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
