/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzCheckListI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { NzCheckListButtonComponent } from './check-list-button.component';
import { NzCheckListContentComponent } from './check-list-content.component';
import { NzItemProps } from './typings';

@Component({
  selector: 'nz-check-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NzCheckListButtonComponent, NzPopoverModule, NzCheckListContentComponent],
  providers: [NzDestroyService],
  template: `
    <nz-check-list-button
      [locale]="locale"
      [triggerRender]="nzTriggerRender"
      nz-popover
      [nzPopoverContent]="checklistTemplate"
      nzPopoverTrigger="click"
      nzPopoverPlacement="topRight"
      [nzPopoverOverlayClickable]="false"
      [nzPopoverVisible]="nzVisible"
      (nzPopoverVisibleChange)="popoverVisibleChange($event)"
    ></nz-check-list-button>
    <ng-template #checklistTemplate>
      <nz-check-list-content
        [locale]="locale"
        [items]="nzItems"
        [index]="nzIndex"
        [title]="nzTitle"
        [progress]="nzProgress"
        [footer]="nzFooter"
        (closePopover)="closePopover($event)"
        (hideCallback)="hideCallback($event)"
      ></nz-check-list-content>
    </ng-template>
  `,
  host: {
    class: 'ant-check-list',
    '[class.ant-check-list-hide]': `!nzShow`
  }
})
export class NzCheckListComponent implements OnInit {
  @Input() nzShow: boolean = true;
  @Input() nzItems: NzItemProps[] = [];
  @Input() nzVisible: boolean = false;
  @Input() nzIndex: number = 1;
  @Input() nzProgress: boolean = true;
  @Input() nzTriggerRender: TemplateRef<void> | string | null = null;
  @Input() nzTitle: TemplateRef<void> | string | null = null;
  @Input() nzFooter: TemplateRef<void> | string | null = null;
  @Output() readonly nzHideCallback = new EventEmitter<boolean>();

  private destroy$ = inject(NzDestroyService);
  locale!: NzCheckListI18nInterface;

  constructor(
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('CheckList');
      this.cdr.markForCheck();
    });
  }

  hideCallback(check: boolean): void {
    this.nzVisible = false;
    this.nzHideCallback.emit(check);
  }

  closePopover(visible: boolean): void {
    this.nzVisible = visible;
    this.cdr.markForCheck();
  }

  popoverVisibleChange(visible: boolean): void {
    this.nzVisible = visible;
    this.cdr.markForCheck();
  }
}
