/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
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
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  preserveWhitespaces: false,
  animations: [fadeMotion],
  template: `
    <ng-content></ng-content>
    <i nz-icon nzType="close" *ngIf="nzMode === 'closeable'" tabindex="-1" (click)="closeTag($event)"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeMotion]': '',
    '[@.disabled]': 'nzNoAnimation',
    '[style.background-color]': 'presetColor ? null : nzColor',
    '[class.ant-tag]': `true`,
    '[class.ant-tag-has-color]': `nzColor && !presetColor`,
    '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
    '[class.ant-tag-checkable-checked]': `nzChecked`,
    '(click)': 'updateCheckedStatus()',
    '(@fadeMotion.done)': 'afterAnimation($event)'
  }
})
export class NzTagComponent implements OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzChecked: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;
  presetColor = false;
  cacheClassName: string | null = null;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor?: string;
  @Input() @InputBoolean() nzChecked = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Output() readonly nzAfterClose = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  dir: Direction;

  private destroy$ = new Subject<void>();

  private isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }

    return (
      /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color) ||
      /^(success|processing|error|default|warning)$/.test(color)
    );
  }

  private updateClassMap(): void {
    this.presetColor = this.isPresetColor(this.nzColor);
    if (this.cacheClassName) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.cacheClassName);
    }
    if (this.presetColor) {
      this.cacheClassName = `ant-tag-${this.nzColor}`;
      this.renderer.addClass(this.elementRef.nativeElement, this.cacheClassName);
    }
  }

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
      this.updateClassMap();
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  afterAnimation(e: AnimationEvent): void {
    if (e.toState === 'void') {
      this.nzAfterClose.emit();
      if (this.nzAfterClose.observers.length) {
        warnDeprecation(`'(nzAfterClose)' Output is going to be removed in 9.0.0. Please use '(nzOnClose)' instead.`);
      }
    }
  }

  constructor(
    cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() directionality: Directionality
  ) {
    directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = directionality.value;
      this.prepareComponentForRtl();
      cdr.detectChanges();
    });

    this.dir = directionality.value;
    this.prepareComponentForRtl();
  }

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnChanges(): void {
    this.updateClassMap();
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
