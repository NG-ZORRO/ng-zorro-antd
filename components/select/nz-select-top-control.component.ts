/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { zoomMotion, NzNoAnimationDirective } from 'ng-zorro-antd/core';

import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector: '[nz-select-top-control]',
  exportAs: 'nzSelectTopControl',
  preserveWhitespaces: false,
  animations: [zoomMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-select-top-control.component.html'
})
export class NzSelectTopControlComponent implements OnInit, OnDestroy {
  inputValue: string;
  isComposing = false;
  private destroy$ = new Subject();
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  @ViewChild('mirrorElement', { static: false }) mirrorElement: ElementRef;
  @Input() nzShowSearch = false;
  @Input() nzPlaceHolder: string;
  @Input() nzOpen = false;
  @Input() nzMaxTagCount: number;
  @Input() nzAllowClear = false;
  @Input() nzShowArrow = true;
  @Input() nzLoading = false;
  @Input() nzCustomTemplate: TemplateRef<{ $implicit: NzOptionComponent }>;
  @Input() nzSuffixIcon: TemplateRef<void>;
  @Input() nzClearIcon: TemplateRef<void>;
  @Input() nzRemoveIcon: TemplateRef<void>;
  // tslint:disable-next-line:no-any
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: any[] }>;
  @Input() nzTokenSeparators: string[] = [];

  onClearSelection(e: MouseEvent): void {
    e.stopPropagation();
    this.nzSelectService.updateListOfSelectedValue([], true);
  }

  setInputValue(value: string): void {
    /** fix clear value https://github.com/NG-ZORRO/ng-zorro-antd/issues/3825 **/
    if (this.inputDOM && !value) {
      this.inputDOM.value = value;
    }
    this.inputValue = value;
    this.updateWidth();
    this.nzSelectService.updateSearchValue(value);
    this.nzSelectService.tokenSeparate(this.inputValue, this.nzTokenSeparators);
  }

  get mirrorDOM(): HTMLElement {
    return this.mirrorElement && this.mirrorElement.nativeElement;
  }

  get inputDOM(): HTMLInputElement {
    return this.inputElement && this.inputElement.nativeElement;
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.nzSelectService.listOfSelectedValue.length ? 'none' : 'block';
  }

  get selectedValueStyle(): { [key: string]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.nzShowSearch) {
      showSelectedValue = true;
    } else {
      if (this.nzOpen) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`
    };
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: NzOptionComponent): any {
    return option.nzValue;
  }

  updateWidth(): void {
    if (this.mirrorDOM && this.inputDOM && this.inputDOM.value) {
      this.mirrorDOM.innerText = `${this.inputDOM.value}&nbsp;`;
      this.renderer.removeStyle(this.inputDOM, 'width');
      this.renderer.setStyle(this.inputDOM, 'width', `${this.mirrorDOM.clientWidth}px`);
    } else if (this.inputDOM) {
      this.renderer.removeStyle(this.inputDOM, 'width');
      this.mirrorDOM.innerText = '';
    }
  }

  removeSelectedValue(option: NzOptionComponent, e: MouseEvent): void {
    this.nzSelectService.removeValueFormSelected(option);
    e.stopPropagation();
  }

  animationEnd(): void {
    this.nzSelectService.animationEvent$.next();
  }

  constructor(
    private renderer: Renderer2,
    public nzSelectService: NzSelectService,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.nzSelectService.open$.pipe(takeUntil(this.destroy$)).subscribe(open => {
      if (this.inputElement && open) {
        setTimeout(() => this.inputDOM.focus());
      }
    });
    this.nzSelectService.clearInput$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setInputValue('');
    });
    this.nzSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
