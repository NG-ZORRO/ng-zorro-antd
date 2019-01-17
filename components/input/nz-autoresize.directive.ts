import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { auditTime, take, takeUntil } from 'rxjs/operators';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Directive({
  selector: 'textarea[nzAutosize]',
  host    : {
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    rows: '1'
  }
})
export class NzAutoResizeDirective implements AfterViewInit, OnDestroy {
  private _autosize: boolean | AutoSizeType = false;
  private el: HTMLTextAreaElement | HTMLInputElement = this.elementRef.nativeElement;
  private cachedLineHeight: number;
  private previousValue: string;
  private previousMinRows: number;
  private minRows: number;
  private maxRows: number;
  private destroy$ = new Subject();
  private inputGap = 10;

  @Input()
  set nzAutosize(value: string | boolean | AutoSizeType) {
    if (typeof value === 'string') {
      this._autosize = true;
    } else if (typeof value !== 'boolean') {
      this._autosize = value;
      this.minRows = value.minRows;
      this.maxRows = value.maxRows;
      this.setMaxHeight();
      this.setMinHeight();
    }
  }

  get nzAutosize(): string | boolean | AutoSizeType {
    return this._autosize;
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
    textarea.classList.add('cdk-textarea-autosize-measuring');
    textarea.placeholder = '';
    const height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight + this.inputGap;

    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    textarea.style.height = `${height}px`;
    textarea.classList.remove('cdk-textarea-autosize-measuring');
    textarea.placeholder = placeholderText;

    // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
    // We need to re-set the selection in order for it to scroll to the proper position.
    if (typeof requestAnimationFrame !== 'undefined') {
      this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
        const { selectionStart, selectionEnd } = textarea;

        // IE will throw an "Unspecified error" if we try to set the selection range after the
        // element has been removed from the DOM. Assert that the directive hasn't been destroyed
        // between the time we requested the animation frame and when it was executed.
        // Also note that we have to assert that the textarea is focused before we set the
        // selection range. Setting the selection range on a non-focused textarea will cause
        // it to receive focus on IE and Edge.
        if (!this.destroy$.isStopped && document.activeElement === textarea) {
          textarea.setSelectionRange(selectionStart, selectionEnd);
        }
      }));
    }

    this.previousValue = value;
    this.previousMinRows = this.minRows;
  }

  private cacheTextareaLineHeight(): void {
    if (this.cachedLineHeight) {
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

    this.el.parentNode.appendChild(textareaClone);
    this.cachedLineHeight = textareaClone.clientHeight - this.inputGap - 1;
    this.el.parentNode.removeChild(textareaClone);

    // Min and max heights have to be re-calculated if the cached line height changes
    this.setMinHeight();
    this.setMaxHeight();
  }

  setMinHeight(): void {
    const minHeight = this.minRows && this.cachedLineHeight ?
      `${this.minRows * this.cachedLineHeight + this.inputGap}px` : null;

    if (minHeight) {
      this.el.style.minHeight = minHeight;
    }
  }

  setMaxHeight(): void {
    const maxHeight = this.maxRows && this.cachedLineHeight ?
      `${this.maxRows * this.cachedLineHeight + this.inputGap}px` : null;

    if (maxHeight) {
      this.el.style.maxHeight = maxHeight;
    }
  }

  constructor(private elementRef: ElementRef, private ngZone: NgZone, @Optional() @Self() public ngControl: NgControl, private platform: Platform) {
  }

  ngAfterViewInit(): void {
    if (this.nzAutosize && this.platform.isBrowser) {
      if (this.ngControl) {
        this.resizeToFitContent();
        this.ngZone.runOutsideAngular(() => {
          fromEvent(window, 'resize')
          .pipe(auditTime(16), takeUntil(this.destroy$))
          .subscribe(() => this.resizeToFitContent(true));
        });
        merge( this.ngControl.control.valueChanges.pipe(takeUntil(this.destroy$)),
          this.ngZone.onStable.pipe(take(1)))
          .subscribe(() => this.resizeToFitContent());
      } else {
        console.warn('nzAutosize must work with ngModel or ReactiveForm');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
