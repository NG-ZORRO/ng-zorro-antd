/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { fadeMotion, warnDeprecation, InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  preserveWhitespaces: false,
  providers: [NzUpdateHostClassService],
  animations: [fadeMotion],
  templateUrl: './nz-tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeMotion]': '',
    '[@.disabled]': 'nzNoAnimation',
    '(@fadeMotion.done)': 'afterAnimation($event)',
    '(click)': 'updateCheckedStatus()',
    '[style.background-color]': 'presetColor? null : nzColor'
  }
})
export class NzTagComponent implements OnInit, OnChanges {
  presetColor = false;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor: string;
  @Input() @InputBoolean() nzChecked = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Output() readonly nzAfterClose = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  private isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(
      color
    );
  }

  private updateClassMap(): void {
    this.presetColor = this.isPresetColor(this.nzColor);
    const prefix = 'ant-tag';
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-has-color`]: this.nzColor && !this.presetColor,
      [`${prefix}-${this.nzColor}`]: this.presetColor,
      [`${prefix}-checkable`]: this.nzMode === 'checkable',
      [`${prefix}-checkable-checked`]: this.nzChecked
    });
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
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {}

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnChanges(): void {
    this.updateClassMap();
  }
}
