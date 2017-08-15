import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-card-inner',
  template: `
    <nz-card [nzNoHovering]="true">
      <ng-template #title>卡片标题</ng-template>
      <ng-template #body>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
        <div nz-card-grid [ngStyle]="gridStyle">卡片内容</div>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardInnerComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  ngOnInit() {
  }
}
