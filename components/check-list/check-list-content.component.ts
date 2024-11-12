/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
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
  imports: [NzIconModule, NzProgressModule, NzOutletModule, NzButtonModule, NzCheckboxModule, FormsModule, DecimalPipe],
  template: `
    @if (isVisible) {
      @if (getPercent() === 100) {
        <div class="ant-checklist-header-finish">
          <span nz-icon nzType="check-circle" nzTheme="outline" class="ant-checklist-header-finish-icon"></span>
          <h3 class="ant-checklist-header-finish-title">{{ locale.checkListFinish }}</h3>
          <button nz-button nzType="primary" style="margin: 24px" (click)="closePopover.emit(false)">{{
            locale.checkListClose
          }}</button>
        </div>
      } @else {
        <div class="ant-checklist-header">
          <div class="ant-checklist-header-title">
            @if (!!title) {
              <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
            } @else {
              {{ locale.checkList }}
            }
          </div>
          <div class="ant-checklist-header-extra">
            <span nz-icon nzType="down" nzTheme="outline" (click)="closePopover.emit(false)"></span>
          </div>
        </div>
        @if (progress) {
          <div class="ant-checklist-progressBar">
            <div class="ant-checklist-progressBar-progress">
              <nz-progress [nzPercent]="getPercent() | number: '1.0-0'"></nz-progress>
            </div>
          </div>
        }
      }
      <div class="ant-checklist-steps-content">
        @for (item of items; track item.key || item.description; let i = $index) {
          <div
            class="ant-checklist-steps"
            [class.ant-checklist-highlight]="index === i + 1"
            [class.ant-checklist-checked]="index > i + 1"
          >
            <div class="ant-checklist-steps-item">
              <div class="ant-checklist-steps-item-circle">
                @if (index > i + 1) {
                  <span nz-icon nzType="check" nzTheme="outline" class="ant-checklist-steps-checkoutlined"></span>
                } @else {
                  <div class="ant-checklist-steps-number">{{ i + 1 }}</div>
                }
              </div>
              <div class="ant-checklist-steps-item-description">{{ item.description }}</div>
            </div>
            @if (index === i + 1 && !!item.onClick) {
              <span
                nz-icon
                nzType="arrow-right"
                nzTheme="outline"
                class="ant-checklist-steps-item-arrows"
                (click)="item.onClick()"
              ></span>
            }
          </div>
        }
      </div>
      <div class="ant-checklist-footer" (click)="cancel(false)">
        @if (!!footer) {
          <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
        } @else {
          {{ locale.checkListFooter }}
        }
      </div>
    } @else {
      <div class="ant-checklist-close-check">
        <div class="ant-checklist-close-check-title">{{ locale.checkListCheck }}</div>
        <div class="ant-checklist-close-check-action">
          <button nz-button nzType="primary" (click)="clearModel()">{{ locale.ok }}</button>
          <button nz-button (click)="cancel(true)">{{ locale.cancel }}</button>
        </div>
        <div class="ant-checklist-close-check-other">
          <label nz-checkbox [(ngModel)]="checked">{{ locale.checkListCheckOther }}</label>
        </div>
      </div>
    }
  `,
  host: {
    class: 'ant-checklist-content'
  }
})
export class NzCheckListContentComponent {
  @Input() locale!: NzCheckListI18nInterface;
  @Input() items: NzItemProps[] = [];
  @Input() index: number = 0;
  @Input() title: TemplateRef<void> | string | null = null;
  @Input() progress: boolean = true;
  @Input() footer: TemplateRef<void> | string | null = null;
  @Output() readonly closePopover = new EventEmitter<boolean>();
  @Output() readonly hideCallback = new EventEmitter<boolean>();

  checked: boolean = false;
  isVisible: boolean = true;

  getPercent(): number {
    if (this.index <= 1) {
      return 0;
    } else if (this.index > this.items.length) {
      return 100;
    } else {
      return ((this.index - 1) / this.items.length) * 100;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  clearModel(): void {
    this.hideCallback.emit(this.checked);
  }

  cancel(visible: boolean): void {
    this.isVisible = visible;
    this.cdr.markForCheck();
  }
}
