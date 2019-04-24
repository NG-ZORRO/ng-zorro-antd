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

import { fadeMotion, InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { isPresetColor } from 'ng-zorro-antd/tag/util';

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
    '(@fadeMotion.done)': 'afterAnimation($event)',
    '(click)': 'updateCheckedStatus()',
    '[style.background-color]': ''
  }
})
export class NzTagComponent implements OnInit, OnChanges {
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor: string;
  @Input() nzUncheckedColor: string;
  @Input() @InputBoolean() nzChecked: boolean = false;
  @Input() @InputBoolean() nzNoAnimation: boolean = false;
  @Output() readonly nzAfterClose = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  isPresetColor = false;
  backgroundColor: string | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {}

  ngOnInit(): void {
    this.updateClassesAndStyles();
  }

  ngOnChanges(): void {
    this.updateClassesAndStyles();
  }

  private updateClassesAndStyles(): void {
    const isPreset = (this.isPresetColor = isPresetColor(this.nzColor));
    const prefix = 'ant-tag';
    this.backgroundColor = isPresetColor
      ? null
      : this.nzMode === 'checkable'
      ? this.nzChecked
        ? this.nzColor
        : this.nzUncheckedColor || null
      : this.nzColor;
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`${prefix}`]: true,
      [`${prefix}-has-color`]: this.nzColor && !isPreset,
      [`${prefix}-${this.nzColor}`]: isPreset,
      [`${prefix}-checkable`]: this.nzMode === 'checkable',
      [`${prefix}-checkable-checked`]: this.nzChecked
    });
  }

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
      this.updateClassesAndStyles();
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
    }
  }
}
