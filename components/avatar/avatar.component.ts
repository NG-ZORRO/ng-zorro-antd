/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  afterEveryRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzConfigKey, WithConfig } from 'ng-zorro-antd/core/config';
import { NzShapeSCType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'avatar';

/** https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading */
type NzAvatarLoading = 'eager' | 'lazy';

/** https://wicg.github.io/priority-hints/#idl-index */
type NzAvatarFetchPriority = 'high' | 'low' | 'auto';

@Component({
  selector: 'nz-avatar',
  exportAs: 'nzAvatar',
  imports: [NzIconModule],
  template: `
    @if (nzIcon && hasIcon) {
      <nz-icon [nzType]="nzIcon" />
    } @else if (nzSrc && hasSrc) {
      <img
        [src]="nzSrc"
        [attr.srcset]="nzSrcSet"
        [attr.alt]="nzAlt"
        [attr.loading]="nzLoading() || 'eager'"
        [attr.fetchpriority]="nzFetchPriority() || 'auto'"
        (error)="imgError($event)"
      />
    } @else if (nzText && hasText) {
      <span class="ant-avatar-string" #textEl>{{ nzText }}</span>
    }
    <ng-content></ng-content>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzAvatarComponent implements OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  @Input() @WithConfig() nzShape: NzShapeSCType = 'circle';
  @Input() @WithConfig() nzSize: NzSizeLDSType | number = 'default';
  @Input({ transform: numberAttribute }) @WithConfig() nzGap = 4;
  @Input() nzText?: string;
  @Input() nzSrc?: string;
  @Input() nzSrcSet?: string;
  @Input() nzAlt?: string;
  @Input() nzIcon?: string;
  readonly nzLoading = input<NzAvatarLoading>();
  readonly nzFetchPriority = input<NzAvatarFetchPriority>();
  @Output() readonly nzError = new EventEmitter<Event>();

  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  customSize: string | null = null;

  @ViewChild('textEl', { static: false }) textEl?: ElementRef<HTMLSpanElement>;

  private el: HTMLElement = inject(ElementRef).nativeElement;
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    afterEveryRender(() => this.calcStringSize());
  }

  imgError(event: Event): void {
    this.nzError.emit(event);
    if (!event.defaultPrevented) {
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
      this.calcStringSize();
    }
  }

  ngOnChanges(): void {
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;
    this.hasSrc = !!this.nzSrc;

    this.setSizeStyle();
    this.calcStringSize();
  }

  private calcStringSize(): void {
    if (!this.hasText || !this.textEl) {
      return;
    }

    const textEl = this.textEl.nativeElement;
    const childrenWidth = textEl.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect?.().width ?? 0;
    const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
    const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;

    textEl.style.transform = `scale(${scale}) translateX(-50%)`;
    textEl.style.lineHeight = this.customSize || '';
  }

  private setSizeStyle(): void {
    if (typeof this.nzSize === 'number') {
      this.customSize = toCssPixel(this.nzSize);
    } else {
      this.customSize = null;
    }

    this.cdr.markForCheck();
  }
}
