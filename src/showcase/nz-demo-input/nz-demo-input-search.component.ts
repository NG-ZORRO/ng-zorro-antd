import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-search',
  template: `
    <nz-input [nzType]="'search'" [nzPlaceHolder]="'input search text'" [(ngModel)]="_value" style="width: 200px;" (nzOnSearch)="onSearch($event)"></nz-input>
  `,

  styles: []
})
export class NzDemoInputSearchComponent {
  _value = '';

  onSearch(event: string): void {
    console.log(event);
  }
}
