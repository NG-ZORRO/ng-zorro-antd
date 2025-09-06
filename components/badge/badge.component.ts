/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    @if ((nzStatus || nzColor) && !showSup && !nzCount) {
      <span
        class="ant-badge-status-dot"
        [class]="(nzStatus || presetColor) && 'ant-badge-status-' + (nzStatus || presetColor)"
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
          [isPresetColor]="nzStatus || presetColor"
          [nzColor]="nzStatus || presetColor || nzColor"
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
    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || ((nzStatus || nzColor) && !showSup && !nzCount))'
  }
})
export class NzBadgeComponent implements OnChanges, OnInit {
  public nzConfigService = inject(NzConfigService);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef<HTMLElement>);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  showSup = false;
  presetColor: string | null = null;
  dir: Direction = 'ltr';

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
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.prepareBadgeForRtl();
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
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
    if (this.isRtlLayout) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-rtl');
    }
  }

  get isRtlLayout(): boolean {
    return this.dir === 'rtl';
  }
}
