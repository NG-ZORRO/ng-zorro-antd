/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSelectItemInterface, NzSelectModeType } from './select.types';

@Component({
  selector: 'nz-option-container',
  exportAs: 'nzOptionContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="ant-select-item-empty">
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-container *cdkVirtualFor="let item of listOfContainerItem; trackBy: trackValue">
          <ng-container [ngSwitch]="item.type">
            <nz-option-item-group *ngSwitchCase="'group'" [nzLabel]="item.groupLabel"></nz-option-item-group>
            <nz-option-item
              *ngSwitchCase="'item'"
              [icon]="menuItemSelectedIcon"
              [customContent]="item.nzCustomContent"
              [template]="item.template"
              [grouped]="!!item.groupLabel"
              [disabled]="item.nzDisabled"
              [showState]="mode === 'tags' || mode === 'multiple'"
              [label]="item.nzLabel"
              [compareWith]="compareWith"
              [activatedValue]="activatedValue"
              [listOfSelectedValue]="listOfSelectedValue"
              [value]="item.nzValue"
              (itemHover)="onItemHover($event)"
              (itemClick)="onItemClick($event)"
            ></nz-option-item>
          </ng-container>
        </ng-container>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
  host: {
    '[class.ant-select-dropdown]': 'true'
  }
})
export class NzOptionContainerComponent implements OnChanges {
  @Input() notFoundContent: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() menuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() dropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() activatedValue: NzSafeAny | null = null;
  @Input() listOfSelectedValue: NzSafeAny[] = [];
  @Input() compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
  @Input() mode: NzSelectModeType = 'default';
  @Input() matchWidth = true;
  @Input() listOfContainerItem: NzSelectItemInterface[] = [];
  @Output() readonly itemClick = new EventEmitter<NzSafeAny>();
  @Output() readonly itemHover = new EventEmitter<NzSafeAny>();
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  @ViewChild(CdkVirtualScrollViewport, { static: true }) cdkVirtualScrollViewport: CdkVirtualScrollViewport;
  private scrolledIndex = 0;
  readonly itemSize = 32;
  readonly maxItemLength = 8;

  onItemClick(value: NzSafeAny): void {
    this.itemClick.emit(value);
  }

  onItemHover(value: NzSafeAny): void {
    // TODO: bug when mouse inside the option container & keydown
    this.itemHover.emit(value);
  }

  trackValue(_index: number, option: NzSelectItemInterface): NzSafeAny {
    return option.key;
  }

  onScrolledIndexChange(index: number): void {
    this.scrolledIndex = index;
    if (index === this.listOfContainerItem.length - this.maxItemLength) {
      this.scrollToBottom.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfContainerItem, activatedValue } = changes;
    if (listOfContainerItem || activatedValue) {
      const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.key, this.activatedValue));
      if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
        this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
      }
    }
  }
}
