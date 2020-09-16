/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';

import { Subject } from 'rxjs';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'image';

@Directive({
  selector: 'img',
  host: {
    class: 'ant-image-img'
  }
})
export class NzImageImgItemDirective {
  constructor(private elementRef: ElementRef<HTMLImageElement>) {}
  getElement(): HTMLImageElement {
    return this.elementRef.nativeElement;
  }
}

@Component({
  selector: 'nz-image',
  exportAs: 'NzImage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content select="img"></ng-content>
  `,
  host: {
    class: 'ant-image',
    '[style.height]': 'cssHeight',
    '[style.width]': 'cssWidth'
  }
})
export class NzImageComponent implements OnChanges, OnDestroy, AfterViewInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  cssWidth: string | null = null;
  cssHeight: string | null = null;

  @Input() @WithConfig() nzFallback: string | null = null;
  @Input() nzPreview: boolean = true;
  @Input() nzPlaceholder: string | TemplateRef<{}> | null = null;
  @Input() nzWidth: string | number | null = null;
  @Input() nzHeight: string | number | null = null;

  private destroy$ = new Subject();

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {}

  private setCssSize(): void {
    this.cssWidth = typeof this.nzWidth === 'number' ? `${this.nzWidth}px` : this.nzWidth;
    this.cssHeight = typeof this.nzHeight === 'number' ? `${this.nzHeight}px` : this.nzHeight;
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, nzHeight } = changes;
    if (nzWidth || nzHeight) {
      this.setCssSize();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {}
}
