import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

export type NzAvatarShape = 'square' | 'circle';
export type NzAvatarSize = 'small' | 'large' | 'default';

@Component({
  selector: 'nz-avatar',
  template: `
  <i *ngIf="nzIcon && hasIcon" [ngClass]="nzIcon"></i>
  <img [src]="nzSrc" *ngIf="nzSrc && hasSrc" (error)="imgError()"/>
  <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>`,
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzAvatarComponent implements OnChanges {
  private el: HTMLElement;
  private prefixCls = 'ant-avatar';
  private sizeMap = { large: 'lg', small: 'sm' };
  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: {};

  @ViewChild('textEl') textEl: ElementRef;

  @Input() nzShape: NzAvatarShape = 'circle';

  @Input() nzSize: NzAvatarSize = 'default';

  @Input() nzText: string;

  @Input() nzSrc: string;

  @Input() nzIcon: string;

  setClass(): this {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-${this.sizeMap[this.nzSize]}`]: this.sizeMap[this.nzSize],
      [`${this.prefixCls}-${this.nzShape}`]: this.nzShape,
      [`${this.prefixCls}-icon`]: this.nzIcon,
      [`${this.prefixCls}-image`]: this.nzSrc
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
  }

  private calcStringSize(): void {
    if (!this.hasText) { return; }

    const childrenWidth = this.textEl.nativeElement.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect().width;
    const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
    if (scale === 1) {
      this.textStyles = {};
    } else {
      this.textStyles = {
        transform: `scale(${scale})`,
        position: 'absolute',
        display: 'inline-block',
        left: `calc(50% - ${Math.round(childrenWidth / 2)}px)`
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

  constructor(elementRef: ElementRef, private cd: ChangeDetectorRef, private updateHostClassService: NzUpdateHostClassService) {
    this.el = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasText = !this.nzSrc && !!this.nzText;
    this.hasIcon = !this.nzSrc && !!this.nzIcon;

    this.setClass().notifyCalc();
  }
}
