/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { booleanAttribute, computed, contentChild, Directive, ElementRef, input, output } from '@angular/core';

import { NzInputDirective } from './input.directive';

@Directive({
  selector: 'nz-input-search',
  exportAs: 'nzInputSearch',
  host: {
    class: 'ant-input-search',
    '[class.ant-input-search-large]': `size() === 'large'`,
    '[class.ant-input-search-small]': `size() === 'small'`,
    '[class.ant-input-search-with-button]': 'nzEnterButton() !== false',
    '(keydown.enter)': 'onEnter($any($event))'
  }
})
export class NzInputSearchDirective {
  private readonly inputDir = contentChild.required(NzInputDirective);
  private readonly inputRef = contentChild.required(NzInputDirective, { read: ElementRef });

  readonly nzEnterButton = input<boolean | string>(false);
  readonly nzLoading = input(false, { transform: booleanAttribute });

  readonly nzSearch = output<NzInputSearchEvent>();

  readonly size = computed(() => this.inputDir().nzSize());

  search(event: Event, source: 'input' | 'clear' = 'input'): void {
    if (!this.nzLoading()) {
      this.nzSearch.emit({ value: this.inputRef().nativeElement.value, event, source });
    }
  }

  onEnter(event: KeyboardEvent): void {
    if (event.target === this.inputRef().nativeElement) {
      this.search(event);
    }
  }
}

@Directive({
  selector: '[nzInputSearchEnterButton]'
})
export class NzInputSearchEnterButtonDirective {}

export interface NzInputSearchEvent {
  value: string;
  event: Event;
  source: 'clear' | 'input';
}
