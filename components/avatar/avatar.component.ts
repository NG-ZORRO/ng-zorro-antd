/**
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

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import {
  NgClassInterface,
  NgStyleInterface,
  NumberInput,
  NzShapeSCType,
  NzSizeLDSType
} from 'ng-zorro-antd/core/types';
import { InputNumber } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'avatar';

@Component({
  selector: 'nz-avatar',
  exportAs: 'nzAvatar',
  template: `
    <span nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></span>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
  host: {
    class: 'ant-avatar',
    '[class.ant-avatar-lg]': `nzSize === 'large'`,
    '[class.ant-avatar-sm]': `nzSize === 'small'`,
    '[class.ant-avatar-square]': `nzShape === 'square'`,
    '[class.ant-avatar-circle]': `nzShape === 'circle'`,
    '[class.ant-avatar-icon]': `nzIcon`,
    '[class.ant-avatar-image]': `hasSrc `,
    '[style.width]': 'customSize',
    '[style.height]': 'customSize',
    '[style.line-height]': 'customSize',
    // nzSize type is number when customSize is true
    '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzAvatarComponent implements OnChanges {
  static ngAcceptInputType_nzGap: NumberInput;

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  @Input() @WithConfig() nzShape: NzShapeSCType = 'circle';
  @Input() @WithConfig() nzSize: NzSizeLDSType | number = 'default';
  @Input() @WithConfig() @InputNumber() nzGap = 4;
  @Input() nzText?: string;
  @Input() nzSrc?: string;
  @Input() nzSrcSet?: string;
  @Input() nzAlt?: string;
  @Input() nzIcon?: string;
  @Output() readonly nzError = new EventEmitter<Event>();

  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: NgStyleInterface = {};
  classMap: NgClassInterface = {};
  customSize: string | null = null;

  @ViewChild('textEl', { static: false }) textEl?: ElementRef;

  private el: HTMLElement = this.elementRef.nativeElement;

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {}

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
      this.cdr.detectChanges();
      this.setSizeStyle();
      this.notifyCalc();
    }
  }

  ngOnChanges(): void {
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;
    this.hasSrc = !!this.nzSrc;

    this.setSizeStyle();
    this.notifyCalc();
  }

  private calcStringSize(): void {
    if (!this.hasText) {
      return;
    }

    const childrenWidth = this.textEl!.nativeElement.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect().width;
    const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
    const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;

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
