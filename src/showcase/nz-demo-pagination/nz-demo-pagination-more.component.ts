import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-pagination-more',
  template: `
    <nz-pagination [nzPageIndex]="1" [nzTotal]="500"></nz-pagination>`,
  styles  : []
})
export class NzDemoPaginationMoreComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

