/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  afterEveryRender,
  ChangeDetectorRef,
  computed,
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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

import { NzConfigKey, withConfigFactory, WithConfig } from 'ng-zorro-antd/core/config';
import {
  gridResponsiveMap,
  NzBreakpointEnum,
  NzBreakpointService,
  type Breakpoint,
  type ResponsiveLike
} from 'ng-zorro-antd/core/services';
import type { NzShapeSCType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { isPlainObject, toCssPixel } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'avatar';
const withConfig = withConfigFactory(NZ_CONFIG_MODULE_NAME);
export type NzAvatarSize = NzSizeLDSType | number | Partial<ResponsiveLike<number>>;

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
    <ng-content />
  `,
  host: {
    class: 'ant-avatar',
    '[class.ant-avatar-lg]': `size() === 'large'`,
    '[class.ant-avatar-sm]': `size() === 'small'`,
    '[class.ant-avatar-square]': `nzShape === 'square'`,
    '[class.ant-avatar-circle]': `nzShape === 'circle'`,
    '[class.ant-avatar-icon]': `nzIcon`,
    '[class.ant-avatar-image]': `hasSrc `,
    '[style.width]': 'customSize()',
    '[style.height]': 'customSize()',
    '[style.line-height]': 'customSize()',
    '[style.font-size.px]': 'hasIcon ? customFontSize() : null'
  },
  encapsulation: ViewEncapsulation.None
})
export class NzAvatarComponent implements OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  @Input() @WithConfig() nzShape: NzShapeSCType = 'circle';
  readonly nzSize = input<NzAvatarSize>();
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

  private el: HTMLElement = inject(ElementRef).nativeElement;
  private cdr = inject(ChangeDetectorRef);
  private breakpointService = inject(NzBreakpointService);

  protected readonly size = withConfig('nzSize', this.nzSize, 'default');
  private readonly currentBreakpoint = toSignal(
    toObservable(this.size).pipe(
      switchMap(size =>
        isPlainObject<Partial<ResponsiveLike<number>>>(size)
          ? this.breakpointService.subscribe(gridResponsiveMap)
          : of(NzBreakpointEnum.md)
      )
    ),
    { initialValue: NzBreakpointEnum.md }
  );
  private readonly currentSize = computed(() => {
    const size = this.size();

    return isPlainObject<Partial<ResponsiveLike<number>>>(size) ? size[this.currentBreakpoint() as Breakpoint] : size;
  });
  protected readonly customSize = computed(() => {
    const size = this.currentSize();

    return typeof size === 'number' ? toCssPixel(size) : null;
  });
  protected readonly customFontSize = computed(() => {
    const size = this.currentSize();

    return typeof size === 'number' ? size / 2 : null;
  });

  @ViewChild('textEl', { static: false }) textEl?: ElementRef<HTMLSpanElement>;

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
    }
  }

  ngOnChanges(): void {
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;
    this.hasSrc = !!this.nzSrc;
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
    textEl.style.lineHeight = this.customSize() || '';
  }
}
