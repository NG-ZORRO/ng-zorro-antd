import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckListModule, NzItemProps } from 'ng-zorro-antd/check-list';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-check-list-basic',
  imports: [NzCheckListModule, NzButtonModule, NzWaveDirective, NzModalModule],
  template: `
    <nz-check-list [nzItems]="nzItems" [nzIndex]="index" (nzHideCallback)="hideCancel($event)"></nz-check-list>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="The first Modal" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <p>Content one</p>
        <p>Content two</p>
        <p>Content three</p>
      </ng-container>
      <ng-container *nzModalFooter>
        <button nz-button nzType="default" (click)="handleCancel()">Cancel</button>
        <button nz-button nzType="primary" (click)="handleOk()">Finish</button>
      </ng-container>
    </nz-modal>
  `
})
export class NzDemoCheckListBasicComponent {
  index: number = 1;
  isVisible: boolean = false;
  nzItems: NzItemProps[] = [
    {
      description: '第一步',
      onClick: () => {
        console.log(1);
        this.index++;
      }
    },
    {
      description: '第二步',
      onClick: () => {
        this.isVisible = true;
        this.index++;
      }
    },
    {
      description: '第三步',
      onClick: () => {
        this.index++;
      }
    },
    {
      description: '第四步',
      onClick: () => {
        this.index++;
      }
    }
  ];

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  hideCancel(check: boolean): void {
    console.log(check);
  }
}
