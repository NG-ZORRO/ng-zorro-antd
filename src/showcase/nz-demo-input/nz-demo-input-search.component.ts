import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-input-search',
  template: `
    <nz-input [nzType]="'search'" [nzPlaceHolder]="'input search text'" [(ngModel)]="_value" style="width: 200px;"></nz-input>
  `,

  styles: []
})
export class NzDemoInputSearchComponent implements OnInit {
  _value: string;

  constructor() {
  }

  ngOnInit() {
  }
}

