/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzCheckListI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { NzItemProps } from './typings';

@Component({
  selector: 'nz-check-list-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NzIconModule, NzProgressModule, NzOutletModule, NzCheckboxModule, NzButtonModule, FormsModule, DecimalPipe],
  template: `
    @let i18n = locale();
    @if (visible()) {
      @if (progressPercent() === 100) {
        <div class="ant-check-list-header-finish">
          <nz-icon nzType="check-circle" nzTheme="outline" class="ant-check-list-header-finish-icon" />
          <h3 class="ant-check-list-header-finish-title">{{ i18n.checkListFinish }}</h3>
          <button nz-button nzType="primary" [style.margin.px]="24" (click)="closePopover.emit(false)">
            {{ i18n.checkListClose }}
          </button>
        </div>
      } @else {
        <div class="ant-check-list-header">
          <div class="ant-check-list-header-title">
            @if (!!title()) {
              <ng-container *nzStringTemplateOutlet="title()">{{ title() }}</ng-container>
            } @else {
              {{ i18n.checkList }}
            }
          </div>
          <div class="ant-check-list-header-extra">
            <nz-icon nzType="down" nzTheme="outline" (click)="closePopover.emit(false)" />
          </div>
        </div>
        @if (progress()) {
          <div class="ant-check-list-progressBar">
            <div class="ant-check-list-progressBar-progress">
              <nz-progress [nzPercent]="progressPercent() | number: '1.0-0'"></nz-progress>
            </div>
          </div>
        }
      }
      <div class="ant-check-list-steps-content">
        @for (item of items(); track item.key || item.description; let i = $index) {
          @let itemHighlight = index() === i + 1;
          <div
            class="ant-check-list-steps"
            [class.ant-check-list-highlight]="itemHighlight"
            [class.ant-check-list-checked]="item?.checked"
          >
            <div class="ant-check-list-steps-item">
              <div class="ant-check-list-steps-item-circle">
                @if (item?.checked) {
                  <nz-icon nzType="check" nzTheme="outline" class="ant-check-list-steps-checkoutlined" />
                } @else {
                  <div class="ant-check-list-steps-number">{{ i + 1 }}</div>
                }
              </div>
              <div class="ant-check-list-steps-item-description">{{ item.description }}</div>
            </div>
            @if (itemHighlight && !!item?.onClick) {
              <nz-icon
                nzType="arrow-right"
                nzTheme="outline"
                class="ant-check-list-steps-item-arrows"
                (click)="item.onClick?.(item)"
              />
            }
          </div>
        }
      </div>
      <div class="ant-check-list-footer" (click)="visible.set(false)">
        @if (!!footer()) {
          <ng-container *nzStringTemplateOutlet="footer()">{{ footer() }}</ng-container>
        } @else {
          {{ i18n.checkListFooter }}
        }
      </div>
    } @else {
      <div class="ant-check-list-close-check">
        <div class="ant-check-list-close-check-title">{{ i18n.checkListCheck }}</div>
        <div class="ant-check-list-close-check-action">
          <button nz-button nzType="primary" (click)="visible.set(false); hide.emit(checked)">{{ i18n.ok }}</button>
          <button nz-button (click)="visible.set(true)">{{ i18n.cancel }}</button>
        </div>
        <div class="ant-check-list-close-check-other">
          <label nz-checkbox [(ngModel)]="checked">{{ i18n.checkListCheckOther }}</label>
        </div>
      </div>
    }
  `,
  host: {
    class: 'ant-check-list-content'
  }
})
export class NzCheckListContentComponent {
  locale = input.required<NzCheckListI18nInterface>();
  items = input<NzItemProps[]>([]);
  index = input(0);
  progress = input(true);
  title = input<TemplateRef<void> | string | null>(null);
  footer = input<TemplateRef<void> | string | null>(null);
  readonly closePopover = output<boolean>();
  readonly hide = output<boolean>();

  protected checked = false;
  protected visible = signal(true);
  protected progressPercent = computed(() => {
    const index = Math.min(Math.max(this.index() - 1, 0), this.items().length);
    return (index / this.items().length) * 100;
  });
}
