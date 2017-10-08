import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-intro-i18n',
  templateUrl: 'nz-intro-i18n.component.html'
})

export class NzIntroI18nComponent implements OnInit {
  markdownContent = require('!!raw-loader!./README.md');

  constructor() { }

  ngOnInit() { }
}
