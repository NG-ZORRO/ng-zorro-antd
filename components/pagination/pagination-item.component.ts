/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { PaginationItemRenderContext, PaginationItemType } from './pagination.types';

@Component({
  selector: 'li[nz-pagination-item]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <i nz-icon nzType="left" *ngSwitchCase="'prev'"></i>
            <i nz-icon nzType="right" *ngSwitchCase="'next'"></i>
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <i *ngSwitchCase="'prev_5'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                <i *ngSwitchCase="'next_5'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
  host: {
    '[class.ant-pagination-prev]': `type === 'prev'`,
    '[class.ant-pagination-next]': `type === 'next'`,
    '[class.ant-pagination-item]': `type === 'page'`,
    '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
    '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
    '[class.ant-pagination-jump-next]': `type === 'next_5'`,
    '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
    '[class.ant-pagination-disabled]': 'disabled',
    '[class.ant-pagination-item-active]]': 'active',
    '[attr.title]': 'title',
    '(click)': 'clickItem()'
  }
})
export class NzPaginationItemComponent implements OnChanges {
  @Input() active = false;
  @Input() locale: NzSafeAny = {};
  @Input() index: number | null = null;
  @Input() disabled = false;
  @Input() type: PaginationItemType | string | null = null;
  @Input() itemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Output() readonly diffIndex = new EventEmitter<number>();
  @Output() readonly gotoIndex = new EventEmitter<number>();
  title: string | null = null;
  clickItem(): void {
    if (!this.disabled) {
      if (this.type === 'page') {
        this.gotoIndex.emit(this.index!);
      } else {
        this.diffIndex.emit(
          ({
            next: 1,
            prev: -1,
            prev_5: -5,
            next_5: 5
          } as NzSafeAny)[this.type!]
        );
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { locale, index, type } = changes;
    if (locale || index || type) {
      this.title = ({
        page: `${this.index}`,
        next: this.locale.next_page,
        prev: this.locale.prev_page,
        prev_5: this.locale.prev_5,
        next_5: this.locale.next_5
      } as NzSafeAny)[this.type!];
    }
  }
}
