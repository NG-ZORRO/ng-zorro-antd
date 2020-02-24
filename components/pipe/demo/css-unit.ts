import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipe-css-unit',
  template: `
    <div>{{ 200 | nzToCssUnit }}</div>
    <div>{{ 200 | nzToCssUnit: 'pt' }}</div>
    <div>{{ '200px' | nzToCssUnit: 'pt' }}</div>
  `
})
export class NzDemoPipeCssUnitComponent {}
