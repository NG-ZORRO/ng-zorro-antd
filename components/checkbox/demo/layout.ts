import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'nz-demo-checkbox-layout',
  imports: [FormsModule, NzCheckboxModule, NzGridModule],
  template: `
    <nz-checkbox-group [(ngModel)]="value" [style.width.%]="100" (ngModelChange)="log($event)">
      <nz-row>
        <nz-col nzSpan="8">
          <label nz-checkbox nzValue="A">A</label>
        </nz-col>
        <nz-col nzSpan="8">
          <label nz-checkbox nzValue="B">B</label>
        </nz-col>
        <nz-col nzSpan="8">
          <label nz-checkbox nzValue="C">C</label>
        </nz-col>
        <nz-col nzSpan="8">
          <label nz-checkbox nzValue="D">D</label>
        </nz-col>
        <nz-col nzSpan="8">
          <label nz-checkbox nzValue="E">E</label>
        </nz-col>
      </nz-row>
    </nz-checkbox-group>
  `
})
export class NzDemoCheckboxLayoutComponent {
  value = ['A'];

  log(value: string[]): void {
    console.log(value);
  }
}
