import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-coordinate',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select [(ngModel)]="selectedProvince" (ngModelChange)="provinceChange($event)">
      @for (p of provinceData; track p) {
        <nz-option [nzValue]="p" [nzLabel]="p" />
      }
    </nz-select>
    <nz-select [(ngModel)]="selectedCity">
      @for (c of cityData[selectedProvince]; track c) {
        <nz-option [nzValue]="c" [nzLabel]="c" />
      }
    </nz-select>
  `,
  styles: `
    nz-select {
      margin-right: 8px;
      width: 120px;
    }
  `
})
export class NzDemoSelectCoordinateComponent {
  selectedProvince = 'Zhejiang';
  selectedCity = 'Hangzhou';
  provinceData = ['Zhejiang', 'Jiangsu'];
  cityData: { [place: string]: string[] } = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
  };

  provinceChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
  }
}
