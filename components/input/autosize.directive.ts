/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, DestroyRef, Directive, DoCheck, ElementRef, inject, Input, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzResizeService } from 'ng-zorro-antd/core/services';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Directive({
  selector: 'textarea[nzAutosize]',
  exportAs: 'nzAutosize',
  host: {
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    rows: '1',
    '(input)': 'noopInputHandler()'
  }
})
export class NzAutosizeDirective implements AfterViewInit, DoCheck {
  private ngZone = inject(NgZone);
  private platform = inject(Platform);
  private destroyRef = inject(DestroyRef);
  private resizeService = inject(NzResizeService);
  private el: HTMLTextAreaElement | HTMLInputElement = inject(ElementRef).nativeElement;

  private autosize: boolean = false;
  private cachedLineHeight!: number;
  private previousValue!: string;
  private previousMinRows: number | undefined;
  private minRows: number | undefined;
  private maxRows: number | undefined;
  private maxHeight: number | null = null;
  private minHeight: number | null = null;
  private inputGap = 10;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }

  @Input()
  set nzAutosize(value: string | boolean | AutoSizeType) {
    const isAutoSizeType = (data: string | boolean | AutoSizeType): data is AutoSizeType =>
      typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows);
    if (typeof value === 'string' || value === true) {
      this.autosize = true;
    } else if (isAutoSizeType(value)) {
      this.autosize = true;
      this.minRows = value.minRows;
      this.maxRows = value.maxRows;
      this.maxHeight = this.setMaxHeight();
      this.minHeight = this.setMinHeight();
    }
  }

  resizeToFitContent(force: boolean = false): void {
    this.cacheTextareaLineHeight();

    // If we haven't determined the line-height yet, we know we're still hidden and there's no point
    // in checking the height of the textarea.
    if (!this.cachedLineHeight) {
      return;
    }

    const textarea = this.el as HTMLTextAreaElement;
    const value = textarea.value;

    // Only resize if the value or minRows have changed since these calculations can be expensive.
    if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
      return;
    }
    const placeholderText = textarea.placeholder;

    // Reset the textarea height to auto in order to shrink back to its default size.
    // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
    // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
    // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
    // need to be removed temporarily.
    textarea.classList.add('nz-textarea-autosize-measuring');
    textarea.placeholder = '';
    let height =
      Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight +
      this.inputGap;
    if (this.maxHeight !== null && height > this.maxHeight) {
      height = this.maxHeight!;
    }
    if (this.minHeight !== null && height < this.minHeight) {
      height = this.minHeight!;
    }
    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    textarea.style.height = `${height}px`;
    textarea.classList.remove('nz-textarea-autosize-measuring');
    textarea.placeholder = placeholderText;

    // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
    // We need to re-set the selection in order for it to scroll to the proper position.
    if (typeof requestAnimationFrame !== 'undefined') {
      this.ngZone.runOutsideAngular(() =>
        requestAnimationFrame(() => {
          const { selectionStart, selectionEnd } = textarea;

          // IE will throw an "Unspecified error" if we try to set the selection range after the
          // element has been removed from the DOM. Assert that the directive hasn't been destroyed
          // between the time we requested the animation frame and when it was executed.
          // Also note that we have to assert that the textarea is focused before we set the
          // selection range. Setting the selection range on a non-focused textarea will cause
          // it to receive focus on IE and Edge.
          if (!this.destroyed && document.activeElement === textarea) {
            textarea.setSelectionRange(selectionStart, selectionEnd);
          }
        })
      );
    }

    this.previousValue = value;
    this.previousMinRows = this.minRows;
  }

  private cacheTextareaLineHeight(): void {
    if (this.cachedLineHeight >= 0 || !this.el.parentNode) {
      return;
    }

    // Use a clone element because we have to override some styles.
    const textareaClone = this.el.cloneNode(false) as HTMLTextAreaElement;
    textareaClone.rows = 1;

    // Use `position: absolute` so that this doesn't cause a browser layout and use
    // `visibility: hidden` so that nothing is rendered. Clear any other styles that
    // would affect the height.
    textareaClone.style.position = 'absolute';
    textareaClone.style.visibility = 'hidden';
    textareaClone.style.border = 'none';
    textareaClone.style.padding = '0';
    textareaClone.style.height = '';
    textareaClone.style.minHeight = '';
    textareaClone.style.maxHeight = '';

    // In Firefox it happens that textarea elements are always bigger than the specified amount
    // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
    // As a workaround that removes the extra space for the scrollbar, we can just set overflow
    // to hidden. This ensures that there is no invalid calculation of the line height.
    // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
    textareaClone.style.overflow = 'hidden';

    this.el.parentNode!.appendChild(textareaClone);
    this.cachedLineHeight = textareaClone.clientHeight - this.inputGap;
    this.el.parentNode!.removeChild(textareaClone);

    // Min and max heights have to be re-calculated if the cached line height changes
    this.maxHeight = this.setMaxHeight();
    this.minHeight = this.setMinHeight();
  }

  setMinHeight(): number | null {
    const minHeight =
      this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;

    if (minHeight !== null) {
      this.el.style.minHeight = `${minHeight}px`;
    }
    return minHeight;
  }

  setMaxHeight(): number | null {
    const maxHeight =
      this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;
    if (maxHeight !== null) {
      this.el.style.maxHeight = `${maxHeight}px`;
    }
    return maxHeight;
  }

  noopInputHandler(): void {
    // no-op handler that ensures we're running change detection on input events.
  }

  ngAfterViewInit(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
      this.resizeService
        .connect()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.resizeToFitContent(true));
    }
  }

  ngDoCheck(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
    }
  }
}
