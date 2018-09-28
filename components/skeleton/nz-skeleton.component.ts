import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvatarShape, AvatarSize, NzSkeletonAvatar, NzSkeletonParagraph, NzSkeletonTitle } from './nz-skeleton.type';

@Component({
  selector: 'nz-skeleton',
  templateUrl: './nz-skeleton.component.html',
  host: {
    '[class.ant-skeleton]': 'true',
    '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
    '[class.ant-skeleton-active]': 'nzActive'
  }
})
export class NzSkeletonComponent implements OnInit, OnChanges {
  title: NzSkeletonTitle;
  avatar: NzSkeletonAvatar;
  paragraph: NzSkeletonParagraph;
  avatarClassMap;
  rowsList: number[] = [];
  widthList: Array<number | string> = [];

  @Input() nzActive = false;
  @Input() nzLoading = true;
  @Input() nzTitle: NzSkeletonTitle | boolean = true;
  @Input() nzAvatar: NzSkeletonAvatar | boolean = false;
  @Input() nzParagraph: NzSkeletonParagraph | boolean = true;

  private getTitleProps(): NzSkeletonTitle {
    const hasAvatar: boolean = !!this.nzAvatar;
    const hasParagraph: boolean = !!this.nzParagraph;
    let width: string;
    if (!hasAvatar && hasParagraph) {
      width = '38%';
    } else if (hasAvatar && hasParagraph) {
      width = '50%';
    }
    return { width, ...this.getProps(this.nzTitle) };
  }

  private getAvatarProps(): NzSkeletonAvatar {
    const shape: AvatarShape = (!!this.nzTitle && !this.nzParagraph) ? 'square' : 'circle';
    const size: AvatarSize = 'large';
    return { shape, size, ...this.getProps(this.nzAvatar) };
  }

  private getParagraphProps(): NzSkeletonParagraph {
    const hasAvatar: boolean = !!this.nzAvatar;
    const hasTitle: boolean = !!this.nzTitle;
    const basicProps: NzSkeletonParagraph = {};
    // Width
    if (!hasAvatar || !hasTitle) {
      basicProps.width = '61%';
    }
    // Rows
    if (!hasAvatar && hasTitle) {
      basicProps.rows = 3;
    } else {
      basicProps.rows = 2;
    }
    return { ...basicProps, ...this.getProps(this.nzParagraph) };
  }

  private getProps<T>(prop: T | boolean | undefined): T | {}  {
    if (prop && typeof prop === 'object') {
      return prop;
    }
    return {};
  }

  toCSSUnit(value: number | string = ''): string {
    if (typeof value === 'number') {
      return `${value}px`;
    } else if (typeof value === 'string') {
      return value;
    }
  }

  private getWidthList(): Array<number | string> {
    const { width, rows } = this.paragraph;
    let widthList = [];
    if (width && Array.isArray(width)) {
      widthList = width;
    } else if (width && !Array.isArray(width)) {
      widthList = [];
      widthList[rows - 1] = width;
    }
    return widthList;
  }

  updateClassMap(): void {
    this.avatarClassMap = {
      [ `ant-skeleton-avatar-lg` ]     : this.avatar.size === 'large',
      [ `ant-skeleton-avatar-sm ` ]    : this.avatar.size === 'small',
      [ `ant-skeleton-avatar-circle` ] : this.avatar.shape === 'circle',
      [ `ant-skeleton-avatar-square ` ]: this.avatar.shape === 'square'
    };
  }

  updateProps(): void {
    this.title     = this.getTitleProps();
    this.avatar    = this.getAvatarProps();
    this.paragraph = this.getParagraphProps();
    this.rowsList  = [...Array(this.paragraph.rows)];
    this.widthList = this.getWidthList();
  }

  ngOnInit(): void {
    this.updateProps();
    this.updateClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
      this.updateProps();
      this.updateClassMap();
    }
  }
}
