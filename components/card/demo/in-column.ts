import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-in-column',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <div nz-row [nzGutter]="8">
        <div nz-col [nzSpan]="8">
          <nz-card>
            <ng-template #title>
              Card title
            </ng-template>
            <ng-template #body>
              <p>Card content</p>
            </ng-template>
          </nz-card>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-card>
            <ng-template #title>
              Card title
            </ng-template>
            <ng-template #body>
              <p>Card content</p>
            </ng-template>
          </nz-card>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-card>
            <ng-template #title>
              Card title
            </ng-template>
            <ng-template #body>
              <p>Card content</p>
            </ng-template>
          </nz-card>
        </div>
      </div>

    </div>

  `,
  styles  : []
})
export class NzDemoCardInColumnComponent {
}
