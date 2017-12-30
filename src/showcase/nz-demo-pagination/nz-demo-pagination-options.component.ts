import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-options',
  template: `
    <nz-pagination [nzPageSizeOptions]="_options" [nzTotal]="100" nzShowSizeChanger></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationOptionsComponent implements OnInit {
  _options = [ 10, 15, 20, 25 ]

  constructor() {
  }

  ngOnInit() {
  }
}

