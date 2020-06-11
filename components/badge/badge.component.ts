/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ContentObserver } from '@angular/cdk/observers';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, isEmpty } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';

import { badgePresetColors } from './preset-colors';
import { NzBadgeStatusType } from './types';

const NZ_CONFIG_COMPONENT_NAME = 'backTop';

@Component({
  selector: 'nz-badge',
  exportAs: 'nzBadge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  template: `
    <span #contentElement><ng-content></ng-content></span>
    <span
      class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
      [style.background]="!presetColor && nzColor"
      *ngIf="nzStatus || nzColor"
      [ngStyle]="nzStyle"
    ></span>
    <span class="ant-badge-status-text" *ngIf="nzStatus || nzColor">{{ nzText }}</span>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <sup
        class="ant-scroll-number"
        *ngIf="showSup && viewInit"
        [@.disabled]="notWrapper"
        [@zoomBadgeMotion]
        [ngStyle]="nzStyle"
        [attr.title]="nzTitle === null ? '' : nzTitle || nzCount"
        [style.right.px]="nzOffset && nzOffset[0] ? -nzOffset[0] : null"
        [style.marginTop.px]="nzOffset && nzOffset[1] ? nzOffset[1] : null"
        [class.ant-badge-count]="!nzDot"
        [class.ant-badge-dot]="nzDot"
        [class.ant-badge-multiple-words]="countArray.length >= 2"
      >
        <ng-container *ngFor="let n of maxNumberArray; let i = index">
          <span
            class="ant-scroll-number-only"
            *ngIf="count <= nzOverflowCount"
            [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
          >
            <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
              <p *ngFor="let p of countSingleArray" class="ant-scroll-number-only-unit" [class.current]="p === countArray[i]">
                {{ p }}
              </p>
            </ng-container>
          </span>
        </ng-container>
        <ng-container *ngIf="count > nzOverflowCount">{{ nzOverflowCount }}+</ng-container>
      </sup>
    </ng-container>
  `,
  host: {
    class: 'ant-badge',
    '[class.ant-badge-status]': 'nzStatus'
  }
})
export class NzBadgeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  static ngAcceptInputType_nzShowZero: BooleanInput;
  static ngAcceptInputType_nzShowDot: BooleanInput;
  static ngAcceptInputType_nzDot: BooleanInput;

  private destroy$ = new Subject();
  notWrapper = true;
  viewInit = false;
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  presetColor: string | null = null;
  count: number = 0;
  @ViewChild('contentElement', { static: false }) contentElement?: ElementRef;
  @Input() @InputBoolean() nzShowZero: boolean = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzDot = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzOverflowCount: number = 99;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzColor?: string = undefined;
  @Input() nzStyle: { [key: string]: string } | null = null;
  @Input() nzText?: string;
  @Input() nzTitle?: string | null | undefined;
  @Input() nzStatus?: NzBadgeStatusType | string;
  @Input() nzCount?: number | TemplateRef<NzSafeAny>;
  @Input() nzOffset?: [number, number];

  checkContent(): void {
    this.notWrapper = isEmpty(this.contentElement?.nativeElement);
    if (this.notWrapper) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    }
  }

  get showSup(): boolean {
    return (this.nzShowDot && this.nzDot) || this.count > 0 || (this.count === 0 && this.nzShowZero);
  }

  generateMaxNumberArray(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  constructor(
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private contentObserver: ContentObserver,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngAfterViewInit(): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.viewInit = true;
      this.cdr.detectChanges();
    });

    this.contentObserver
      .observe(this.contentElement!)
      .pipe(startWith(true), takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkContent();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOverflowCount, nzCount, nzColor } = changes;
    if (nzCount && !(nzCount.currentValue instanceof TemplateRef)) {
      this.count = Math.max(0, nzCount.currentValue);
      this.countArray = this.count
        .toString()
        .split('')
        .map(item => +item);
    }
    if (nzOverflowCount) {
      this.generateMaxNumberArray();
    }
    if (nzColor) {
      this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
