import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-resizable-basic',
  template: `
    <div
      class="box"
      nz-resizable
      [nzMaxWidth]="600"
      [nzMinWidth]="80"
      [nzMaxHeight]="200"
      [nzMinHeight]="80"
      [style.height.px]="height"
      [style.width.px]="width"
      (nzResize)="onResize($event)"
    >
      <nz-resize-handles></nz-resize-handles>
      content
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 200px;
      }
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
        border: 1px solid #ddd;
      }
    `
  ]
})
export class NzDemoResizableBasicComponent {
  width = 400;
  height = 200;
  id = -1;

  onResize({ width, height }: { width: number; height: number }): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width;
      this.height = height;
    });
  }
}
