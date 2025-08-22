/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzCheckListI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { NzCheckListButtonComponent } from './check-list-button.component';
import { NzCheckListContentComponent } from './check-list-content.component';
import { NzItemProps } from './typings';

@Component({
  selector: 'nz-check-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NzPopoverModule,
    NzIconModule,
    NzOutletModule,
    NzCheckListButtonComponent,
    NzCheckListContentComponent,
    DecimalPipe
  ],
  template: `
    <nz-check-list-button
      nz-popover
      [nzPopoverContent]="checklistTemplate"
      nzPopoverTrigger="click"
      nzPopoverPlacement="topRight"
      [nzPopoverOverlayClickable]="false"
      [nzPopoverVisible]="visible()"
      (nzPopoverVisibleChange)="visible.set($event)"
    >
      @if (!!nzTriggerRender()) {
        <ng-container *nzStringTemplateOutlet="nzTriggerRender()">{{ nzTriggerRender() }}</ng-container>
      } @else {
        <nz-icon nzType="check-circle" nzTheme="outline" class="ant-check-list-icon" />
        <div class="ant-check-list-description">{{ locale().checkList }}</div>
      }
      @if (!visible() && !!unfinished()) {
        <div class="ant-check-list-trigger-dot">
          <div class="ant-check-list-trigger-dot-text">{{ unfinished() | number: '1.0-0' }}</div>
        </div>
      }
    </nz-check-list-button>
    <ng-template #checklistTemplate>
      <nz-check-list-content
        [locale]="locale()"
        [items]="nzItems()"
        [index]="nzIndex()"
        [title]="nzTitle()"
        [progress]="nzProgress()"
        [footer]="nzFooter()"
        (closePopover)="visible.set($event)"
        (hide)="visible.set($event); nzHide.emit($event)"
      ></nz-check-list-content>
    </ng-template>
  `,
  host: {
    class: 'ant-check-list'
  }
})
export class NzCheckListComponent {
  nzItems = input<NzItemProps[]>([]);
  nzVisible = input(false);
  nzIndex = input(1);
  nzProgress = input(true);
  nzTriggerRender = input<TemplateRef<void> | string | null>(null);
  nzTitle = input<TemplateRef<void> | string | null>(null);
  nzFooter = input<TemplateRef<void> | string | null>(null);
  readonly nzHide = output<boolean>();
  protected unfinished = computed(() => {
    this.visible();
    return this.nzItems().filter(item => !item?.checked).length;
  });
  protected visible = linkedSignal(this.nzVisible);
  private i18n = inject(NzI18nService);
  locale = toSignal<NzCheckListI18nInterface>(
    this.i18n.localeChange.pipe(map(() => this.i18n.getLocaleData('CheckList'))),
    { requireSync: true }
  );
}
