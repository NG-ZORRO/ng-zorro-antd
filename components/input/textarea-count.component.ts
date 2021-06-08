/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  isDevMode,
  OnDestroy,
  Renderer2
} from '@angular/core';

import { EMPTY, merge, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzInputDirective } from './input.directive';

@Component({
  selector: 'nz-textarea-count',
  template: ` <ng-content select="textarea[nz-input]"></ng-content> `,
  host: {
    class: 'ant-input-textarea-show-count'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTextareaCountComponent implements AfterContentInit, OnDestroy {
  @ContentChild(NzInputDirective, { static: true }) nzInputDirective!: NzInputDirective;
  @Input() nzMaxCharacterCount: number = 0;
  @Input() nzComputeCharacterCount: (v: string) => number = v => v.length;
  @Input() nzFormatter: (cur: number, max: number) => string = (c, m) => `${c}${m > 0 ? `/${m}` : ``}`;

  private configChange$ = new Subject();
  private destroy$ = new Subject();

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    if (!this.nzInputDirective && isDevMode()) {
      throw new Error('[nz-textarea-count]: Could not find matching textarea[nz-input] child.');
    }

    if (this.nzInputDirective.ngControl) {
      const valueChanges = this.nzInputDirective.ngControl.valueChanges || EMPTY;
      merge(valueChanges, this.configChange$)
        .pipe(
          takeUntil(this.destroy$),
          map(() => this.nzInputDirective.ngControl.value),
          startWith(this.nzInputDirective.ngControl.value as string)
        )
        .subscribe(value => {
          this.setDataCount(value);
        });
    }
  }

  setDataCount(value: string): void {
    const inputValue = isNotNil(value) ? String(value) : '';
    const currentCount = this.nzComputeCharacterCount(inputValue);
    const dataCount = this.nzFormatter(currentCount, this.nzMaxCharacterCount);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-count', dataCount);
  }

  ngOnDestroy(): void {
    this.configChange$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
