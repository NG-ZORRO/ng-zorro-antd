import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-locale',
  templateUrl: 'nz-demo-locale.component.html'
})

export class NzDemoLocaleComponent {
  markdownContent = require('!!raw-loader!./README.md');

  NzDemoLocaleAllCode = require('!!raw-loader!./nz-demo-locale-all.component');
}
