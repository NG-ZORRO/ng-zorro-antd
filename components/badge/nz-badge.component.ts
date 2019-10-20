/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
import { isEmpty, zoomBadgeMotion, InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';

export type NzBadgeStatusType = 'success' | 'processing' | 'default' | 'error' | 'warning';

const NZ_CONFIG_COMPONENT_NAME = 'backTop';

@Component({
  selector: 'nz-badge',
  exportAs: 'nzBadge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  templateUrl: './nz-badge.component.html',
  host: {
    '[class.ant-badge-status]': 'nzStatus'
  }
})
export class NzBadgeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private destroy$ = new Subject();
  notWrapper = true;
  viewInit = false;
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  colorArray = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
  ];
  presetColor: string | null = null;
  count: number;
  @ViewChild('contentElement', { static: false }) contentElement: ElementRef;
  @Input() @InputBoolean() nzShowZero: boolean = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzDot = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 99) nzOverflowCount: number;
  @Input() nzText: string;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzColor: string;
  @Input() nzTitle: string;
  @Input() nzStyle: { [key: string]: string };
  @Input() nzStatus: NzBadgeStatusType;
  @Input() nzCount: number | TemplateRef<void>;
  @Input() nzOffset: [number, number];

  checkContent(): void {
    this.notWrapper = isEmpty(this.contentElement.nativeElement);
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
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-badge');
  }

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngAfterViewInit(): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.viewInit = true;
      this.cdr.markForCheck();
    });

    this.contentObserver
      .observe(this.contentElement)
      .pipe(
        startWith(true),
        takeUntil(this.destroy$)
      )
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
      this.presetColor = this.colorArray.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
