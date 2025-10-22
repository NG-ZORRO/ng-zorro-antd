/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { toCssPixel } from 'ng-zorro-antd/core/util';

import { NzSkeletonElementAvatarComponent, NzSkeletonElementDirective } from './skeleton-element.component';
import {
  NzSkeletonAvatar,
  NzSkeletonAvatarShape,
  NzSkeletonAvatarSize,
  NzSkeletonParagraph,
  NzSkeletonTitle
} from './skeleton.type';

@Component({
  selector: 'nz-skeleton',
  exportAs: 'nzSkeleton',
  host: {
    class: 'ant-skeleton',
    '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
    '[class.ant-skeleton-active]': 'nzActive',
    '[class.ant-skeleton-round]': 'nzRound'
  },
  template: `
    @if (nzLoading) {
      @if (!!nzAvatar) {
        <div class="ant-skeleton-header">
          <nz-skeleton-element
            nzType="avatar"
            [nzSize]="avatar.size || 'default'"
            [nzShape]="avatar.shape || 'circle'"
          ></nz-skeleton-element>
        </div>
      }
      <div class="ant-skeleton-content">
        @if (!!nzTitle) {
          <h3 class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        }
        @if (!!nzParagraph) {
          <ul class="ant-skeleton-paragraph">
            @for (row of rowsList; track row; let i = $index) {
              <li [style.width]="toCSSUnit(widthList[i])"></li>
            }
          </ul>
        }
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `,
  imports: [NzSkeletonElementDirective, NzSkeletonElementAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzSkeletonComponent implements OnInit, OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @Input({ transform: booleanAttribute }) nzActive = false;
  @Input({ transform: booleanAttribute }) nzLoading = true;
  @Input({ transform: booleanAttribute }) nzRound = false;
  @Input() nzTitle: NzSkeletonTitle | boolean = true;
  @Input() nzAvatar: NzSkeletonAvatar | boolean = false;
  @Input() nzParagraph: NzSkeletonParagraph | boolean = true;

  title!: NzSkeletonTitle;
  avatar!: NzSkeletonAvatar;
  paragraph!: NzSkeletonParagraph;
  rowsList: number[] = [];
  widthList: Array<number | string> = [];

  protected toCSSUnit(value: number | string = ''): string {
    return toCssPixel(value);
  }

  private getTitleProps(): NzSkeletonTitle {
    const hasAvatar = !!this.nzAvatar;
    const hasParagraph = !!this.nzParagraph;
    let width = '';
    if (!hasAvatar && hasParagraph) {
      width = '38%';
    } else if (hasAvatar && hasParagraph) {
      width = '50%';
    }
    return { width, ...this.getProps(this.nzTitle) };
  }

  private getAvatarProps(): NzSkeletonAvatar {
    const shape: NzSkeletonAvatarShape = !!this.nzTitle && !this.nzParagraph ? 'square' : 'circle';
    const size: NzSkeletonAvatarSize = 'large';
    return { shape, size, ...this.getProps(this.nzAvatar) };
  }

  private getParagraphProps(): NzSkeletonParagraph {
    const hasAvatar = !!this.nzAvatar;
    const hasTitle = !!this.nzTitle;
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

  private getProps<T>(prop: T | boolean | undefined): T | {} {
    return prop && typeof prop === 'object' ? prop : {};
  }

  private getWidthList(): Array<number | string> {
    const { width, rows } = this.paragraph;
    let widthList: Array<string | number> = [];
    if (width && Array.isArray(width)) {
      widthList = width;
    } else if (width && !Array.isArray(width)) {
      widthList = [];
      widthList[rows! - 1] = width;
    }
    return widthList;
  }

  private updateProps(): void {
    this.title = this.getTitleProps();
    this.avatar = this.getAvatarProps();
    this.paragraph = this.getParagraphProps();
    this.rowsList = [...Array(this.paragraph.rows)];
    this.widthList = this.getWidthList();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.updateProps();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
      this.updateProps();
    }
  }
}
