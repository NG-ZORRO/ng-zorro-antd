/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
    <i nz-icon nzType="close" class="ant-tag-close-icon" *ngIf="nzMode === 'closeable'" tabindex="-1" (click)="closeTag($event)"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.background-color]': `isPresetColor ? '' : nzColor`,
    '[class]': `isPresetColor ? ('ant-tag-' + nzColor) : ''`,
    '[class.ant-tag]': `true`,
    '[class.ant-tag-has-color]': `nzColor && !isPresetColor`,
    '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
    '[class.ant-tag-checkable-checked]': `nzChecked`,
    '(click)': 'updateCheckedStatus()'
  }
})
export class NzTagComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_nzChecked: BooleanInput;
  isPresetColor = false;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor?: string;
  @Input() @InputBoolean() nzChecked = false;
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  dir: Direction;
  private destroy$ = new Subject<void>();

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  constructor(
    cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() directionality: Directionality
  ) {
    directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
      this.prepareComponentForRtl();
      cdr.detectChanges();
    });

    this.dir = directionality.value;
    this.prepareComponentForRtl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor } = changes;
    if (nzColor) {
      if (!this.nzColor) {
        this.isPresetColor = false;
      } else {
        this.isPresetColor =
          /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(this.nzColor) ||
          /^(success|processing|error|default|warning)$/.test(this.nzColor);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private prepareComponentForRtl(): void {
    if (this.isRtlLayout) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-tag-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-tag-rtl');
    }
  }
  get isRtlLayout(): boolean {
    return this.dir === 'rtl';
  }
}
