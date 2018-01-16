import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-tabs',
  template: `
    <nz-card style="width: 100%;">
      <ng-template #title>Card title</ng-template>
      <ng-template #extra>
        <a>More</a>
      </ng-template>
      <ng-template #tabs>
        <nz-tabset nzSize="large" [(nzSelectedIndex)]="index1">
          <nz-tab>
            <ng-template #nzTabHeading>tab1</ng-template>
          </nz-tab>
          <nz-tab>
            <ng-template #nzTabHeading>tab2</ng-template>
          </nz-tab>
        </nz-tabset>
      </ng-template>
      <ng-template #body>
        content{{ index1 }}
      </ng-template>
    </nz-card>
    <br>
    <br>
    <nz-card style="width: 100%;">
      <ng-template #tabs>
        <nz-tabset nzSize="large" [(nzSelectedIndex)]="index2">
          <nz-tab>
            <ng-template #nzTabHeading>article</ng-template>
          </nz-tab>
          <nz-tab>
            <ng-template #nzTabHeading>app</ng-template>
          </nz-tab>
          <nz-tab>
            <ng-template #nzTabHeading>project</ng-template>
          </nz-tab>
        </nz-tabset>
      </ng-template>
      <ng-template #body>
        content{{ index2 }}
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardTabsComponent {
  index1 = 0;
  index2 = 0;
}
