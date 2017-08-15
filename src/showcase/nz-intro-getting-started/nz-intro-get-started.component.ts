import { Component } from '@angular/core';

@Component({
  selector   : 'nz-intro-get-started',
  templateUrl: './nz-intro-get-started.html'
})
export class NzIntroGetStartedComponent {
  _markdownCode = require('!!raw-loader!./README.md');

  constructor() {
  }
}
