import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-timeline-color',
  template: `
    <nz-timeline>
      <nz-timeline-item [nzColor]="'green'">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'green'">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'red'">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>`,
  styles: []
})
export class NzDemoTimelineColorComponent { }
