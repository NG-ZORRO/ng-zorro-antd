import { Component } from '@angular/core';

@Component({
  selector   : 'nz-intro-changelog',
  templateUrl: './nz-intro-changelog.html'
})
export class NzIntroChangelogComponent {
  _markdownCode = require('!!raw-loader!./README.md');
}
