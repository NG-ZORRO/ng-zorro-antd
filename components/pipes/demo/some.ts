import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-some',
  template: `
    {{ [5, 6, 7, 8, 9] | nzSome: method }}
    <br />
    {{ [6, 7, 8, 9, 10] | nzSome: method }}
    <br />
  `
})
export class NzDemoPipesSomeComponent {
  method = (item: number) => {
    return item === 5;
  };
}
