/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-option-item',
  template: `
    <div class="ant-select-item-option-content">
      @if (customContent) {
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      } @else {
        {{ label }}
      }
    </div>
    @if (showState && selected) {
      <div class="ant-select-item-option-state" unselectable="on">
        @if (!icon) {
          <nz-icon nzType="check" class="ant-select-selected-icon" />
        } @else {
          <ng-template [ngTemplateOutlet]="icon"></ng-template>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-select-item ant-select-item-option',
    '[attr.title]': 'title',
    '[class.ant-select-item-option-grouped]': 'grouped',
    '[class.ant-select-item-option-selected]': 'selected && !disabled',
    '[class.ant-select-item-option-disabled]': 'disabled',
    '[class.ant-select-item-option-active]': 'activated && !disabled'
  },
  imports: [NgTemplateOutlet, NzIconModule]
})
export class NzOptionItemComponent implements OnChanges, OnInit {
  private readonly el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  selected = false;
  activated = false;
  @Input() grouped = false;
  @Input({ transform: booleanAttribute }) customContent = false;
  @Input() template: TemplateRef<NzSafeAny> | null = null;
  @Input() disabled = false;
  @Input() showState = false;
  @Input() title?: string | number | null;
  @Input() label: string | number | null = null;
  @Input() value: NzSafeAny | null = null;
  @Input() activatedValue: NzSafeAny | null = null;
  @Input() listOfSelectedValue: NzSafeAny[] = [];
  @Input() icon: TemplateRef<NzSafeAny> | null = null;
  @Input() compareWith!: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
  @Output() readonly itemClick = new EventEmitter<NzSafeAny>();
  @Output() readonly itemHover = new EventEmitter<NzSafeAny>();

  ngOnChanges(changes: SimpleChanges): void {
    const { value, activatedValue, listOfSelectedValue } = changes;
    if (value || listOfSelectedValue) {
      this.selected = this.listOfSelectedValue.some(v => this.compareWith(v, this.value));
    }
    if (value || activatedValue) {
      this.activated = this.compareWith(this.activatedValue, this.value);
    }
  }

  ngOnInit(): void {
    fromEventOutsideAngular(this.el, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.disabled) {
          this.ngZone.run(() => this.itemClick.emit(this.value));
        }
      });

    fromEventOutsideAngular(this.el, 'mouseenter')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.disabled) {
          this.ngZone.run(() => this.itemHover.emit(this.value));
        }
      });
  }
}
