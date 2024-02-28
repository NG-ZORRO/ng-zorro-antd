import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-customize-header',
  template: `
    <div [ngStyle]="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
      <nz-calendar [nzFullscreen]="false" [nzCustomHeader]="customHeader"></nz-calendar>
    </div>

    <ng-template #customHeader>
      <h4 nz-typography>Custom header</h4>
    </ng-template>
  `,
  styles: `
    h3 {
      margin-bottom: 10px;
    }
  `
})
export class NzDemoCalendarCustomizeHeaderComponent {}
