import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-coordinate',
  template: `
    <div>
      <nz-select [(ngModel)]="selectedProvince" (ngModelChange)="provinceChange($event)">
        @for (p of provinceData; track p) {
          <nz-option [nzValue]="p" [nzLabel]="p"></nz-option>
        }
      </nz-select>
      <nz-select [(ngModel)]="selectedCity">
        @for (c of cityData[selectedProvince]; track c) {
          <nz-option [nzValue]="c" [nzLabel]="c"></nz-option>
        }
      </nz-select>
    </div>
  `,
  styles: [
    `
      nz-select {
        margin-right: 8px;
        width: 120px;
      }
    `
  ]
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
