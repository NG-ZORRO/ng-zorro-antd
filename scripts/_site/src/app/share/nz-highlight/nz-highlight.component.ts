import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import './prism-angular';

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
    this._code = (Prism as any).highlight(value, (Prism.languages as any).angular);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
