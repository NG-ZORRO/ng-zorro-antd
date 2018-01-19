import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'nz-highlight',
  template: `
    <pre [ngClass]="'language-'+nzLanguage"><code [innerHTML]="nzCode"></code></pre>
  `
})
export class NzHighlightComponent implements OnInit {
  _code;
  @ViewChild('code') codeElement: ElementRef;
  @Input() nzLanguage: string;

  @Input()
  get nzCode(): string {
    return this._code || '';
  }

  set nzCode(value: string) {
    this._code = (Prism as any).highlight(value, (Prism.languages as any).javascript);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
