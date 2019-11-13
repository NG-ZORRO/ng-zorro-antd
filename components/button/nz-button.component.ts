/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ContentObserver } from '@angular/cdk/observers';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  ViewRef
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import {
  findFirstNotEmptyNode,
  findLastNotEmptyNode,
  isEmpty,
  InputBoolean,
  NzConfigService,
  NzSizeLDSType,
  NzSizeMap,
  NzUpdateHostClassService,
  NzWaveConfig,
  NzWaveDirective,
  NZ_WAVE_GLOBAL_CONFIG,
  WithConfig
} from 'ng-zorro-antd/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

export type NzButtonType = 'primary' | 'dashed' | 'danger' | 'default' | 'link';
export type NzButtonShape = 'circle' | 'round' | null;

const NZ_CONFIG_COMPONENT_NAME = 'button';

@Component({
  selector: '[nz-button]',
  exportAs: 'nzButton',
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-button.component.html'
})
export class NzButtonComponent implements AfterContentInit, OnInit, OnDestroy, OnChanges {
  @ViewChild('contentElement', { static: true }) contentElement: ElementRef;
  @ContentChildren(NzIconDirective, { read: ElementRef }) listOfIconElement: QueryList<ElementRef>;
  @HostBinding('attr.nz-wave') nzWave = new NzWaveDirective(
    this.ngZone,
    this.elementRef,
    this.waveConfig,
    this.animationType
  );

  @Input() @InputBoolean() nzBlock: boolean = false;
  @Input() @InputBoolean() nzGhost: boolean = false;
  @Input() @InputBoolean() nzSearch: boolean = false;
  @Input() @InputBoolean() nzLoading: boolean = false;
  @Input() nzType: NzButtonType = 'default';
  @Input() nzShape: NzButtonShape = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeLDSType;

  readonly el: HTMLElement = this.elementRef.nativeElement;
  isInDropdown = false;
  private iconElement: HTMLElement;
  private iconOnly = false;
  private destroy$ = new Subject<void>();

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
  setClassMap(): void {
    const prefixCls = 'ant-btn';
    const sizeMap: NzSizeMap = { large: 'lg', small: 'sm' };
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [`${prefixCls}-${this.nzType}`]: this.nzType,
      [`${prefixCls}-${this.nzShape}`]: this.nzShape,
      [`${prefixCls}-${sizeMap[this.nzSize]}`]: sizeMap[this.nzSize],
      [`${prefixCls}-loading`]: this.nzLoading,
      [`${prefixCls}-icon-only`]: this.iconOnly && !this.nzSearch && !this.isInDropdown,
      [`${prefixCls}-background-ghost`]: this.nzGhost,
      [`${prefixCls}-block`]: this.nzBlock,
      [`ant-input-search-button`]: this.nzSearch
    });
  }

  updateIconDisplay(value: boolean): void {
    if (this.iconElement) {
      this.renderer.setStyle(this.iconElement, 'display', value ? 'none' : 'inline-block');
    }
  }

  checkContent(): void {
    const hasIcon = this.listOfIconElement && this.listOfIconElement.length;
    if (hasIcon) {
      this.moveIcon();
    }
    this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
    /** https://github.com/angular/angular/issues/12530 **/
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
      this.iconOnly = !!hasIcon;
    } else {
      this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
      this.iconOnly = false;
    }
    this.setClassMap();
    this.updateIconDisplay(this.nzLoading);
    if (!(this.cdr as ViewRef).destroyed) {
      this.cdr.detectChanges();
    }
  }

  moveIcon(): void {
    if (this.listOfIconElement && this.listOfIconElement.length) {
      const firstChildElement = findFirstNotEmptyNode(this.contentElement.nativeElement);
      const lastChildElement = findLastNotEmptyNode(this.contentElement.nativeElement);
      if (firstChildElement && firstChildElement === this.listOfIconElement.first.nativeElement) {
        this.renderer.insertBefore(this.el, firstChildElement, this.contentElement.nativeElement);
        this.iconElement = firstChildElement as HTMLElement;
      } else if (lastChildElement && lastChildElement === this.listOfIconElement.last.nativeElement) {
        this.renderer.appendChild(this.el, lastChildElement);
      }
    }
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private contentObserver: ContentObserver,
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private ngZone: NgZone,
    public nzConfigService: NzConfigService,
    @Optional() @Inject(NZ_WAVE_GLOBAL_CONFIG) private waveConfig: NzWaveConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-btn');
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setClassMap();
        this.cdr.markForCheck();
      });
  }

  ngAfterContentInit(): void {
    this.contentObserver
      .observe(this.contentElement)
      .pipe(
        startWith(true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079
        Promise.resolve().then(() => this.checkContent());
      });
  }

  ngOnInit(): void {
    this.setClassMap();
    this.nzWave.ngOnInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.nzWave.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.nzBlock ||
      changes.nzGhost ||
      changes.nzSearch ||
      changes.nzType ||
      changes.nzShape ||
      changes.nzSize ||
      changes.nzLoading
    ) {
      this.setClassMap();
    }
    if (changes.nzLoading) {
      this.updateIconDisplay(this.nzLoading);
    }
    if (changes.nzType && changes.nzType.currentValue === 'link') {
      this.nzWave.disable();
    } else {
      this.nzWave.enable();
    }
  }
}
