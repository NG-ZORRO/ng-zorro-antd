/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny, NzSizeDSType } from 'ng-zorro-antd/core/types';

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
    @if (nzStatus || nzColor) {
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [style]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
    <ng-content />
    <ng-container *nzStringTemplateOutlet="nzCount">
      @if (showSup) {
        <nz-badge-sup
          [nzOffset]="nzOffset"
          [nzSize]="nzSize"
          [nzTitle]="nzTitle"
          [nzStyle]="nzStyle"
          [nzDot]="nzDot"
          [nzOverflowCount]="nzOverflowCount"
          [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
          [nzCount]="nzCount"
          [noAnimation]="!!noAnimation?.nzNoAnimation"
        />
      }
    </ng-container>
  `,
  host: {
    class: 'ant-badge',
    '[class.ant-badge-status]': 'nzStatus',
    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
  }
})
export class NzBadgeComponent implements OnChanges, OnInit {
  public nzConfigService = inject(NzConfigService);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef<HTMLElement>);

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  showSup = false;
  presetColor: string | null = null;

  readonly dir = nzInjectDirectionality(() => this.prepareBadgeForRtl());

  @Input({ transform: booleanAttribute }) nzShowZero: boolean = false;
  @Input({ transform: booleanAttribute }) nzShowDot = true;
  @Input({ transform: booleanAttribute }) nzStandalone = false;
  @Input({ transform: booleanAttribute }) nzDot = false;
  @Input() @WithConfig() nzOverflowCount: number = 99;
  @Input() @WithConfig() nzColor?: string = undefined;
  @Input() nzStyle: Record<string, string> | null = null;
  @Input() nzText?: string | TemplateRef<void> | null = null;
  @Input() nzTitle?: string | null | undefined;
  @Input() nzStatus?: NzBadgeStatusType | string;
  @Input() nzCount?: number | TemplateRef<NzSafeAny>;
  @Input() nzOffset?: [number, number];
  @Input() nzSize: NzSizeDSType = 'default';

  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });

  ngOnInit(): void {
    this.prepareBadgeForRtl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
    if (nzColor) {
      this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
    if (nzShowDot || nzDot || nzCount || nzShowZero) {
      this.showSup =
        (this.nzShowDot && this.nzDot) ||
        (typeof this.nzCount === 'number' && this.nzCount! > 0) ||
        (typeof this.nzCount === 'number' && this.nzCount! <= 0 && this.nzShowZero);
    }
  }

  private prepareBadgeForRtl(): void {
    if (this.dir.isRtl()) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-rtl');
    }
  }
}
