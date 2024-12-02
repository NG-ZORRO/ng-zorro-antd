/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDirectionVHType } from 'ng-zorro-antd/core/types';

import { NzListItemActionsComponent, NzListItemExtraComponent } from './list-item-cell';
import { NzListComponent } from './list.component';

@Component({
  selector: 'nz-list-item, [nz-list-item]',
  exportAs: 'nzListItem',
  template: `
    <ng-template #actionsTpl>
      @if (nzActions && nzActions.length > 0) {
        <ul nz-list-item-actions [nzActions]="nzActions"></ul>
      }
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]" />
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]" />
      <ng-content />
      @if (nzContent) {
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      }
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]" />
    </ng-template>

    @if (isVerticalAndExtra) {
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl" />
        <ng-template [ngTemplateOutlet]="actionsTpl" />
      </div>
      @if (nzExtra) {
        <nz-list-item-extra>
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </nz-list-item-extra>
      }
      <ng-template [ngTemplateOutlet]="extraTpl" />
    } @else {
      <ng-template [ngTemplateOutlet]="contentTpl" />
      <ng-template [ngTemplateOutlet]="nzExtra" />
      <ng-template [ngTemplateOutlet]="extraTpl" />
      <ng-template [ngTemplateOutlet]="actionsTpl" />
    }
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-list-item'
  },
  imports: [NzListItemActionsComponent, NzOutletModule, NgTemplateOutlet, NzListItemExtraComponent]
})
export class NzListItemComponent implements OnDestroy, AfterViewInit {
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzContent?: string | TemplateRef<void>;
  @Input() nzExtra: TemplateRef<void> | null = null;
  @Input({ transform: booleanAttribute }) @HostBinding('class.ant-list-item-no-flex') nzNoFlex: boolean = false;

  @ContentChild(NzListItemExtraComponent) listItemExtraDirective?: NzListItemExtraComponent;

  private itemLayout?: NzDirectionVHType;
  private itemLayout$?: Subscription;

  get isVerticalAndExtra(): boolean {
    return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
  }

  constructor(
    private parentComp: NzListComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
      this.itemLayout = val;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.itemLayout$) {
      this.itemLayout$.unsubscribe();
    }
  }
}
