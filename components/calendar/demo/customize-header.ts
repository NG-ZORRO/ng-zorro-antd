import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-customize-header',
  template: `
    <div [ngStyle]="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <nz-calendar [nzFullscreen]="false" [nzCustomHeader]="customHeader"></nz-calendar>
    </div>

    <ng-template #customHeader>
      <div style="padding: 8px">
        <h4>Custom header</h4>
      </div>
    </ng-template>
  `
})
export class NzDemoCalendarCustomizeHeaderComponent {}
