import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSplitterModule } from 'ng-zorro-antd/splitter';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-splitter-control',
  imports: [FormsModule, NzButtonModule, NzFlexModule, NzSplitterModule, NzSwitchModule],
  template: `
    <nz-flex nzGap="middle" nzVertical>
      <nz-splitter (nzResize)="setSizes($event)">
        <nz-splitter-panel [nzSize]="sizes()[0]" [nzResizable]="resizable()">
          <div class="box">First</div>
        </nz-splitter-panel>
        <nz-splitter-panel [nzSize]="sizes()[1]">
          <div class="box">Second</div>
        </nz-splitter-panel>
      </nz-splitter>
      <nz-flex nzJustify="space-between">
        <nz-switch nzCheckedChildren="Enabled" nzUnCheckedChildren="Disabled" [(ngModel)]="resizable"></nz-switch>
        <button nz-button (click)="sizes.set(['50%', '50%'])">Reset</button>
      </nz-flex>
    </nz-flex>
  `,
  styles: `
    nz-splitter {
      height: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
})
export class NzDemoSplitterControlComponent {
  resizable = model(true);
  sizes = signal<Array<number | string>>(['50%', '50%']);

  setSizes(sizes: Array<number | string>): void {
    console.log('output', sizes);
    this.sizes.set(sizes);
  }
}
