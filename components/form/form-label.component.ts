/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BooleanInput, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';

import { DefaultTooltipIcon, NzFormDirective } from './form.directive';
import { NzFormLabelAlign, NzFormTooltipIcon } from './types';

function toTooltipIcon(value?: string | NzFormTooltipIcon): Required<NzFormTooltipIcon> {
  const icon = typeof value === 'string' ? { type: value } : value;
  return { ...DefaultTooltipIcon, ...icon };
}

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-form-item-label-left]': 'nzAlign === "left"'
  },
  template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      <span *ngIf="nzTooltipTitle" class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
        <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></i>
        </ng-container>
      </span>
    </label>
  `
})
export class NzFormLabelComponent implements OnDestroy {
  static ngAcceptInputType_nzRequired: BooleanInput;
  static ngAcceptInputType_nzNoColon: BooleanInput;

  @Input() set nzAlign(value: NzFormLabelAlign | undefined) {
    if (value) {
      this.align = value;
    }
  }
  get nzAlign(): NzFormLabelAlign | undefined {
    return this.align !== 'default' ? this.align : this.nzFormDirective?.nzLabelAlign;
  }
  private align: NzFormLabelAlign | 'default' = 'default';

  @Input() nzFor?: string;
  @Input() @InputBoolean() nzRequired = false;
  @Input()
  set nzNoColon(value: boolean | undefined) {
    if (value !== undefined) {
      this.noColon = toBoolean(value);
    }
  }
  get nzNoColon(): boolean | undefined {
    return this.noColon !== 'default' ? this.noColon : this.nzFormDirective?.nzNoColon;
  }

  private noColon: boolean | 'default' = 'default';

  @Input() nzTooltipTitle?: NzTSType;
  @Input()
  set nzTooltipIcon(value: string | NzFormTooltipIcon | undefined) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon(): NzFormTooltipIcon {
    return this._tooltipIcon !== 'default'
      ? this._tooltipIcon
      : toTooltipIcon(this.nzFormDirective?.nzTooltipIcon || DefaultTooltipIcon);
  }
  private _tooltipIcon: NzFormTooltipIcon | 'default' = 'default';
  private destroy$ = new Subject();

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() @SkipSelf() private nzFormDirective: NzFormDirective
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');

    if (this.nzFormDirective) {
      this.nzFormDirective
        .getInputObservable('nzLabelAlign')
        .pipe(
          filter(() => this.align === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());

      this.nzFormDirective
        .getInputObservable('nzNoColon')
        .pipe(
          filter(() => this.noColon === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());

      this.nzFormDirective
        .getInputObservable('nzTooltipIcon')
        .pipe(
          filter(() => this._tooltipIcon === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
