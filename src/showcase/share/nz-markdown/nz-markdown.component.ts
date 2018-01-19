import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import * as marked from 'marked';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

@Component({
  selector     : 'nz-markdown',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <article class="markdown" [innerHTML]="_parsedHTML"></article>
  `
})
export class NzMarkdownComponent implements OnInit, AfterViewInit {
  _parsedHTML = '';
  _el: HTMLElement;

  @Input()
  set nzContent(value) {
    this._parsedHTML = marked(value);
  }

  constructor(private _elementRef: ElementRef, private renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit() {
    const codes = this._el.querySelectorAll('code[class^=lang-]');
    [].forEach.call(codes, code => {
      const className = code.className;
      this.renderer.addClass(code, className.replace('lang', 'language'));
      Prism.highlightElement(code);
    });
  }

  ngOnInit() {
  }
}
