import { Input, Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as HighLight from 'highlight.js';

@Component({
  selector     : 'nz-highlight',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <pre [ngClass]="'language-'+nzLanguage"><code #code [innerText]="nzCode"></code></pre>
  `
})
export class NzHighlightComponent implements OnInit, AfterViewInit {
  _code;
  @ViewChild('code') codeElement: ElementRef;
  @Input() nzLanguage: string;

  @Input()
  get nzCode() {
    return this._code || '';
  }

  set nzCode(value) {
    this._code = value.replace('../../../index.showcase', 'ng-zorro-antd');
  }

  ngAfterViewInit() {
    (<any>HighLight).highlightBlock(this.codeElement.nativeElement);
  }

  constructor() {
  }

  ngOnInit() {
  }
}
