import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-time-range',
  template: `
    {{ diff | nzTimeRange: format1 }}
    <br />
    {{ diff | nzTimeRange: format2 }}
    <br />
    {{ diff | nzTimeRange: format3 }}
    <br />
    {{ diff1 | nzTimeRange }}
    <br />
  `
})
export class NzDemoPipesTimeRangeComponent {
  diff = 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  diff1 = 0;
  format1 = 'HH:mm:ss';
  format2 = 'HH:mm';
  format3 = 'D 天 H 时 m 分 s 秒';
}
