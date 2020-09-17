import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipe-css-unit',
  template: `
    <div>
      <img [style.height]="100 | nzToCssUnit" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
    </div>
    <div [style.height]="50 | nzToCssUnit: 'pt'"></div>
    <div [style.height]="'100px' | nzToCssUnit"></div>
  `
})
export class NzDemoPipeCssUnitComponent {}
