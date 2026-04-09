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
        nzTrigger="click"
        style="right: 24px"
        (nzOpenChange)="onOpenChange($event)"
      >
        <nz-float-button />
        <nz-float-button nzIcon="comment" />
      </nz-float-button-group>
      <nz-switch [(ngModel)]="isOpen" />
    </div>
  `,
  styles: `
    .open {
      height: 300px;
      position: relative;
    }
    nz-float-button-group,
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonOpenComponent {
  isOpen: boolean = true;

  onOpenChange(open: boolean): void {
    console.log(open);
    // You can set the `isOpen` variable in `(nzOpenChange)` to control the open state.
    // this.isOpen = open;
  }
}
