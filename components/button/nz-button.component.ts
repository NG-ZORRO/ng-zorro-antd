/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  ViewEncapsulation
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import {
  findFirstNotEmptyNode,
  findLastNotEmptyNode,
  isEmpty,
  InputBoolean,
  NzSizeLDSType,
  NzSizeMap,
  NzUpdateHostClassService,
  NzWaveConfig,
  NzWaveDirective,
  NZ_WAVE_GLOBAL_CONFIG
} from 'ng-zorro-antd/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

export type NzButtonType = 'primary' | 'dashed' | 'danger' | 'default';
export type NzButtonShape = 'circle' | 'round' | null;

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
  readonly el: HTMLElement = this.elementRef.nativeElement;
  private iconElement: HTMLElement;
  private iconOnly = false;
  @ViewChild('contentElement') contentElement: ElementRef;
  @ContentChildren(NzIconDirective, { read: ElementRef }) listOfIconElement: QueryList<ElementRef>;
  @HostBinding('attr.nz-wave') nzWave = new NzWaveDirective(
    this.ngZone,
    this.elementRef,
    this.waveConfig,
    this.animationType
  );
  @Input() @InputBoolean() nzBlock = false;
  @Input() @InputBoolean() nzGhost = false;
  @Input() @InputBoolean() nzSearch = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() nzType: NzButtonType = 'default';
  @Input() nzShape: NzButtonShape = null;
  @Input() nzSize: NzSizeLDSType = 'default';

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
  setClassMap(): void {
    const prefixCls = 'ant-btn';
    const sizeMap: NzSizeMap = { large: 'lg', small: 'sm' };
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [`${prefixCls}-${this.nzType}`]: this.nzType,
      [`${prefixCls}-${this.nzShape}`]: this.nzShape,
      [`${prefixCls}-${sizeMap[this.nzSize]}`]: sizeMap[this.nzSize],
      [`${prefixCls}-loading`]: this.nzLoading,
      [`${prefixCls}-icon-only`]: this.iconOnly,
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
    this.cdr.detectChanges();
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
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private ngZone: NgZone,
    @Optional() @Inject(NZ_WAVE_GLOBAL_CONFIG) private waveConfig: NzWaveConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-btn');
  }

  ngAfterContentInit(): void {
    this.checkContent();
  }

  ngOnInit(): void {
    this.setClassMap();
    this.nzWave.ngOnInit();
  }

  ngOnDestroy(): void {
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
  }
}
