/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  NzConfigService,
  NzShapeSCType,
  NzSizeLDSType,
  NzSizeMap,
  NzUpdateHostClassService,
  WithConfig
} from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'avatar';

@Component({
  selector: 'nz-avatar',
  exportAs: 'nzAvatar',
  templateUrl: './nz-avatar.component.html',
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzAvatarComponent implements OnChanges {
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'circle') nzShape: NzShapeSCType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeLDSType | number;
  @Input() nzText: string;
  @Input() nzSrc: string;
  @Input() nzSrcSet: string;
  @Input() nzAlt: string;
  @Input() nzIcon: string;
  @Output() readonly nzError = new EventEmitter<Event>();

  oldAPIIcon = true; // Make the user defined icon compatible to old API. Should be removed in 2.0.
  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: {};

  @ViewChild('textEl', { static: false }) textEl: ElementRef;

  private el: HTMLElement = this.elementRef.nativeElement;
  private prefixCls = 'ant-avatar';
  private sizeMap: NzSizeMap = { large: 'lg', small: 'sm' };

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private updateHostClassService: NzUpdateHostClassService,
    private renderer: Renderer2,
    private platform: Platform
  ) {}

  setClass(): this {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-${this.sizeMap[this.nzSize]}`]: this.sizeMap[this.nzSize],
      [`${this.prefixCls}-${this.nzShape}`]: this.nzShape,
      [`${this.prefixCls}-icon`]: this.nzIcon,
      [`${this.prefixCls}-image`]: this.hasSrc // downgrade after image error
    };
    this.updateHostClassService.updateHostClass(this.el, classMap);
    this.cd.detectChanges();
    return this;
  }

  imgError($event: Event): void {
    this.nzError.emit($event);
    if (!$event.defaultPrevented) {
      this.hasSrc = false;
      this.hasIcon = false;
      this.hasText = false;
      if (this.nzIcon) {
        this.hasIcon = true;
      } else if (this.nzText) {
        this.hasText = true;
      }
      this.setClass().notifyCalc();
      this.setSizeStyle();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzIcon') && changes.nzIcon.currentValue) {
      this.oldAPIIcon = changes.nzIcon.currentValue.indexOf('anticon') > -1;
    }
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;
    this.hasSrc = !!this.nzSrc;

    this.setClass().notifyCalc();
    this.setSizeStyle();
  }

  private calcStringSize(): void {
    if (!this.hasText) {
      return;
    }

    const childrenWidth = this.textEl.nativeElement.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect().width;
    const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
    this.textStyles = {
      transform: `scale(${scale}) translateX(-50%)`
    };
    if (typeof this.nzSize === 'number') {
      Object.assign(this.textStyles, {
        lineHeight: `${this.nzSize}px`
      });
    }
    this.cd.detectChanges();
  }

  private notifyCalc(): this {
    // If use ngAfterViewChecked, always demands more computations, so......
    if (this.platform.isBrowser) {
      setTimeout(() => {
        this.calcStringSize();
      });
    }
    return this;
  }

  private setSizeStyle(): void {
    const size = typeof this.nzSize === 'string' ? this.nzSize : `${this.nzSize}px`;
    this.renderer.setStyle(this.el, 'width', size);
    this.renderer.setStyle(this.el, 'height', size);
    this.renderer.setStyle(this.el, 'line-height', size);
    if (this.hasIcon) {
      this.renderer.setStyle(this.el, 'font-size', `calc(${size} / 2)`);
    }
  }
}
