import { ScrollStrategy } from '@angular/cdk/overlay';
import { Renderer2 } from '@angular/core';

export class NzBlockScrollStrategy implements ScrollStrategy {

  constructor(private document: Document, private renderer: Renderer2) {
  }

  attach(): void {}

  enable(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  disable(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }

}
