import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges, Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NzSizeLDSType } from '../core/types/size';

export type NzAvatarShape = 'square' | 'circle';
export type NzAvatarSize = NzSizeLDSType | number;

@Component({
  selector           : 'nz-avatar',
  templateUrl        : './nz-avatar.component.html',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzAvatarComponent implements OnChanges {

  @Input()
  set nzIcon(value: string) {
    if (value) {
      this.oldAPIIcon = value.indexOf('anticon') > -1;
    }
    this._icon = value;
  }

  get nzIcon(): string {
    return this._icon;
  }
  oldAPIIcon = true; // Make the user defined icon compatible to old API. Should be removed in 2.0.
  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: {};

  @ViewChild('textEl') textEl: ElementRef;

  @Input() nzShape: NzAvatarShape = 'circle';

  @Input() nzSize: NzAvatarSize = 'default';

  @Input() nzText: string;

  @Input() nzSrc: string;

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private updateHostClassService: NzUpdateHostClassService,
    private  renderer: Renderer2) {
  }
  private el: HTMLElement = this.elementRef.nativeElement;
  private prefixCls = 'ant-avatar';
  private sizeMap = { large: 'lg', small: 'sm' };
  private _icon: string;

  setClass(): this {
    const classMap = {
      [ this.prefixCls ]                                    : true,
      [ `${this.prefixCls}-${this.sizeMap[ this.nzSize ]}` ]: this.sizeMap[ this.nzSize ],
      [ `${this.prefixCls}-${this.nzShape}` ]               : this.nzShape,
      [ `${this.prefixCls}-icon` ]                          : this.nzIcon,
      [ `${this.prefixCls}-image` ]                         : this.hasSrc // downgrade after image error
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
    if (scale === 1) {
      this.textStyles = {};
    } else {
      this.textStyles = {
        transform: `scale(${scale})`,
        position : 'absolute',
        display  : 'inline-block',
        left     : `calc(50% - ${Math.round(childrenWidth / 2)}px)`
      };
    }
    this.cd.detectChanges();
  }

  private notifyCalc(): this {
    // If use ngAfterViewChecked, always demands more computations, so......
    setTimeout(() => {
      this.calcStringSize();
    });
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
