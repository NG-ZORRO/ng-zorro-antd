/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
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
        <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!"></nz-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
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
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
  host: {
    '[class.ant-select-dropdown]': 'true'
  }
})
export class NzOptionContainerComponent implements OnChanges, AfterViewInit {
  @Input() notFoundContent: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() menuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  @Input() dropdownRender: TemplateRef<NzSafeAny> | null = null;
  @Input() activatedValue: NzSafeAny | null = null;
  @Input() listOfSelectedValue: NzSafeAny[] = [];
  @Input() compareWith!: (o1: NzSafeAny, o2: NzSafeAny) => boolean;
  @Input() mode: NzSelectModeType = 'default';
  @Input() matchWidth = true;
  @Input() itemSize = 32;
  @Input() maxItemLength = 8;
  @Input() listOfContainerItem: NzSelectItemInterface[] = [];
  @Output() readonly itemClick = new EventEmitter<NzSafeAny>();
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  @ViewChild(CdkVirtualScrollViewport, { static: true }) cdkVirtualScrollViewport!: CdkVirtualScrollViewport;
  private scrolledIndex = 0;

  onItemClick(value: NzSafeAny): void {
    this.itemClick.emit(value);
  }

  onItemHover(value: NzSafeAny): void {
    // TODO: keydown.enter won't activate this value
    this.activatedValue = value;
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

  scrollToActivatedValue(): void {
    const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.key, this.activatedValue));
    if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
      this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfContainerItem, activatedValue } = changes;
    if (listOfContainerItem || activatedValue) {
      this.scrollToActivatedValue();
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToActivatedValue());
  }
}
