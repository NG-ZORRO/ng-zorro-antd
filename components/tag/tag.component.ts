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
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  isPresetColor,
  isStatusColor,
  NzPresetColor,
  NzStatusColor,
  presetColors,
  statusColors
} from 'ng-zorro-antd/core/color';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
    <span
      nz-icon
      nzType="close"
      class="ant-tag-close-icon"
      *ngIf="nzMode === 'closeable'"
      tabindex="-1"
      (click)="closeTag($event)"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-tag',
    '[style.background-color]': `isPresetColor ? '' : nzColor`,
    '[class.ant-tag-has-color]': `nzColor && !isPresetColor`,
    '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
    '[class.ant-tag-checkable-checked]': `nzChecked`,
    '[class.ant-tag-rtl]': `dir === 'rtl'`,
    '(click)': 'updateCheckedStatus()'
  }
})
export class NzTagComponent implements OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_nzChecked: BooleanInput;
  isPresetColor = false;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor?: string | NzStatusColor | NzPresetColor;
  @Input() @InputBoolean() nzChecked = false;
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {}

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

  private clearPresetColor(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    // /(ant-tag-(?:pink|red|...))/g
    const regexp = new RegExp(`(ant-tag-(?:${[...presetColors, ...statusColors].join('|')}))`, 'g');
    const classname = hostElement.classList.toString();
    const matches: string[] = [];
    let match: RegExpExecArray | null = regexp.exec(classname);
    while (match !== null) {
      matches.push(match[1]);
      match = regexp.exec(classname);
    }
    hostElement.classList.remove(...matches);
  }

  private setPresetColor(): void {
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    this.clearPresetColor();
    if (!this.nzColor) {
      this.isPresetColor = false;
    } else {
      this.isPresetColor = isPresetColor(this.nzColor) || isStatusColor(this.nzColor);
    }
    if (this.isPresetColor) {
      hostElement.classList.add(`ant-tag-${this.nzColor}`);
    }
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor } = changes;
    if (nzColor) {
      this.setPresetColor();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
