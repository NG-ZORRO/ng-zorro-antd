import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  get nzCode(): string {
    return this._code || '';
  }

  set nzCode(value: string) {
    this._code = value;
  }

  ngAfterViewInit(): void {
    // noinspection TsLint
    (HighLight as any).highlightBlock(this.codeElement.nativeElement);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
