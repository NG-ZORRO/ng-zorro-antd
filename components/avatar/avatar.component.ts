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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzConfigService, NzShapeSCType, NzSizeLDSType, NzUpdateHostClassService, WithConfig } from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'avatar';

@Component({
  selector: 'nz-avatar',
  exportAs: 'nzAvatar',
  template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
  host: {
    '[class]': 'classMap',
    '[style.width]': 'customSize',
    '[style.height]': 'customSize',
    '[style.line-height]': 'customSize',
    '[style.font-size]': '(hasIcon && customSize) ? (nzSize / 2 + "px") : null'
  },
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

  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: {};
  classMap: {};
  customSize: string | null = null;

  @ViewChild('textEl', { static: false }) textEl: ElementRef;

  private el: HTMLElement = this.elementRef.nativeElement;

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {}

  setClass(): void {
    this.classMap = {
      ['ant-avatar']: true,
      [`ant-avatar-lg`]: this.nzSize === 'large',
      [`ant-avatar-sm`]: this.nzSize === 'small',
      [`ant-avatar-${this.nzShape}`]: this.nzShape,
      [`ant-avatar-icon`]: this.nzIcon,
      [`ant-avatar-image`]: this.hasSrc // downgrade after image error
    };
    this.cdr.detectChanges();
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
      this.setClass();
      this.setSizeStyle();
      this.notifyCalc();
    }
  }

  ngOnChanges(): void {
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;
    this.hasSrc = !!this.nzSrc;

    this.setClass();
    this.setSizeStyle();
    this.notifyCalc();
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
    if (this.customSize) {
      Object.assign(this.textStyles, {
        lineHeight: this.customSize
      });
    }
    this.cdr.detectChanges();
  }

  private notifyCalc(): void {
    // If use ngAfterViewChecked, always demands more computations, so......
    if (this.platform.isBrowser) {
      setTimeout(() => {
        this.calcStringSize();
      });
    }
  }

  private setSizeStyle(): void {
    if (typeof this.nzSize === 'number') {
      this.customSize = `${this.nzSize}px`;
    } else {
      this.customSize = null;
    }
    this.cdr.markForCheck();
  }
}
