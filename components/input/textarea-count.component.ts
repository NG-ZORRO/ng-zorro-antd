/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  effect,
  inject,
  Injector,
  Input,
  isDevMode,
  numberAttribute,
  Renderer2
} from '@angular/core';

import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzInputDirective } from './input.directive';

@Component({
  selector: 'nz-textarea-count',
  template: `<ng-content select="textarea[nz-input]" />`,
  host: {
    class: 'ant-input-textarea-show-count'
  }
})
export class NzTextareaCountComponent implements AfterContentInit {
  private renderer = inject(Renderer2);
  private injector = inject(Injector);
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @ContentChild(NzInputDirective, { static: true }) nzInputDirective!: NzInputDirective;
  @Input({ transform: numberAttribute }) nzMaxCharacterCount: number = 0;
  @Input() nzComputeCharacterCount: (v: string) => number = v => v.length;
  @Input() nzFormatter: (cur: number, max: number) => string = (c, m) => `${c}${m > 0 ? `/${m}` : ``}`;

  ngAfterContentInit(): void {
    if (!this.nzInputDirective && isDevMode()) {
      throw new Error('[nz-textarea-count]: Could not find matching textarea[nz-input] child.');
    }

    effect(() => this.setDataCount(this.nzInputDirective.value()), { injector: this.injector });
  }

  setDataCount(value: string): void {
    const inputValue = isNotNil(value) ? String(value) : '';
    const currentCount = this.nzComputeCharacterCount(inputValue);
    const dataCount = this.nzFormatter(currentCount, this.nzMaxCharacterCount);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-count', dataCount);
  }
}
