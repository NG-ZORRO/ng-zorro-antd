import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-layout',
  template: `
    <nz-checkbox-wrapper style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col nzSpan="8"><label nz-checkbox nzValue="A" [ngModel]="true">A</label></div>
        <div nz-col nzSpan="8"><label nz-checkbox nzValue="B">B</label></div>
        <div nz-col nzSpan="8"><label nz-checkbox nzValue="C">C</label></div>
        <div nz-col nzSpan="8"><label nz-checkbox nzValue="D">D</label></div>
        <div nz-col nzSpan="8"><label nz-checkbox nzValue="E">E</label></div>
      </div>
    </nz-checkbox-wrapper>
  `
})
export class NzDemoCheckboxLayoutComponent {
  log(value: string[]): void {
    console.log(value);
  }
}
