import { Component } from '@angular/core';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-customize-header',
  imports: [NzCalendarModule],
  template: `
    <div class="card">
      <nz-calendar [nzFullscreen]="false" [nzCustomHeader]="customHeader" />
    </div>

    <ng-template #customHeader>
      <div style="padding: 8px">
        <h4>Custom header</h4>
      </div>
    </ng-template>
  `,
  styles: `
    .card {
      width: 300px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  `
})
export class NzDemoCalendarCustomizeHeaderComponent {}
