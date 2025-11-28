/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { ThemeType } from '@ant-design/icons-angular';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

import { DefaultTooltipIcon, NzFormDirective, NzLabelAlignType } from './form.directive';

export interface NzFormTooltipIcon {
  type: NzTSType;
  theme: ThemeType;
}

function toTooltipIcon(value: string | NzFormTooltipIcon): Required<NzFormTooltipIcon> {
  const icon = typeof value === 'string' ? { type: value } : value;
  return { ...DefaultTooltipIcon, ...icon };
}

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [attr.for]="nzFor"
      [class.ant-form-item-no-colon]="nzNoColon"
      [class.ant-form-item-required]="nzRequired"
      [class.ant-form-item-required-mark-optional]="nzRequiredMark?.() === 'optional' || isNzRequiredMarkTemplate()"
      [class.ant-form-item-required-mark-hidden]="nzRequiredMark?.() === false"
    >
      <ng-template #labelTemplate>
        <ng-content />
        @if (nzTooltipTitle) {
          <span class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
            <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
              <nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme" />
            </ng-container>
          </span>
        }
        @if (nzRequiredMark?.() === 'optional' && !nzRequired) {
          <span class="ant-form-item-optional">{{ 'Form.optional' | nzI18n }}</span>
        }
      </ng-template>

      @if (isNzRequiredMarkTemplate()) {
        <ng-container
          *ngTemplateOutlet="$any(nzRequiredMark!()); context: { required: nzRequired, $implicit: labelTemplate }"
        />
      } @else {
        <ng-container *ngTemplateOutlet="labelTemplate" />
      }
    </label>
  `,
  host: {
    class: 'ant-form-item-label',
    '[class.ant-form-item-label-left]': `nzLabelAlign === 'left'`,
    '[class.ant-form-item-label-wrap]': `nzLabelWrap`
  },
  imports: [NzOutletModule, NzTooltipDirective, NzIconModule, NgTemplateOutlet, NzI18nModule]
})
export class NzFormLabelComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input() nzFor?: string;
  @Input({ transform: booleanAttribute }) nzRequired = false;
  @Input({ transform: booleanAttribute })
  set nzNoColon(value: boolean) {
    this.noColon = value;
  }
  get nzNoColon(): boolean {
    return this.noColon !== 'default' ? this.noColon : !!this.nzFormDirective?.nzNoColon;
  }

  private noColon: boolean | 'default' = 'default';

  @Input() nzTooltipTitle?: NzTSType;
  @Input()
  set nzTooltipIcon(value: string | NzFormTooltipIcon) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon(): NzFormTooltipIcon {
    return this._tooltipIcon !== 'default'
      ? this._tooltipIcon
      : toTooltipIcon(this.nzFormDirective?.nzTooltipIcon || DefaultTooltipIcon);
  }
  private _tooltipIcon: NzFormTooltipIcon | 'default' = 'default';

  @Input()
  set nzLabelAlign(value: NzLabelAlignType) {
    this.labelAlign = value;
  }

  get nzLabelAlign(): NzLabelAlignType {
    return this.labelAlign !== 'default' ? this.labelAlign : this.nzFormDirective?.nzLabelAlign || 'right';
  }

  private labelAlign: NzLabelAlignType | 'default' = 'default';

  @Input({ transform: booleanAttribute })
  set nzLabelWrap(value: boolean) {
    this.labelWrap = value;
  }

  get nzLabelWrap(): boolean {
    return this.labelWrap !== 'default' ? this.labelWrap : !!this.nzFormDirective?.nzLabelWrap;
  }

  private labelWrap: boolean | 'default' = 'default';

  private nzFormDirective = inject(NzFormDirective, { skipSelf: true, optional: true });

  protected readonly nzRequiredMark = this.nzFormDirective?.nzRequiredMark;

  protected readonly isNzRequiredMarkTemplate = computed(() => isTemplateRef(this.nzRequiredMark?.()));

  constructor() {
    if (this.nzFormDirective) {
      this.nzFormDirective
        .getInputObservable('nzNoColon')
        .pipe(
          filter(() => this.noColon === 'default'),
          takeUntilDestroyed()
        )
        .subscribe(() => this.cdr.markForCheck());

      this.nzFormDirective
        .getInputObservable('nzTooltipIcon')
        .pipe(
          filter(() => this._tooltipIcon === 'default'),
          takeUntilDestroyed()
        )
        .subscribe(() => this.cdr.markForCheck());

      this.nzFormDirective
        .getInputObservable('nzLabelAlign')
        .pipe(
          filter(() => this.labelAlign === 'default'),
          takeUntilDestroyed()
        )
        .subscribe(() => this.cdr.markForCheck());

      this.nzFormDirective
        .getInputObservable('nzLabelWrap')
        .pipe(
          filter(() => this.labelWrap === 'default'),
          takeUntilDestroyed()
        )
        .subscribe(() => this.cdr.markForCheck());
    }
  }
}
