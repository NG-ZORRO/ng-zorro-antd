/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzSkeletonAvatar, NzSkeletonAvatarShape, NzSkeletonAvatarSize, NzSkeletonParagraph, NzSkeletonTitle } from './skeleton.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-skeleton',
  exportAs: 'nzSkeleton',
  host: {
    '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
    '[class.ant-skeleton-active]': 'nzActive'
  },
  template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element nzType="avatar" [nzSize]="avatar.size" [nzShape]="avatar.shape"></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class NzSkeletonComponent implements OnInit, OnChanges {
  @Input() nzActive = false;
  @Input() nzLoading = true;
  @Input() nzTitle: NzSkeletonTitle | boolean = true;
  @Input() nzAvatar: NzSkeletonAvatar | boolean = false;
  @Input() nzParagraph: NzSkeletonParagraph | boolean = true;

  title!: NzSkeletonTitle;
  avatar!: NzSkeletonAvatar;
  paragraph!: NzSkeletonParagraph;
  rowsList: number[] = [];
  widthList: Array<number | string> = [];

  constructor(private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-skeleton');
  }

  toCSSUnit(value: number | string = ''): string {
    return toCssPixel(value);
  }

  private getTitleProps(): NzSkeletonTitle {
    const hasAvatar: boolean = !!this.nzAvatar;
    const hasParagraph: boolean = !!this.nzParagraph;
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
