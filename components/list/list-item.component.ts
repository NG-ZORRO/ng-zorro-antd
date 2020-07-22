/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NzDirectionVHType } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subscription } from 'rxjs';
import { NzListItemExtraComponent } from './list-item-cell';
import { NzListComponent } from './list.component';

@Component({
  selector: 'nz-list-item, [nz-list-item]',
  exportAs: 'nzListItem',
  template: `
    <ng-template #actionsTpl>
      <ul nz-list-item-actions *ngIf="nzActions && nzActions.length > 0" [nzActions]="nzActions"></ul>
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]"></ng-content>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]"></ng-content>
      <ng-content></ng-content>
      <ng-container *ngIf="nzContent">
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      </ng-container>
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]"></ng-content>
    </ng-template>
    <ng-template #simpleTpl>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>

    <ng-container *ngIf="isVerticalAndExtra; else simpleTpl">
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
        <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
      </div>
      <nz-list-item-extra *ngIf="nzExtra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </nz-list-item-extra>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
    </ng-container>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListItemComponent implements OnDestroy, AfterViewInit {
  static ngAcceptInputType_nzNoFlex: BooleanInput;

  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzContent?: string | TemplateRef<void>;
  @Input() nzExtra: TemplateRef<void> | null = null;
  @Input() @InputBoolean() @HostBinding('class.ant-list-item-no-flex') nzNoFlex: boolean = false;

  @ContentChild(NzListItemExtraComponent) listItemExtraDirective?: NzListItemExtraComponent;

  private itemLayout?: NzDirectionVHType;
  private itemLayout$?: Subscription;

  get isVerticalAndExtra(): boolean {
    return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
  }

  constructor(elementRef: ElementRef, renderer: Renderer2, private parentComp: NzListComponent, private cdr: ChangeDetectorRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-list-item');
  }

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
