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
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzSizeLDSType, NzSizeMap, NzUpdateHostClassService } from 'ng-zorro-antd/core';

export type NzAvatarShape = 'square' | 'circle';
export type NzAvatarSize = NzSizeLDSType | number;

export interface NzAvatarSizeMap {
  [size: string]: string;
}

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
  @Input() nzShape: NzAvatarShape = 'circle';
  @Input() nzSize: NzAvatarSize = 'default';
  @Input() nzText: string;
  @Input() nzSrc: string;
  @Input() nzIcon: string;

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

  imgError(): void {
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
    if (typeof this.nzSize === 'string') {
      return;
    }
    this.renderer.setStyle(this.el, 'width', `${this.nzSize}px`);
    this.renderer.setStyle(this.el, 'height', `${this.nzSize}px`);
    this.renderer.setStyle(this.el, 'line-height', `${this.nzSize}px`);
    if (this.hasIcon) {
      this.renderer.setStyle(this.el, 'font-size', `${this.nzSize / 2}px`);
    }
  }
}
