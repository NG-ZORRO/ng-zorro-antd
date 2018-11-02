import { ScrollStrategy } from '@angular/cdk/overlay';
import { Renderer2 } from '@angular/core';
import { NzMeasureScrollbarService } from '../../services/nz-measure-scrollbar.service'

export class NzBlockScrollStrategy implements ScrollStrategy {

  constructor(private document: Document, private renderer: Renderer2, private nzMeasureScrollbarService: NzMeasureScrollbarService) {
  }

  attach(): void {}

  enable(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(this.document.body, 'padding-right', `${this.nzMeasureScrollbarService.scrollBarWidth}px`);

  }

  disable(): void {
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'padding-right');
  }

}
