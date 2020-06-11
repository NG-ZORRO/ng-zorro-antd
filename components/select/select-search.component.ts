/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nz-select-search',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      #inputElement
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    <span #mirrorElement *ngIf="mirrorSync" class="ant-select-selection-search-mirror"></span>
  `,
  host: {
    '[class.ant-select-selection-search]': 'true'
  }
})
export class NzSelectSearchComponent implements AfterViewInit, OnChanges {
  @Input() disabled = false;
  @Input() mirrorSync = false;
  @Input() showInput = true;
  @Input() focusTrigger = false;
  @Input() value = '';
  @Input() autofocus = false;
  @Output() readonly valueChange = new EventEmitter<string>();
  @Output() readonly isComposingChange = new EventEmitter<boolean>();
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  @ViewChild('mirrorElement', { static: false }) mirrorElement?: ElementRef;

  setCompositionState(isComposing: boolean): void {
    this.isComposingChange.next(isComposing);
  }

  onValueChange(value: string): void {
    const inputDOM = this.inputElement.nativeElement;
    inputDOM.value = value;
    this.value = value;
    this.valueChange.next(value);
    if (this.mirrorSync) {
      this.syncMirrorWidth();
    }
  }

  clearInputValue(): void {
    this.onValueChange('');
  }

  syncMirrorWidth(): void {
    const mirrorDOM = this.mirrorElement!.nativeElement;
    const hostDOM = this.elementRef.nativeElement;
    const inputDOM = this.inputElement.nativeElement;
    this.renderer.removeStyle(hostDOM, 'width');
    mirrorDOM.innerHTML = `${inputDOM.value}&nbsp;`;
    this.renderer.setStyle(hostDOM, 'width', `${mirrorDOM.scrollWidth}px`);
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private focusMonitor: FocusMonitor) {}

  ngOnChanges(changes: SimpleChanges): void {
    const inputDOM = this.inputElement.nativeElement;
    const { focusTrigger, showInput } = changes;
    if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
      inputDOM.focus();
    }
    if (showInput) {
      if (this.showInput) {
        this.renderer.removeAttribute(inputDOM, 'readonly');
      } else {
        this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.mirrorSync) {
      this.syncMirrorWidth();
    }
    if (this.autofocus) {
      this.focus();
    }
  }
}
