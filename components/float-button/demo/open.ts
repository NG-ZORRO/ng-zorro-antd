import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-float-button-open',
  imports: [FormsModule, NzFloatButtonModule, NzSwitchModule],
  template: `
    <div class="container">
      <nz-float-button-group
        nzIcon="customer-service"
        [nzOpen]="isOpen()"
        nzType="primary"
        nzTrigger="click"
        style="inset-inline-end: 24px"
        (nzOpenChange)="onOpenChange($event)"
      >
        <nz-float-button />
        <nz-float-button nzIcon="comment" />
      </nz-float-button-group>
      <nz-switch [(ngModel)]="isOpen" />
    </div>
  `,
  styles: `
    .container {
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
  readonly isOpen = signal(true);

  onOpenChange(open: boolean): void {
    console.log(open);
  }
}
