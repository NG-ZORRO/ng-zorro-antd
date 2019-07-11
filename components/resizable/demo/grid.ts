import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-resizable-grid',
  template: `
    <div nz-row>
      <div
        class="col"
        nz-col
        nz-resizable
        (nzResize)="onResize($event)"
        [nzMinColumn]="3"
        [nzMaxColumn]="20"
        [nzGridColumnCount]="24"
        [nzSpan]="basicCol"
      >
        <nz-resize-handles [nzDirections]="['right']"></nz-resize-handles>
        col-{{ basicCol }}
      </div>
      <div class="col right" nz-col [nzSpan]="24 - basicCol">col-{{ 24 - basicCol }}</div>
    </div>
  `,
  styles: [
    `
      .col {
        padding: 16px 0;
        text-align: center;
        border-radius: 0;
        min-height: 30px;
        margin-top: 8px;
        margin-bottom: 8px;
        background: rgba(0, 160, 233, 0.7);
        color: #fff;
      }

      .col.right {
        background: #00a0e9;
      }
    `
  ]
})
export class NzDemoResizableGridComponent {
  basicCol = 8;
  id = -1;

  onResize({ col }: { col: number }): void {
    this.id = requestAnimationFrame(() => {
      this.basicCol = col;
    });
  }
}
