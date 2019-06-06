/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isEmpty, zoomBadgeMotion, InputBoolean } from 'ng-zorro-antd/core';

export type NzBadgeStatusType = 'success' | 'processing' | 'default' | 'error' | 'warning';

@Component({
  selector: 'nz-badge',
  exportAs: 'nzBadge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  templateUrl: './nz-badge.component.html',
  host: {
    '[class.ant-badge-status]': 'nzStatus'
  }
})
export class NzBadgeComponent implements OnInit, AfterViewInit, OnChanges {
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  colorArray = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
  ];
  presetColor: string | null = null;
  count: number;
  @ViewChild('contentElement') contentElement: ElementRef;
  @Input() @InputBoolean() nzShowZero = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzDot = false;
  @Input() nzOverflowCount = 99;
  @Input() nzText: string;
  @Input() nzColor: string;
  @Input() nzStyle: { [key: string]: string };
  @Input() nzStatus: NzBadgeStatusType;
  @Input() nzCount: number | TemplateRef<void>;

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    }
  }

  get showSup(): boolean {
    return (this.nzShowDot && this.nzDot) || this.count > 0 || (this.count === 0 && this.nzShowZero);
  }

  generateMaxNumberArray(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-badge');
  }

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOverflowCount, nzCount, nzColor } = changes;
    if (nzCount && !(nzCount.currentValue instanceof TemplateRef)) {
      this.count = Math.max(0, nzCount.currentValue);
      this.countArray = this.count
        .toString()
        .split('')
        .map(item => +item);
    }
    if (nzOverflowCount) {
      this.generateMaxNumberArray();
    }
    if (nzColor) {
      this.presetColor = this.colorArray.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
  }
}
