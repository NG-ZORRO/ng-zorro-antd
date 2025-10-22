import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'nz-demo-timeline-pending',
  imports: [NzButtonModule, NzTimelineModule],
  template: `
    <nz-timeline nzPending="Recording..." [nzReverse]="reverse">
      <nz-timeline-item>Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
    </nz-timeline>
    <br />
    <br />
    <button nz-button nzType="primary" (click)="toggleReverse()">Toggle Reverse</button>
  `
})
export class NzDemoTimelinePendingComponent {
  reverse = false;

  toggleReverse(): void {
    this.reverse = !this.reverse;
  }
}
