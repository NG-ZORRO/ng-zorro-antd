/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  isPresetColor,
  isStatusColor,
  NzPresetColor,
  NzStatusColor,
  presetColors,
  statusColors
} from 'ng-zorro-antd/core/color';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  template: `
    <ng-content></ng-content>
    @if (nzMode === 'closeable') {
      <nz-icon nzType="close" class="ant-tag-close-icon" tabindex="-1" (click)="closeTag($event)" />
    }
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
    '[class.ant-tag-borderless]': `!nzBordered`,
    '(click)': 'updateCheckedStatus()'
  },
  imports: [NzIconModule]
})
export class NzTagComponent implements OnChanges, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor?: string | NzStatusColor | NzPresetColor;
  @Input({ transform: booleanAttribute }) nzChecked = false;
  @Input({ transform: booleanAttribute }) nzBordered = true;
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  dir: Direction = 'ltr';
  isPresetColor = false;

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }

  private clearPresetColor(): void {
    // /(ant-tag-(?:pink|red|...))/g
    const regexp = new RegExp(`(ant-tag-(?:${[...presetColors, ...statusColors].join('|')}))`, 'g');
    const classname = this.el.classList.toString();
    const matches: string[] = [];
    let match: RegExpExecArray | null = regexp.exec(classname);
    while (match !== null) {
      matches.push(match[1]);
      match = regexp.exec(classname);
    }
    this.el.classList.remove(...matches);
  }

  private setPresetColor(): void {
    this.clearPresetColor();
    if (!this.nzColor) {
      this.isPresetColor = false;
    } else {
      this.isPresetColor = isPresetColor(this.nzColor) || isStatusColor(this.nzColor);
    }
    if (this.isPresetColor) {
      this.el.classList.add(`ant-tag-${this.nzColor}`);
    }
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
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
}
