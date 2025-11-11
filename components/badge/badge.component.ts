/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NgStyleInterface, NzSafeAny, NzSizeDSType } from 'ng-zorro-antd/core/types';

import { NzBadgeSupComponent } from './badge-sup.component';
import { badgePresetColors } from './preset-colors';
import { NzBadgeStatusType } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'badge';

@Component({
  selector: 'nz-badge',
  exportAs: 'nzBadge',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  imports: [NzBadgeSupComponent, NzOutletModule],
  template: `
    @if ((nzStatus || nzColor) && !showSup && !nzCount) {
      <span
        class="ant-badge-status-dot"
        [class]="(nzStatus || presetColor) && 'ant-badge-status-' + (nzStatus || presetColor)"
        [style]="mergedStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
    <ng-content />
    <ng-container *nzStringTemplateOutlet="nzCount">
      @if (showSup) {
        <nz-badge-sup
          [isPresetColor]="nzStatus || presetColor"
          [nzColor]="nzStatus || presetColor || nzColor"
          [nzOffset]="nzOffset"
          [nzSize]="nzSize"
          [nzTitle]="nzTitle"
          [nzStyle]="mergedStyle"
          [nzDot]="nzDot"
          [nzCount]="nzCount"
          [nzOverflowCount]="nzOverflowCount"
          [disableAnimation]="!!(nzStandalone || nzStatus || presetColor || noAnimation?.nzNoAnimation)"
          [noAnimation]="!!noAnimation?.nzNoAnimation"
        />
      }
    </ng-container>
  `,
  host: {
    class: 'ant-badge',
    '[class.ant-badge-status]': 'nzStatus',
    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || ((nzStatus || nzColor) && !showSup && !nzCount))',
    '[class.ant-badge-rtl]': 'dir() === "rtl"'
  }
})
export class NzBadgeComponent implements OnChanges {
  public readonly nzConfigService = inject(NzConfigService);
  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  showSup = false;
  presetColor: string | null = null;

  @Input({ transform: booleanAttribute }) nzShowZero = false;
  @Input({ transform: booleanAttribute }) nzShowDot = true;
  @Input({ transform: booleanAttribute }) nzStandalone = false;
  @Input({ transform: booleanAttribute }) nzDot = false;
  @Input() @WithConfig() nzOverflowCount: number = 99;
  @Input() @WithConfig() nzColor?: string;
  @Input() nzStyle: NgStyleInterface | null = null;
  @Input() nzText?: string | TemplateRef<void> | null = null;
  @Input() nzTitle?: string | null | undefined;
  @Input() nzStatus?: NzBadgeStatusType | string;
  @Input() nzCount?: number | TemplateRef<NzSafeAny>;
  @Input() nzOffset?: [number, number];
  @Input() nzSize: NzSizeDSType = 'default';

  protected get mergedStyle(): NgStyleInterface {
    return { backgroundColor: !this.presetColor && this.nzColor, ...(this.nzStyle ?? {}) };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
    if (nzColor) {
      this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
    if (nzShowDot || nzDot || nzCount || nzShowZero) {
      this.showSup =
        (this.nzShowDot && this.nzDot) || (typeof this.nzCount === 'number' && (this.nzCount > 0 || this.nzShowZero));
    }
  }
}
