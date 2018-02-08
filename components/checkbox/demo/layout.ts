import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-layout',
  template: `
    <nz-checkbox-wrapper style="width: 100%;" (nzOnChange)="log($event)">
      <div nz-row>
        <div nz-col nzSpan="8">
          <label nz-checkbox nzValue="A" [ngModel]="true">
            <span>A</span>
          </label>
        </div>
        <div nz-col nzSpan="8">
          <label nz-checkbox nzValue="B">
            <span>B</span>
          </label>
        </div>
        <div nz-col nzSpan="8">
          <label nz-checkbox nzValue="C">
            <span>C</span>
          </label>
        </div>
        <div nz-col nzSpan="8">
          <label nz-checkbox nzValue="D">
            <span>D</span>
          </label>
        </div>
        <div nz-col nzSpan="8">
          <label nz-checkbox nzValue="E">
            <span>E</span>
          </label>
        </div>
      </div>
    </nz-checkbox-wrapper>
  `,
  styles  : []
})
export class NzDemoCheckboxLayoutComponent {

  log(value: string[]): void {
    console.log(value);
  }
}
