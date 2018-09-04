import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NzBlockScrollStrategy } from './nz-block-scroll-strategy';

@Injectable({providedIn: 'root'})
export class NzScrollStrategyOptions {
  private document: Document;
  private renderer: Renderer2;
  constructor(
    rendererFactory: RendererFactory2,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) document: any
  ) {
    this.document = document;
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  block = () => new NzBlockScrollStrategy(this.document, this.renderer);
}
