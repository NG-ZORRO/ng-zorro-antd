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
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NzSafeAny, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { badgePresetColors } from './preset-colors';
import { NzBadgeStatusType } from './types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'badge';

@Component({
  selector: 'nz-badge',
  exportAs: 'nzBadge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzSize]="nzSize"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor || noAnimation?.nzNoAnimation)"
        [nzCount]="nzCount"
        [noAnimation]="!!noAnimation?.nzNoAnimation"
      ></nz-badge-sup>
    </ng-container>
  `,
  host: {
    class: 'ant-badge',
    '[class.ant-badge-status]': 'nzStatus',
    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
  }
})
export class NzBadgeComponent implements OnChanges, OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzShowZero: BooleanInput;
  static ngAcceptInputType_nzShowDot: BooleanInput;
  static ngAcceptInputType_nzDot: BooleanInput;
  static ngAcceptInputType_nzStandalone: BooleanInput;
  showSup = false;
  presetColor: string | null = null;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  @Input() @InputBoolean() nzShowZero: boolean = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzStandalone = false;
  @Input() @InputBoolean() nzDot = false;
  @Input() @WithConfig() nzOverflowCount: number = 99;
  @Input() @WithConfig() nzColor?: string = undefined;
  @Input() nzStyle: { [key: string]: string } | null = null;
  @Input() nzText?: string | TemplateRef<void> | null = null;
  @Input() nzTitle?: string | null | undefined;
  @Input() nzStatus?: NzBadgeStatusType | string;
  @Input() nzCount?: number | TemplateRef<NzSafeAny>;
  @Input() nzOffset?: [number, number];
  @Input() nzSize: NzSizeDSType = 'default';

  constructor(
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
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
      this.showSup = (this.nzShowDot && this.nzDot) || this.nzCount! > 0 || (this.nzCount! <= 0 && this.nzShowZero);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
